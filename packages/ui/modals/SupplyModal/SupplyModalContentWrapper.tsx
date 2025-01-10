import { ReactNode, useState } from 'react';

import {
  USD_DECIMALS,
  calculateHealthFactorFromBalancesBigUnits,
  valueToBigNumber,
} from '@aave/math-utils';
import BigNumber from 'bignumber.js';

import { CapType } from '@lendos/types/cap';
import { CollateralType } from '@lendos/types/collateral';
import { FormattedReservesAndIncentives, Reserves } from '@lendos/types/reserves';
import { WrappedTokenConfig } from '@lendos/types/token';
import { Address, ExtendedFormattedUser } from '@lendos/types/user';

import { API_ETH_MOCK_ADDRESS } from '@lendos/constants/addresses';
import { getAssetCollateralType } from '@lendos/constants/getAssetCollateralType';
import { getMaxAmountAvailableToSupply } from '@lendos/constants/getMaxAmountAvailableToSupply';
import { roundToTokenDecimals } from '@lendos/constants/round';

import { AssetInput } from '../../components/AssetInput';
import { GasEstimationError } from '../../components/GasEstimationError';
import { IsolationModeWarning } from '../../components/IsolationModeWarning';
import { ModalWrapperProps } from '../../components/ModalWrapper';
import {
  DetailsCollateralLine,
  DetailsHFLine,
  DetailsIncentivesLine,
  DetailsNumberLine,
  TxModalDetails,
} from '../../components/TxModalDetails';
import { TxSuccessView } from '../../components/TxSuccessView';
import { useAssetCaps } from '../../providers/AssetCapsProvider';
import { useModalContext } from '../../providers/ModalProvider';
import { useReservesContext } from '../../providers/ReservesProvider';
import { useStateContext } from '../../providers/StateProvider';
import { SupplyActions } from './SupplyActions';

export enum ErrorType {
  CAP_REACHED,
}

export const SupplyModalContentWrapper = (
  params: ModalWrapperProps & { user: ExtendedFormattedUser },
) => {
  const user = params.user;
  // const { walletBalances } = useBalanceContext();
  // const wrappedTokenReserves = useWrappedTokens();
  const { supplyCap: supplyCapUsage, debtCeiling: debtCeilingUsage } = useAssetCaps();

  const { poolReserve, userReserve } = params;

  // const wrappedToken = wrappedTokenReserves.find(
  //   r => r.tokenOut.underlyingAsset === params.underlyingAsset,
  // );

  // const canSupplyAsWrappedToken =
  //   wrappedToken &&
  //   walletBalances[wrappedToken.tokenIn.underlyingAsset.toLowerCase()].amount !== '0';

  const hasDifferentCollateral = user.userReservesData.find(
    reserve => reserve.usageAsCollateralEnabledOnUser && reserve.reserve.id !== poolReserve.id,
  );

  const showIsolationWarning: boolean =
    !user.isInIsolationMode &&
    poolReserve.isIsolated &&
    !hasDifferentCollateral &&
    (userReserve.underlyingBalance !== '0' ? userReserve.usageAsCollateralEnabledOnUser : true);

  const props: SupplyModalContentProps = {
    ...params,
    isolationModeWarning: showIsolationWarning ? (
      <IsolationModeWarning asset={poolReserve.symbol} />
    ) : null,
    // TODO add token
    // addTokenProps: {
    //   address: poolReserve.aTokenAddress,
    //   symbol: poolReserve.iconSymbol,
    //   decimals: poolReserve.decimals,
    //   aToken: true,
    // },
    collateralType: getAssetCollateralType(
      userReserve,
      user.totalCollateralUSD,
      user.isInIsolationMode,
      debtCeilingUsage.isMaxed,
    ),
    supplyCapWarning: supplyCapUsage.determineWarningDisplay({ supplyCap: supplyCapUsage }),
    debtCeilingWarning: debtCeilingUsage.determineWarningDisplay({ debtCeiling: debtCeilingUsage }),
    // wrappedTokenConfig: wrappedTokenReserves.find(
    //   r => r.tokenOut.underlyingAsset === params.underlyingAsset,
    // ),
  };

  return <SupplyModalContent {...props} />;
  //  canSupplyAsWrappedToken ? (
  //   <SupplyWrappedTokenModalContent {...props} />
  // ) :
};

interface SupplyModalContentProps extends ModalWrapperProps {
  // addTokenProps: ERC20TokenType;
  collateralType: CollateralType;
  isolationModeWarning: ReactNode;
  supplyCapWarning: ReactNode;
  debtCeilingWarning: ReactNode;
  wrappedTokenConfig?: WrappedTokenConfig;
  user: ExtendedFormattedUser;
}

export const calculateHFAfterSupply = (
  user: ExtendedFormattedUser | undefined,
  poolReserve: FormattedReservesAndIncentives,
  supplyAmountInEth: BigNumber,
) => {
  let healthFactorAfterDeposit = user ? valueToBigNumber(user.healthFactor) : '-1';

  const totalCollateralMarketReferenceCurrencyAfter = user
    ? valueToBigNumber(user.totalCollateralMarketReferenceCurrency).plus(supplyAmountInEth)
    : '-1';

  const liquidationThresholdAfter = user
    ? valueToBigNumber(user.totalCollateralMarketReferenceCurrency)
        .multipliedBy(user.currentLiquidationThreshold)
        .plus(supplyAmountInEth.multipliedBy(poolReserve.formattedReserveLiquidationThreshold))
        .dividedBy(totalCollateralMarketReferenceCurrencyAfter)
    : '-1';

  if (
    user &&
    ((!user.isInIsolationMode && !poolReserve.isIsolated) ||
      (user.isInIsolationMode &&
        user.isolatedReserve?.underlyingAsset === poolReserve.underlyingAsset))
  ) {
    healthFactorAfterDeposit = calculateHealthFactorFromBalancesBigUnits({
      collateralBalanceMarketReferenceCurrency: totalCollateralMarketReferenceCurrencyAfter,
      borrowBalanceMarketReferenceCurrency: valueToBigNumber(
        user.totalBorrowsMarketReferenceCurrency,
      ),
      currentLiquidationThreshold: liquidationThresholdAfter,
    });
  }

  return healthFactorAfterDeposit;
};

export const SupplyModalContent = ({
  underlyingAsset,
  poolReserve,
  isWrongNetwork,
  nativeBalance,
  tokenBalance,
  isolationModeWarning,
  // addTokenProps,
  collateralType,
  supplyCapWarning,
  debtCeilingWarning,
  user,
}: SupplyModalContentProps) => {
  const { baseCurrencyData } = useReservesContext();
  const { currentMarketData, minRemainingBaseTokenBalance } = useStateContext();
  const { mainTxState: supplyTxState, gasLimit, txError } = useModalContext();

  // states
  const [amount, setAmount] = useState('');
  const supplyUnWrapped = underlyingAsset.toLowerCase() === API_ETH_MOCK_ADDRESS.toLowerCase();

  const walletBalance = supplyUnWrapped ? nativeBalance : tokenBalance;

  const supplyApy = poolReserve.supplyAPY;
  const { supplyCap, totalLiquidity, isFrozen, decimals, debtCeiling, isolationModeTotalDebt } =
    poolReserve;

  // Calculate max amount to supply
  const maxAmountToSupply = getMaxAmountAvailableToSupply(
    walletBalance,
    { supplyCap, totalLiquidity, isFrozen, decimals, debtCeiling, isolationModeTotalDebt },
    underlyingAsset,
    minRemainingBaseTokenBalance,
  );

  const handleChange = (value: string) => {
    if (value === '-1') {
      setAmount(maxAmountToSupply);
    } else {
      const decimalTruncatedValue = roundToTokenDecimals(value, poolReserve.decimals);
      setAmount(decimalTruncatedValue);
    }
  };

  const amountInEth = new BigNumber(amount).multipliedBy(
    poolReserve.formattedPriceInMarketReferenceCurrency,
  );

  const amountInUsd = amountInEth
    .multipliedBy(baseCurrencyData.marketReferenceCurrencyPriceInUsd)
    .shiftedBy(-USD_DECIMALS);

  const isMaxSelected = amount === maxAmountToSupply;

  const healfthFactorAfterSupply = calculateHFAfterSupply(user, poolReserve, amountInEth);

  let symbol = undefined;
  let iconSymbol = undefined;
  if (supplyUnWrapped) {
    symbol = currentMarketData.chain.nativeCurrency.symbol;
    iconSymbol = currentMarketData.chain.nativeCurrency.symbol;
  } else if (poolReserve.type === Reserves.ASSET) {
    symbol = poolReserve.symbol;
    iconSymbol = poolReserve.iconSymbol;
  } else {
    symbol = `${poolReserve.token0.symbol}/${poolReserve.token1.symbol}`;
    iconSymbol = `${poolReserve.token0.symbol}_${poolReserve.token1.symbol}`;
  }

  if (supplyTxState.success) {
    return (
      <TxSuccessView
        action='Supplied'
        amount={amount}
        symbol={supplyUnWrapped ? currentMarketData.chain.nativeCurrency.symbol : symbol}
        // addToken={addTokenProps}
      />
    );
  }

  return (
    <>
      {isolationModeWarning}
      {supplyCapWarning}
      {debtCeilingWarning}
      <AssetInput
        value={amount}
        onChange={handleChange}
        usdValue={amountInUsd.toString(10)}
        symbol={symbol}
        assets={[
          {
            balance: maxAmountToSupply,
            symbol: symbol,
            iconSymbol,
          },
        ]}
        capType={CapType.supplyCap}
        isMaxSelected={isMaxSelected}
        disabled={supplyTxState.loading}
        maxValue={maxAmountToSupply}
        balanceText={<>Wallet balance</>}
      />

      <TxModalDetails gasLimit={gasLimit} skipLoad={true} disabled={Number(amount) === 0}>
        <DetailsNumberLine description={<>Supply APY</>} value={supplyApy} percent />
        <DetailsIncentivesLine
          incentives={poolReserve.aIncentivesData}
          symbol={poolReserve.symbol}
        />
        <DetailsCollateralLine collateralType={collateralType} />
        <DetailsHFLine
          visibleHfChange={!!amount}
          healthFactor={user.healthFactor}
          futureHealthFactor={healfthFactorAfterSupply.toString()}
        />
      </TxModalDetails>

      {txError && <GasEstimationError txError={txError} />}

      <SupplyActions
        amountToSupply={amount}
        isWrongNetwork={isWrongNetwork}
        poolAddress={
          (supplyUnWrapped ? API_ETH_MOCK_ADDRESS : poolReserve.underlyingAsset) as Address
        }
        symbol={symbol}
        // TODO fix it
        blocked={false}
        decimals={poolReserve.decimals}
      />
    </>
  );
};

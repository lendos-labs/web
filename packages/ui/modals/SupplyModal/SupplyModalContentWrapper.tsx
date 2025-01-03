import { ExtendedFormattedUser } from '@lendos/types/user';
import { ModalWrapperProps } from '../../components/ModalWrapper';
import { ReactNode, useState } from 'react';
import { useAssetCaps } from '../../providers/AssetCapsProvider';
import { useReservesContext } from '../../providers/ReservesProvider';
import { useStateContext } from '../../providers/StateProvider';
import { useModalContext } from '../../providers/ModalProvider';
import { API_ETH_MOCK_ADDRESS } from '@lendos/constants/addresses';
import { getMaxAmountAvailableToSupply } from '@lendos/constants/getMaxAmountAvailableToSupply';
import { IsolationModeWarning } from '../../components/IsolationModeWarning';
import { getAssetCollateralType } from '@lendos/constants/getAssetCollateralType';
import { CollateralType } from '@lendos/types/collateral';
import { WrappedTokenConfig } from '@lendos/types/token';
import { roundToTokenDecimals } from '@lendos/constants/round';
import BigNumber from 'bignumber.js';
import {
  calculateHealthFactorFromBalancesBigUnits,
  USD_DECIMALS,
  valueToBigNumber,
} from '@aave/math-utils';
import { FormattedReservesAndIncentives, Reserves } from '@lendos/types/reserves';
import { CapType } from '@lendos/types/cap';
import { TxSuccessView } from '../../components/TxSuccessView';
import { AssetInput } from '../../components/AssetInput';
import {
  DetailsCollateralLine,
  DetailsHFLine,
  DetailsIncentivesLine,
  DetailsNumberLine,
  TxModalDetails,
} from '../../components/TxModalDetails';
import { GasEstimationError } from '../../components/GasEstimationError';
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
  // isWrongNetwork,
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
  const { currentNetworkData, minRemainingBaseTokenBalance } = useStateContext();
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
    symbol = currentNetworkData.baseAssetSymbol;
    iconSymbol = currentNetworkData.baseAssetSymbol;
  } else if (poolReserve.type === Reserves.ASSET) {
    symbol = poolReserve.symbol;
    iconSymbol = poolReserve.iconSymbol;
  } else {
    symbol = `${poolReserve.token0.symbol}/${poolReserve.token1.symbol}`;
    iconSymbol = `${poolReserve.token0.symbol}_${poolReserve.token1.symbol}`;
  }

  // const supplyActionsProps = {
  //   amountToSupply: amount,
  //   isWrongNetwork,
  //   poolAddress: supplyUnWrapped ? API_ETH_MOCK_ADDRESS : poolReserve.underlyingAsset,
  //   symbol,
  //   blocked: false,
  //   decimals: poolReserve.decimals,
  //   isWrappedBaseAsset: poolReserve.isWrappedBaseAsset,
  // };

  if (supplyTxState.success) {
    return (
      <TxSuccessView
        action='Supplied'
        amount={amount}
        symbol={supplyUnWrapped ? currentNetworkData.baseAssetSymbol : symbol}
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

      {/* <SupplyActions {...supplyActionsProps} /> */}
    </>
  );
};

// export const SupplyWrappedTokenModalContent = ({
//   poolReserve,
//   wrappedTokenConfig,
//   isolationModeWarning,
//   supplyCapWarning,
//   debtCeilingWarning,
//   addTokenProps,
//   collateralType,
//   isWrongNetwork,
//   user,
// }: SupplyModalContentProps) => {
//   const { baseCurrencyData } = useAppDataContext();
//   const { currentMarketData } = useProtocolDataContext();
//   const { mainTxState: supplyTxState, gasLimit, txError } = useModalContext();
//   const { walletBalances } = useWalletBalances(currentMarketData);
//   const minRemainingBaseTokenBalance = useRootStore(
//     state => state.poolComputed.minRemainingBaseTokenBalance,
//   );

//   if (!wrappedTokenConfig) {
//     throw new Error('Wrapped token config is not defined');
//   }

//   const tokenInBalance = walletBalances[wrappedTokenConfig.tokenIn.underlyingAsset].amount;
//   const tokenOutBalance = walletBalances[wrappedTokenConfig.tokenOut.underlyingAsset].amount;

//   const assets = [
//     {
//       balance: tokenInBalance,
//       symbol: wrappedTokenConfig.tokenIn.symbol,
//       iconSymbol: wrappedTokenConfig.tokenIn.symbol,
//       address: wrappedTokenConfig.tokenIn.underlyingAsset,
//     },
//   ];

//   if (tokenOutBalance !== '0') {
//     assets.unshift({
//       balance: tokenOutBalance,
//       symbol: wrappedTokenConfig.tokenOut.symbol,
//       iconSymbol: wrappedTokenConfig.tokenOut.symbol,
//       address: wrappedTokenConfig.tokenOut.underlyingAsset,
//     });
//   }

//   const [tokenToSupply, setTokenToSupply] = useState<Asset>(assets[0]);
//   const [amount, setAmount] = useState('');
//   const [convertedTokenInAmount, setConvertedTokenInAmount] = useState<string>('0');
//   const { data: exchangeRate } = useTokenInForTokenOut(
//     '1',
//     poolReserve.decimals,
//     wrappedTokenConfig.tokenWrapperAddress,
//   );

//   useEffect(() => {
//     if (!exchangeRate) return;
//     const convertedAmount = valueToBigNumber(tokenInBalance).multipliedBy(exchangeRate).toString();
//     setConvertedTokenInAmount(convertedAmount);
//   }, [exchangeRate, tokenInBalance]);

//   const { supplyCap, totalLiquidity, isFrozen, decimals, debtCeiling, isolationModeTotalDebt } =
//     poolReserve;

//   const maxAmountToSupply = getMaxAmountAvailableToSupply(
//     tokenOutBalance,
//     { supplyCap, totalLiquidity, isFrozen, decimals, debtCeiling, isolationModeTotalDebt },
//     poolReserve.underlyingAsset,
//     minRemainingBaseTokenBalance,
//   );

//   const tokenOutRemainingSupplyCap = remainingCap(
//     poolReserve.supplyCap,
//     poolReserve.totalLiquidity,
//   );

//   let maxAmountOfTokenInToSupply = tokenInBalance;
//   if (BigNumber(convertedTokenInAmount).isGreaterThan(tokenOutRemainingSupplyCap)) {
//     maxAmountOfTokenInToSupply = BigNumber(tokenOutRemainingSupplyCap)
//       .dividedBy(exchangeRate || '0')
//       .toString();

//     maxAmountOfTokenInToSupply = roundToTokenDecimals(
//       maxAmountOfTokenInToSupply,
//       poolReserve.decimals,
//     );
//   }

//   let supplyingWrappedToken = false;
//   if (wrappedTokenConfig) {
//     supplyingWrappedToken = tokenToSupply.address === wrappedTokenConfig.tokenIn.underlyingAsset;
//   }

//   const handleChange = (value: string) => {
//     if (value === '-1') {
//       if (supplyingWrappedToken) {
//         setAmount(maxAmountOfTokenInToSupply);
//       } else {
//         setAmount(maxAmountToSupply);
//       }
//     } else {
//       const decimalTruncatedValue = roundToTokenDecimals(value, poolReserve.decimals);
//       setAmount(decimalTruncatedValue);
//     }
//   };

//   const amountInEth = new BigNumber(amount).multipliedBy(
//     supplyingWrappedToken
//       ? wrappedTokenConfig.tokenIn.formattedPriceInMarketReferenceCurrency
//       : poolReserve.formattedPriceInMarketReferenceCurrency,
//   );

//   const amountInUsd = amountInEth
//     .multipliedBy(baseCurrencyData.marketReferenceCurrencyPriceInUsd)
//     .shiftedBy(-USD_DECIMALS);

//   const isMaxSelected = amount === maxAmountToSupply;

//   const healfthFactorAfterSupply = calculateHFAfterSupply(user, poolReserve, amountInEth);

//   if (supplyTxState.success) {
//     const successModalAmount = supplyingWrappedToken
//       ? BigNumber(amount)
//           .dividedBy(exchangeRate || '1')
//           .toString()
//       : amount;

//     return (
//       <TxSuccessView
//         action={<>Supplied</>}
//         amount={successModalAmount}
//         symbol={poolReserve.symbol}
//         addToken={addTokenProps}
//       />
//     );
//   }

//   return (
//     <>
//       {isolationModeWarning}
//       {supplyCapWarning}
//       {debtCeilingWarning}
//       <AssetInput
//         value={amount}
//         onChange={handleChange}
//         usdValue={amountInUsd.toString(10)}
//         symbol={tokenToSupply.symbol}
//         assets={assets}
//         onSelect={setTokenToSupply}
//         capType={CapType.supplyCap}
//         isMaxSelected={isMaxSelected}
//         disabled={supplyTxState.loading}
//         balanceText={<>Wallet balance</>}
//         exchangeRateComponent={
//           supplyingWrappedToken && (
//             <ExchangeRate
//               supplyAmount={amount}
//               decimals={poolReserve.decimals}
//               tokenWrapperAddress={wrappedTokenConfig.tokenWrapperAddress}
//               tokenInSymbol={wrappedTokenConfig.tokenIn.symbol}
//               tokenOutSymbol={wrappedTokenConfig.tokenOut.symbol}
//             />
//           )
//         }
//       />

//       <TxModalDetails gasLimit={gasLimit} skipLoad={true} disabled={Number(amount) === 0}>
//         <DetailsNumberLine description={<>Supply APY</>} value={poolReserve.supplyAPY} percent />
//         <DetailsIncentivesLine
//           incentives={poolReserve.aIncentivesData}
//           symbol={poolReserve.symbol}
//         />
//         <DetailsCollateralLine collateralType={collateralType} />
//         <DetailsHFLine
//           visibleHfChange={!!amount}
//           healthFactor={user ? user.healthFactor : '-1'}
//           futureHealthFactor={healfthFactorAfterSupply.toString()}
//         />
//       </TxModalDetails>

//       {txError && <GasEstimationError txError={txError} />}

//       {supplyingWrappedToken ? (
//         <SupplyWrappedTokenActions
//           tokenWrapperAddress={wrappedTokenConfig.tokenWrapperAddress}
//           tokenIn={wrappedTokenConfig.tokenIn.underlyingAsset}
//           amountToSupply={amount}
//           decimals={18}
//           symbol={wrappedTokenConfig.tokenIn.symbol}
//           isWrongNetwork={isWrongNetwork}
//         />
//       ) : (
//         <SupplyActions
//           isWrongNetwork={isWrongNetwork}
//           amountToSupply={amount}
//           poolAddress={poolReserve.underlyingAsset}
//           symbol={poolReserve.symbol}
//           blocked={false}
//           decimals={poolReserve.decimals}
//           isWrappedBaseAsset={false}
//         />
//       )}
//     </>
//   );
// };

// const ExchangeRate = ({
//   supplyAmount,
//   decimals,
//   tokenInSymbol,
//   tokenOutSymbol,
//   tokenWrapperAddress,
// }: {
//   supplyAmount: string;
//   decimals: number;
//   tokenInSymbol: string;
//   tokenOutSymbol: string;
//   tokenWrapperAddress: string;
// }) => {
//   const { isFetching: loading, data: tokenOutAmount } = useTokenOutForTokenIn(
//     supplyAmount,
//     decimals,
//     tokenWrapperAddress,
//   );

//   return (
//     <Stack direction='row' alignItems='center' gap={1}>
//       <Typography variant='caption'>Supply amount</Typography>
//       <TokenIcon sx={{ fontSize: '16px' }} symbol='sdai' />
//       {loading ? (
//         <Skeleton variant='rectangular' width={80} height={14} />
//       ) : (
//         <>
//           <FormattedNumber
//             value={tokenOutAmount || ''}
//             variant='subheader2'
//             color='text.primary'
//             visibleDecimals={2}
//           />
//           <Typography variant='subheader2' color='text.secondary'>
//             sDAI
//           </Typography>
//         </>
//       )}
//       <TextWithTooltip>
//         <WrappedTokenTooltipContent
//           decimals={decimals}
//           tokenWrapperAddress={tokenWrapperAddress}
//           tokenInSymbol={tokenInSymbol}
//           tokenOutSymbol={tokenOutSymbol}
//         />
//       </TextWithTooltip>
//     </Stack>
//   );
// };

import { useState } from 'react';

import {
  USD_DECIMALS,
  calculateHealthFactorFromBalancesBigUnits,
  valueToBigNumber,
} from '@aave/math-utils';
import { Typography } from '@mui/material';

import { CapType } from '@lendos/types/cap';
import { InterestRate } from '@lendos/types/reserves';
import { ExtendedFormattedUser } from '@lendos/types/user';

import { getMaxAmountAvailableToBorrow } from '@lendos/constants/getMaxAmountAvailableToBorrow';
import { roundToTokenDecimals } from '@lendos/constants/round';

import { AssetInput } from '../../components/AssetInput';
import { FormattedNumber } from '../../components/FormattedNumber';
import { GasEstimationError } from '../../components/GasEstimationError';
import { ModalWrapperProps } from '../../components/ModalWrapper';
import { Row } from '../../components/Row';
import { StyledTxModalToggleGroup } from '../../components/StyledToggleButtonGroup';
import { StyledTxModalToggleButton } from '../../components/StyledToggleTabButton';
import {
  DetailsHFLine,
  DetailsIncentivesLine,
  DetailsUnwrapSwitch,
  TxModalDetails,
} from '../../components/TxModalDetails';
import { TxSuccessView } from '../../components/TxSuccessView';
import { APYTypeTooltip } from '../../components/infoTooltips/APYTypeTooltip.tsx';
import { useAssetCaps } from '../../providers/AssetCapsProvider';
import { useModalContext } from '../../providers/ModalProvider';
import { useReservesContext } from '../../providers/ReservesProvider';
import { useStateContext } from '../../providers/StateProvider';
import { BorrowAmountWarning } from './BorrowAmountWarning.tsx';
import { ParameterChangewarning } from './ParameterChangewarning.tsx';

export enum ErrorType {
  STABLE_RATE_NOT_ENABLED,
  NOT_ENOUGH_LIQUIDITY,
  BORROWING_NOT_AVAILABLE,
  NOT_ENOUGH_BORROWED,
}

interface BorrowModeSwitchProps {
  interestRateMode: InterestRate;
  setInterestRateMode: (value: InterestRate) => void;
  variableRate: string;
  stableRate: string;
}

const BorrowModeSwitch = ({
  setInterestRateMode,
  interestRateMode,
  variableRate,
}: BorrowModeSwitchProps) => {
  return (
    <Row
      caption={<APYTypeTooltip text={<>Borrow APY rate</>} key='APY type_modal' variant='h3' />}
      captionVariant='description'
      mb={5}
      flexDirection='column'
      align='flex-start'
      captionColor='text.secondary'
    >
      <StyledTxModalToggleGroup
        color='primary'
        value={interestRateMode}
        exclusive
        onChange={(_, value: InterestRate) => setInterestRateMode(value)}
        sx={{ mt: 0.5 }}
      >
        <StyledTxModalToggleButton
          value={InterestRate.Variable}
          disabled={interestRateMode === InterestRate.Variable}
        >
          <Typography variant='buttonS' sx={{ mr: 1 }}>
            Variable
          </Typography>
          <FormattedNumber value={variableRate} percent variant='buttonS' />
        </StyledTxModalToggleButton>
      </StyledTxModalToggleGroup>
    </Row>
  );
};

export const BorrowModalContent = ({
  // underlyingAsset,
  // isWrongNetwork,
  poolReserve,
  userReserve,
  unwrap: borrowUnWrapped,
  setUnwrap: setBorrowUnWrapped,
  symbol,
  user,
}: ModalWrapperProps & {
  unwrap: boolean;
  setUnwrap: (unwrap: boolean) => void;
  user: ExtendedFormattedUser;
}) => {
  const { mainTxState: borrowTxState, gasLimit, txError } = useModalContext();
  const { baseCurrencyData } = useReservesContext();
  const { currentNetworkData } = useStateContext();
  const { borrowCap } = useAssetCaps();

  const [interestRateMode, setInterestRateMode] = useState<InterestRate>(InterestRate.Variable);
  const [amount, setAmount] = useState('');
  const [riskCheckboxAccepted, setRiskCheckboxAccepted] = useState(false);

  // amount calculations
  const maxAmountToBorrow = getMaxAmountAvailableToBorrow(poolReserve, user, interestRateMode);

  // We set this in a useEffect, so it doesn't constantly change when
  // max amount selected
  const handleChange = (_value: string) => {
    if (_value === '-1') {
      setAmount(maxAmountToBorrow);
    } else {
      const decimalTruncatedValue = roundToTokenDecimals(_value, poolReserve.decimals);
      setAmount(decimalTruncatedValue);
    }
  };

  const isMaxSelected = amount === maxAmountToBorrow;

  // health factor calculations
  const amountToBorrowInUsd = valueToBigNumber(amount)
    .multipliedBy(poolReserve.formattedPriceInMarketReferenceCurrency)
    .multipliedBy(baseCurrencyData.marketReferenceCurrencyPriceInUsd)
    .shiftedBy(-USD_DECIMALS);

  const newHealthFactor = calculateHealthFactorFromBalancesBigUnits({
    collateralBalanceMarketReferenceCurrency: user.totalCollateralUSD,
    borrowBalanceMarketReferenceCurrency: valueToBigNumber(user.totalBorrowsUSD).plus(
      amountToBorrowInUsd,
    ),
    currentLiquidationThreshold: user.currentLiquidationThreshold,
  });
  const displayRiskCheckbox =
    newHealthFactor.toNumber() < 1.5 && newHealthFactor.toString() !== '-1';

  // calculating input usd value
  const usdValue = valueToBigNumber(amount).multipliedBy(poolReserve.priceInUSD);

  // error types handling
  let blockingError: ErrorType | undefined = undefined;
  if (interestRateMode === InterestRate.Stable && !poolReserve.stableBorrowRateEnabled) {
    blockingError = ErrorType.STABLE_RATE_NOT_ENABLED;
  } else if (
    interestRateMode === InterestRate.Stable &&
    userReserve.usageAsCollateralEnabledOnUser &&
    valueToBigNumber(amount).lt(userReserve.underlyingBalance || 0)
  ) {
    blockingError = ErrorType.NOT_ENOUGH_BORROWED;
  } else if (valueToBigNumber(amount).gt(poolReserve.formattedAvailableLiquidity)) {
    blockingError = ErrorType.NOT_ENOUGH_LIQUIDITY;
  } else if (!poolReserve.borrowingEnabled) {
    blockingError = ErrorType.BORROWING_NOT_AVAILABLE;
  }

  // error render handling
  const handleBlocked = () => {
    switch (blockingError) {
      case ErrorType.BORROWING_NOT_AVAILABLE:
        return <>Borrowing is currently unavailable for {poolReserve.symbol}.</>;
      case ErrorType.NOT_ENOUGH_BORROWED:
        return (
          <>
            You can borrow this asset with a stable rate only if you borrow more than the amount you
            are supplying as collateral.
          </>
        );
      case ErrorType.NOT_ENOUGH_LIQUIDITY:
        return (
          <>
            There are not enough funds in the
            {poolReserve.symbol}
            reserve to borrow
          </>
        );
      case ErrorType.STABLE_RATE_NOT_ENABLED:
        return <>The Stable Rate is not enabled for this currency</>;
      case undefined: {
        throw new Error('Not implemented yet: undefined case');
      }
      default:
        return null;
    }
  };

  // token info to add to wallet
  // const addToken: ERC20TokenType = {
  //   address: underlyingAsset,
  //   symbol: poolReserve.iconSymbol,
  //   decimals: poolReserve.decimals,
  // };

  const iconSymbol =
    borrowUnWrapped && poolReserve.isWrappedBaseAsset
      ? currentNetworkData.baseAssetSymbol
      : poolReserve.iconSymbol;

  if (borrowTxState.success) {
    return (
      <TxSuccessView
        action={<>Borrowed</>}
        amount={amount}
        symbol={iconSymbol}
        // addToken={borrowUnWrapped && poolReserve.isWrappedBaseAsset ? undefined : addToken}
      />
    );
  }

  const incentive =
    interestRateMode === InterestRate.Stable
      ? poolReserve.sIncentivesData
      : poolReserve.vIncentivesData;
  return (
    <>
      {borrowCap.determineWarningDisplay({ borrowCap })}

      {poolReserve.stableBorrowRateEnabled && (
        <BorrowModeSwitch
          interestRateMode={interestRateMode}
          setInterestRateMode={setInterestRateMode}
          variableRate={poolReserve.variableBorrowAPY}
          stableRate={poolReserve.stableBorrowAPY}
        />
      )}

      <AssetInput
        value={amount}
        onChange={handleChange}
        usdValue={usdValue.toString(10)}
        assets={[
          {
            balance: maxAmountToBorrow,
            symbol,
            iconSymbol,
          },
        ]}
        symbol={symbol}
        capType={CapType.borrowCap}
        isMaxSelected={isMaxSelected}
        maxValue={maxAmountToBorrow}
        balanceText={<>Available</>}
      />

      {blockingError !== undefined && (
        <Typography variant='helperText' color='error.main'>
          {handleBlocked()}
        </Typography>
      )}

      {poolReserve.isWrappedBaseAsset && (
        <DetailsUnwrapSwitch
          unwrapped={borrowUnWrapped}
          setUnWrapped={setBorrowUnWrapped}
          disabled={false}
          label={
            <Typography>{`Unwrap ${poolReserve.symbol} (to borrow ${currentNetworkData.baseAssetSymbol})`}</Typography>
          }
        />
      )}

      <TxModalDetails gasLimit={gasLimit}>
        <DetailsIncentivesLine incentives={incentive} symbol={poolReserve.symbol} />
        <DetailsHFLine
          visibleHfChange={!!amount}
          healthFactor={user.healthFactor}
          futureHealthFactor={newHealthFactor.toString(10)}
        />
      </TxModalDetails>

      {txError && <GasEstimationError txError={txError} />}

      {displayRiskCheckbox && (
        <BorrowAmountWarning
          riskCheckboxAccepted={riskCheckboxAccepted}
          onRiskCheckboxChange={() => {
            setRiskCheckboxAccepted(!riskCheckboxAccepted);
          }}
        />
      )}

      <ParameterChangewarning />

      {/* <BorrowActions*/}
      {/*  poolReserve={poolReserve}*/}
      {/*  amountToBorrow={amount}*/}
      {/*  poolAddress={*/}
      {/*    borrowUnWrapped && poolReserve.isWrappedBaseAsset*/}
      {/*      ? API_ETH_MOCK_ADDRESS*/}
      {/*      : poolReserve.underlyingAsset*/}
      {/*  }*/}
      {/*  interestRateMode={interestRateMode}*/}
      {/*  isWrongNetwork={isWrongNetwork}*/}
      {/*  symbol={symbol}*/}
      {/*  blocked={blockingError !== undefined || (displayRiskCheckbox && !riskCheckboxAccepted)}*/}
      {/*  sx={displayRiskCheckbox ? { mt: 0 } : {}}*/}
      {/*/ >*/}
    </>
  );
};

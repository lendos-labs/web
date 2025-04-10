import { useRef, useState } from 'react';

import { valueToBigNumber } from '@aave/math-utils';
import { Box, Checkbox, Typography } from '@mui/material';

import { Reserves } from '@lendos/types/reserves';
import { ExtendedFormattedUser } from '@lendos/types/user';

import { API_ETH_MOCK_ADDRESS } from '@lendos/constants/addresses';
import { calculateHFAfterWithdraw } from '@lendos/constants/utils/hfUtils';

import { AssetInput } from '../../components/AssetInput';
import { GasEstimationError } from '../../components/GasEstimationError';
import { ModalWrapperProps } from '../../components/ModalWrapper';
import {
  DetailsHFLine,
  DetailsNumberLine,
  DetailsUnwrapSwitch,
  TxModalDetails,
} from '../../components/TxModalDetails';
import { TxSuccessView } from '../../components/TxSuccessView';
import { Warning } from '../../components/Warning';
import { useModalContext } from '../../providers/ModalProvider';
import { useStateContext } from '../../providers/StateProvider';
import { zeroLTVBlockingWithdraw } from '../utils.ts';
import { WithdrawActions } from './WithdrawActions.tsx';
import { useWithdrawError } from './WithdrawError.tsx';
import { calculateMaxWithdrawAmount } from './utils.ts';

export const WithdrawModalContent = ({
  poolReserve,
  userReserve,
  symbol,
  isWrongNetwork,
  user,
}: ModalWrapperProps & {
  user: ExtendedFormattedUser;
}) => {
  const { gasLimit, mainTxState: withdrawTxState, txError, args, setUnWrapped } = useModalContext();
  const { currentMarketData } = useStateContext();
  const withdrawUnWrapped = Boolean(args.unWrapped);

  const [_amount, setAmount] = useState('');
  const [withdrawMax, setWithdrawMax] = useState('');
  const [riskCheckboxAccepted, setRiskCheckboxAccepted] = useState(false);
  const amountRef = useRef<string>('');

  const isMaxSelected = _amount === '-1';
  const maxAmountToWithdraw = calculateMaxWithdrawAmount(user, userReserve, poolReserve);
  const underlyingBalance = valueToBigNumber(userReserve.underlyingBalance || '0');
  const unborrowedLiquidity = valueToBigNumber(poolReserve.unborrowedLiquidity);
  const withdrawAmount = isMaxSelected ? maxAmountToWithdraw.toString(10) : _amount;

  const handleChange = (value: string) => {
    const maxSelected = value === '-1';
    amountRef.current = maxSelected ? maxAmountToWithdraw.toString(10) : value;
    setAmount(value);
    if (maxSelected && maxAmountToWithdraw.eq(underlyingBalance)) {
      setWithdrawMax('-1');
    } else {
      setWithdrawMax(maxAmountToWithdraw.toString(10));
    }
  };

  const assetsBlockingWithdraw: string[] = zeroLTVBlockingWithdraw(user);

  const healthFactorAfterWithdraw = calculateHFAfterWithdraw({
    user,
    userReserve,
    poolReserve,
    withdrawAmount,
  });

  const { blockingError, errorComponent } = useWithdrawError({
    assetsBlockingWithdraw,
    poolReserve,
    healthFactorAfterWithdraw,
    withdrawAmount,
    user,
  });

  const displayRiskCheckbox =
    healthFactorAfterWithdraw.toNumber() >= 1 &&
    healthFactorAfterWithdraw.toNumber() < 1.5 &&
    userReserve.usageAsCollateralEnabledOnUser;

  // calculating input usd value
  const usdValue = valueToBigNumber(withdrawAmount).multipliedBy(
    userReserve.reserve.priceInUSD || 0,
  );

  const showedSymbol =
    poolReserve.type === Reserves.LP
      ? `${poolReserve.token0.symbol}/${poolReserve.token1.symbol}`
      : symbol;

  if (withdrawTxState.success) {
    return (
      <TxSuccessView
        action='withdrew'
        amount={amountRef.current}
        symbol={
          withdrawUnWrapped && poolReserve.isWrappedBaseAsset
            ? currentMarketData.chain.nativeCurrency.symbol
            : showedSymbol
        }
      />
    );
  }

  return (
    <>
      <AssetInput
        value={withdrawAmount}
        onChange={handleChange}
        symbol={showedSymbol}
        assets={[
          {
            balance: maxAmountToWithdraw.toString(10),
            symbol: showedSymbol,
            iconSymbol:
              withdrawUnWrapped && poolReserve.isWrappedBaseAsset
                ? currentMarketData.chain.nativeCurrency.symbol
                : poolReserve.type === Reserves.ASSET
                  ? poolReserve.iconSymbol
                  : `${poolReserve.token0.symbol}_${poolReserve.token1.symbol}`,
          },
        ]}
        usdValue={usdValue.toString(10)}
        isMaxSelected={isMaxSelected}
        disabled={withdrawTxState.loading}
        maxValue={maxAmountToWithdraw.toString(10)}
        balanceText={
          unborrowedLiquidity.lt(underlyingBalance) ? <>Available</> : <>Supply balance</>
        }
      />

      {blockingError !== undefined && (
        <Typography variant='helperText' color='error.main'>
          {errorComponent}
        </Typography>
      )}

      {poolReserve.isWrappedBaseAsset && (
        <DetailsUnwrapSwitch
          unwrapped={withdrawUnWrapped}
          setUnWrapped={setUnWrapped}
          label={
            <Typography>
              <>
                Unwrap {poolReserve.symbol} ( to withdraw{' '}
                {currentMarketData.chain.nativeCurrency.symbol})
              </>
            </Typography>
          }
        />
      )}

      <TxModalDetails gasLimit={gasLimit}>
        <DetailsNumberLine
          description={<>Remaining supply</>}
          value={underlyingBalance.minus(withdrawAmount || '0').toString(10)}
          symbol={
            poolReserve.isWrappedBaseAsset
              ? currentMarketData.chain.nativeCurrency.symbol
              : showedSymbol
          }
        />
        <DetailsHFLine
          visibleHfChange={!!_amount}
          healthFactor={user.healthFactor || '-1'}
          futureHealthFactor={healthFactorAfterWithdraw.toString(10)}
        />
      </TxModalDetails>

      {txError && <GasEstimationError txError={txError} />}

      {displayRiskCheckbox && (
        <>
          <Warning severity='error' sx={{ my: 6 }}>
            Withdrawing this amount will reduce your health factor and increase risk of liquidation.
          </Warning>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              mx: '24px',
              mb: '12px',
            }}
          >
            <Checkbox
              checked={riskCheckboxAccepted}
              onChange={() => {
                setRiskCheckboxAccepted(!riskCheckboxAccepted);
              }}
              size='small'
              data-cy={`risk-checkbox`}
            />
            <Typography variant='description' color={'text.primary'}>
              I acknowledge the risks involved.
            </Typography>
          </Box>
        </>
      )}

      <WithdrawActions
        poolReserve={poolReserve}
        amountToWithdraw={isMaxSelected ? withdrawMax : withdrawAmount}
        poolAddress={
          withdrawUnWrapped && poolReserve.isWrappedBaseAsset
            ? API_ETH_MOCK_ADDRESS
            : poolReserve.underlyingAsset
        }
        isWrongNetwork={isWrongNetwork}
        symbol={showedSymbol}
        blocked={blockingError !== undefined || (displayRiskCheckbox && !riskCheckboxAccepted)}
      />
    </>
  );
};

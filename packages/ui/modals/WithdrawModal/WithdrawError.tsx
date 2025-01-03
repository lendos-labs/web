import { valueToBigNumber } from '@aave/math-utils';
import { BigNumber } from 'bignumber.js';
import { FormattedReservesAndIncentives } from '@lendos/types/reserves';
import { ExtendedFormattedUser } from '@lendos/types/user';
import { useModalContext } from '../../providers/ModalProvider';

enum ErrorType {
  CAN_NOT_WITHDRAW_THIS_AMOUNT,
  POOL_DOES_NOT_HAVE_ENOUGH_LIQUIDITY,
  ZERO_LTV_WITHDRAW_BLOCKED,
}

interface WithdrawErrorProps {
  assetsBlockingWithdraw: string[];
  poolReserve: FormattedReservesAndIncentives;
  healthFactorAfterWithdraw: BigNumber;
  withdrawAmount: string;
  user: ExtendedFormattedUser;
}

export const useWithdrawError = ({
  assetsBlockingWithdraw,
  poolReserve,
  healthFactorAfterWithdraw,
  withdrawAmount,
  user,
}: WithdrawErrorProps) => {
  const { mainTxState: withdrawTxState } = useModalContext();

  let blockingError: ErrorType | undefined = undefined;
  const unborrowedLiquidity = valueToBigNumber(poolReserve.unborrowedLiquidity);

  if (!withdrawTxState.success && !withdrawTxState.txHash) {
    if (assetsBlockingWithdraw.length > 0 && !assetsBlockingWithdraw.includes(poolReserve.symbol)) {
      blockingError = ErrorType.ZERO_LTV_WITHDRAW_BLOCKED;
    } else if (
      healthFactorAfterWithdraw.lt('1') &&
      user.totalBorrowsMarketReferenceCurrency !== '0'
    ) {
      blockingError = ErrorType.CAN_NOT_WITHDRAW_THIS_AMOUNT;
    } else if (
      unborrowedLiquidity.eq('0') ||
      valueToBigNumber(withdrawAmount).gt(poolReserve.unborrowedLiquidity)
    ) {
      blockingError = ErrorType.POOL_DOES_NOT_HAVE_ENOUGH_LIQUIDITY;
    }
  }

  const errors = {
    [ErrorType.CAN_NOT_WITHDRAW_THIS_AMOUNT]: (
      <>You can not withdraw this amount because it will cause collateral call</>
    ),
    [ErrorType.POOL_DOES_NOT_HAVE_ENOUGH_LIQUIDITY]: (
      <>These funds have been borrowed and are not available for withdrawal at this time.</>
    ),
    [ErrorType.ZERO_LTV_WITHDRAW_BLOCKED]: (
      <>
        Assets with zero LTV ({assetsBlockingWithdraw}) must be withdrawn or disabled as collateral
        to perform this action
      </>
    ),
  };

  return {
    blockingError,
    errorComponent: blockingError ? errors[blockingError] : null,
  };
};

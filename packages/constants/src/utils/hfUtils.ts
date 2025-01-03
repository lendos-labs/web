import { calculateHealthFactorFromBalancesBigUnits, valueToBigNumber } from '@aave/math-utils';
import BigNumber from 'bignumber.js';

import { FormattedReservesAndIncentives } from '@lendos/types/reserves';
import { ExtendedFormattedUser } from '@lendos/types/user';

interface CalculateHFAfterWithdrawProps {
  user: ExtendedFormattedUser;
  userReserve: ExtendedFormattedUser['userReservesData'][0];
  poolReserve: FormattedReservesAndIncentives;
  withdrawAmount: string;
}

export const calculateHFAfterWithdraw = ({
  user,
  userReserve,
  poolReserve,
  withdrawAmount,
}: CalculateHFAfterWithdrawProps) => {
  let totalCollateralInETHAfterWithdraw = valueToBigNumber(
    user.totalCollateralMarketReferenceCurrency,
  );
  let liquidationThresholdAfterWithdraw = user.currentLiquidationThreshold;
  let healthFactorAfterWithdraw = valueToBigNumber(user.healthFactor);

  const reserveLiquidationThreshold =
    user.isInEmode && user.userEmodeCategoryId === poolReserve.eModeCategoryId
      ? poolReserve.formattedEModeLiquidationThreshold
      : poolReserve.formattedReserveLiquidationThreshold;

  if (
    userReserve.usageAsCollateralEnabledOnUser &&
    poolReserve.reserveLiquidationThreshold !== '0'
  ) {
    const amountToWithdrawInEth = valueToBigNumber(withdrawAmount).multipliedBy(
      poolReserve.formattedPriceInMarketReferenceCurrency,
    );
    totalCollateralInETHAfterWithdraw =
      totalCollateralInETHAfterWithdraw.minus(amountToWithdrawInEth);

    liquidationThresholdAfterWithdraw = valueToBigNumber(
      user.totalCollateralMarketReferenceCurrency,
    )
      .multipliedBy(valueToBigNumber(user.currentLiquidationThreshold))
      .minus(valueToBigNumber(amountToWithdrawInEth).multipliedBy(reserveLiquidationThreshold))
      .div(totalCollateralInETHAfterWithdraw)
      .toFixed(4, BigNumber.ROUND_DOWN);

    healthFactorAfterWithdraw = calculateHealthFactorFromBalancesBigUnits({
      collateralBalanceMarketReferenceCurrency: totalCollateralInETHAfterWithdraw,
      borrowBalanceMarketReferenceCurrency: user.totalBorrowsMarketReferenceCurrency,
      currentLiquidationThreshold: liquidationThresholdAfterWithdraw,
    });
  }

  return healthFactorAfterWithdraw;
};

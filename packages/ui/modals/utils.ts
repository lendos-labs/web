import { ExtendedFormattedUser } from '@lendos/types/user';

export const zeroLTVBlockingWithdraw = (user: ExtendedFormattedUser): string[] => {
  const zeroLTVBlockingWithdraw: string[] = [];
  user.userReservesData.forEach(userReserve => {
    if (
      Number(userReserve.scaledATokenBalance) > 0 &&
      userReserve.reserve.baseLTVasCollateral === '0' &&
      userReserve.usageAsCollateralEnabledOnUser &&
      userReserve.reserve.reserveLiquidationThreshold !== '0'
    ) {
      zeroLTVBlockingWithdraw.push(userReserve.reserve.symbol);
    }
  });
  return zeroLTVBlockingWithdraw;
};

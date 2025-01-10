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

export const checkRequiresApproval = ({
  approvedAmount,

  amount,
}: {
  approvedAmount: number;
  amount: string;
}) => {
  // Returns false if the user has a max approval, an approval > amountToSupply, or a valid signature for amountToSupply
  if (approvedAmount === -1 || (approvedAmount !== 0 && approvedAmount >= Number(amount))) {
    return false;
  } else {
    return true;
  }
};

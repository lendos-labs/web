import { ReservesDataHumanized } from '@lendos/types/reserves';
import { UserReservesDataHumanized } from '@lendos/types/user';

export const selectReserves = (poolReserve: ReservesDataHumanized) => poolReserve.reservesData;
export const selectBaseCurrencyData = (poolReserve: ReservesDataHumanized) =>
  poolReserve.baseCurrencyData;
export const selectUserReservesData = (userPoolReserves: UserReservesDataHumanized) =>
  userPoolReserves.userReserves;
export const selectUserEModeCategory = (userPoolReserves: UserReservesDataHumanized) =>
  userPoolReserves.userEmodeCategoryId;

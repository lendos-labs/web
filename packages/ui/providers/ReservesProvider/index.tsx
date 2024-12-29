import {
  EmodeCategory,
  FormattedReservesAndIncentives,
  PoolBaseCurrencyHumanized,
  ReserveLpToken,
  ReserveToken,
} from '@lendos/types/reserves';
import {
  ExtendedFormattedUser,
  FormattedUserReserves,
  UserReservesDataHumanized,
} from '@lendos/types/user';
import { createContext, useContext } from 'react';

export interface ReservesContextType {
  loading: boolean;
  reserves: FormattedReservesAndIncentives<ReserveToken>[];
  lpReserves: FormattedReservesAndIncentives<ReserveLpToken>[];
  userLpReserves: FormattedUserReserves<ReserveLpToken>[];
  eModes: Record<number, EmodeCategory>;
  accountSummary: ExtendedFormattedUser | undefined;
  userReserves: UserReservesDataHumanized[];
  baseCurrencyData: PoolBaseCurrencyHumanized;
}

export const ReservesContext = createContext<ReservesContextType>({} as ReservesContextType);

export const useReservesContext = () => {
  const context = useContext(ReservesContext);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- check is hook call inside provider
  if (!context) {
    throw new Error('useReservesContext must be used within a ReservesContextProvider');
  }

  return context;
};

import { createContext, useContext } from 'react';

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

export interface ReservesContextType {
  loading: boolean;
  reserves: FormattedReservesAndIncentives<ReserveToken>[];
  lpReserves: FormattedReservesAndIncentives<ReserveLpToken>[];
  accountLpReserves: FormattedUserReserves<ReserveLpToken>[];
  accountTokenReserves: FormattedUserReserves<ReserveToken>[];
  eModes: Record<number, EmodeCategory>;
  accountSummary: ExtendedFormattedUser | undefined;
  accountReserves: UserReservesDataHumanized['userReserves'];
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

import React, { ReactNode } from 'react';
import { ReservesContext } from '@lendos/ui/providers/ReservesProvider';
import {
  reserves,
  dexReserves,
  accountSummary,
  userLpReserves,
  emodes,
  userReserves,
  baseCurrency,
} from '@lendos/constants/reserves';

export const ReservesProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ReservesContext.Provider
      value={{
        loading: false,
        reserves,
        lpReserves: dexReserves,
        accountLpReserves: userLpReserves,
        eModes: emodes,
        accountSummary: accountSummary,
        accountReserves: userReserves,
        baseCurrencyData: baseCurrency,
      }}
    >
      {children}
    </ReservesContext.Provider>
  );
};

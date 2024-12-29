import React, { ReactNode } from 'react';
import { ReservesContext } from '@lendos/ui/providers/ReservesProvider';

export const StateProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ReservesContext.Provider
      value={{
        loading: true,
        reserves: [],
        lpReserves: [],
        accountLpReserves: [],
        eModes: {},
        accountSummary: undefined,
        accountReserves: [],
        baseCurrencyData: {
          marketReferenceCurrencyDecimals: 6,
          marketReferenceCurrencyPriceInUsd: '1',
          networkBaseTokenPriceInUsd: '1',
          networkBaseTokenPriceDecimals: 6,
        },
      }}
    >
      {children}
    </ReservesContext.Provider>
  );
};
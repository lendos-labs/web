import React, { ReactNode, useEffect, useState } from 'react';

import { useAccountContext } from '@lendos/ui/providers/AccountProvider';
import { ReservesContext } from '@lendos/ui/providers/ReservesProvider';
import { useStateContext } from '@lendos/ui/providers/StateProvider';

import { FormattedReservesAndIncentives, ReserveToken } from '@lendos/types/reserves';
import { ExtendedFormattedUser } from '@lendos/types/user';

import { baseCurrency } from '@lendos/constants/reserves';

export const ReservesProvider = ({ children }: { children: ReactNode }) => {
  const { currentMarketData } = useStateContext();
  const { account } = useAccountContext();
  const [reserves, setReserves] = useState<FormattedReservesAndIncentives<ReserveToken>[]>([]);

  useEffect(() => {
    // void (async () => {
    //   const incentives = new UiIncentivesService(currentMarketData);
    //   const reservesIncentives = await incentives.getReservesIncentivesDataHumanized();
    //   const userReserves = await incentives.getUserReservesIncentivesData(account as Address);
    //   console.log({ reservesIncentives, userReserves });
    // })();
  }, [currentMarketData, account]);

  return (
    <ReservesContext.Provider
      value={{
        loading: false,
        reserves,
        lpReserves: [],
        accountLpReserves: [],
        eModes: {},
        accountSummary: {
          userReservesData: [],
          totalLiquidityMarketReferenceCurrency: '0',
          totalLiquidityUSD: '0',
          totalCollateralMarketReferenceCurrency: '0',
          totalCollateralUSD: '0',
          totalBorrowsMarketReferenceCurrency: '0',
          totalBorrowsUSD: '0',
          netWorthUSD: '0',
          availableBorrowsMarketReferenceCurrency: '0',
          availableBorrowsUSD: '0',
          currentLoanToValue: '0',
          currentLiquidationThreshold: '0',
          healthFactor: '-1',
          isInIsolationMode: false,
          calculatedUserIncentives: {},
          userEmodeCategoryId: 0,
          isInEmode: false,
          earnedAPY: 0,
          debtAPY: 0,
          netAPY: 0,
        } as ExtendedFormattedUser,
        accountReserves: [],
        baseCurrencyData: baseCurrency,
      }}
    >
      {children}
    </ReservesContext.Provider>
  );
};

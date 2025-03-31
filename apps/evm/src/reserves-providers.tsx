import React, { ReactNode } from 'react';

import { useAccountContext } from '@lendos/ui/providers/AccountProvider';
import { ReservesContext } from '@lendos/ui/providers/ReservesProvider';
import { useStateContext } from '@lendos/ui/providers/StateProvider';

import {
  FormattedReservesAndIncentives,
  ReserveLpToken,
  ReserveToken,
  Reserves,
} from '@lendos/types/reserves';
import { FormattedUserReserves } from '@lendos/types/user';

import { useExtendedUserSummaryAndIncentives } from './hooks/useExtendedUserSummaryAndIncentives';
import { usePoolReservesHumanized } from './hooks/usePoolReserves';
import { usePoolFormattedReserves } from './hooks/usePoolsFormattedReserves';
import { useUserPoolReservesHumanized } from './hooks/useUserPoolReservesHumanized';
import { EvmMarketDataType } from './types/common';

export const ReservesProvider = ({ children }: { children: ReactNode }) => {
  const state = useStateContext();
  const currentMarketData = state.currentMarketData as EvmMarketDataType;
  const { account } = useAccountContext();
  const { data: reserves, isLoading: reservesDataLoading } =
    usePoolReservesHumanized(currentMarketData);
  const baseCurrencyData = reserves?.baseCurrencyData;

  const { data: formattedPoolReserves, isLoading: formattedPoolReservesLoading } =
    usePoolFormattedReserves(currentMarketData);

  const { data: userReservesData, isLoading: userReservesDataLoading } =
    useUserPoolReservesHumanized(currentMarketData);

  const { data: accountSummary, isLoading: userSummaryLoading } =
    useExtendedUserSummaryAndIncentives(currentMarketData);

  const isReservesLoading = reservesDataLoading || formattedPoolReservesLoading;
  const isUserDataLoading = userReservesDataLoading || userSummaryLoading;

  return (
    <ReservesContext.Provider
      value={{
        loading: isReservesLoading || (!!account && isUserDataLoading),
        reserves: formattedPoolReserves
          ? (formattedPoolReserves.filter(
              p => p.type === Reserves.ASSET,
            ) as FormattedReservesAndIncentives<ReserveToken>[])
          : [],
        lpReserves: formattedPoolReserves
          ? (formattedPoolReserves.filter(
              p => p.type === Reserves.LP,
            ) as FormattedReservesAndIncentives<ReserveLpToken>[])
          : [],
        accountLpReserves: (accountSummary?.userReservesData ?? []).filter(
          p => p.reserve.type === Reserves.LP,
        ) as FormattedUserReserves<ReserveLpToken>[],
        accountTokenReserves: (accountSummary?.userReservesData ?? []).filter(
          p => p.reserve.type === Reserves.ASSET,
        ) as FormattedUserReserves<ReserveToken>[],
        eModes: {},
        accountSummary,
        accountReserves: userReservesData?.userReserves ?? [],
        baseCurrencyData: baseCurrencyData ?? {
          marketReferenceCurrencyDecimals: 0,
          marketReferenceCurrencyPriceInUsd: '0',
          networkBaseTokenPriceInUsd: '0',
          networkBaseTokenPriceDecimals: 0,
        },
      }}
    >
      {children}
    </ReservesContext.Provider>
  );
};

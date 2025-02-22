import { useQueries } from '@tanstack/react-query';

import { ReservesDataHumanized } from '@lendos/types/reserves';

import { POLLING_INTERVAL, queryKeysFactory } from '@lendos/constants/queries';

import { uiPoolService } from '../services/ui-pool.ts';
import { EvmMarketDataType } from '../types/common.ts';
import { HookOpts } from './types.ts';

export const usePoolsReservesHumanized = <T = ReservesDataHumanized>(
  marketsData: EvmMarketDataType[],
  opts?: HookOpts<ReservesDataHumanized, T>,
) => {
  return useQueries({
    queries: marketsData.map(marketData => ({
      queryKey: queryKeysFactory.poolReservesDataHumanized(marketData),
      queryFn: () => uiPoolService.getReservesHumanized(marketData),
      refetchInterval: POLLING_INTERVAL,
      meta: {},
      ...opts,
    })),
  });
};

export const usePoolReservesHumanized = (marketData: EvmMarketDataType) => {
  return usePoolsReservesHumanized([marketData])[0] as {
    data: ReservesDataHumanized | undefined;
    isLoading: boolean;
  };
};

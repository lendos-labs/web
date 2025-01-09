import { UseQueryOptions, useQueries } from '@tanstack/react-query';

import { MarketDataType } from '@lendos/types/market';
import { ReservesDataHumanized } from '@lendos/types/reserves';

import { POLLING_INTERVAL, queryKeysFactory } from '@lendos/constants/queries';

import { uiPoolService } from '../services/ui-pool.ts';
import { HookOpts } from './types.ts';

export const usePoolsReservesHumanized = <T = ReservesDataHumanized>(
  marketsData: MarketDataType[],
  opts?: HookOpts<ReservesDataHumanized, T>,
) => {
  return useQueries({
    queries: marketsData.map(
      marketData =>
        ({
          queryKey: queryKeysFactory.poolReservesDataHumanized(marketData),
          queryFn: () => uiPoolService.getReservesHumanized(marketData),
          refetchInterval: POLLING_INTERVAL,
          meta: {},
          ...opts,
        }) as UseQueryOptions<ReservesDataHumanized, Error, T>,
    ),
  });
};

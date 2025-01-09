import { UseQueryOptions, useQueries } from '@tanstack/react-query';

import { MarketDataType } from '@lendos/types/market';
import { ReservesIncentiveDataHumanized } from '@lendos/types/reserves';

import { POLLING_INTERVAL, queryKeysFactory } from '@lendos/constants/queries';

import { uiIncentivesService } from '../services/ui-incentives';
import { HookOpts } from './types';

export const usePoolsReservesIncentivesHumanized = <T = ReservesIncentiveDataHumanized[]>(
  marketsData: MarketDataType[],
  opts?: HookOpts<ReservesIncentiveDataHumanized[], T>,
) =>
  useQueries({
    queries: marketsData.map(
      marketData =>
        ({
          queryKey: queryKeysFactory.poolReservesIncentiveDataHumanized(marketData),
          queryFn: () => uiIncentivesService.getReservesIncentivesDataHumanized(marketData),
          refetchInterval: POLLING_INTERVAL,
          ...opts,
        }) as UseQueryOptions<ReservesIncentiveDataHumanized[]>,
    ),
  });

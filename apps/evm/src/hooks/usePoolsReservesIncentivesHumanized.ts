import { UseQueryOptions, useQueries } from '@tanstack/react-query';

import { ReservesIncentiveDataHumanized } from '@lendos/types/reserves';

import { POLLING_INTERVAL, queryKeysFactory } from '@lendos/constants/queries';

import { uiIncentivesService } from '../services/ui-incentives';
import { EvmMarketDataType } from '../types/common';
import { HookOpts } from './types';

export const usePoolsReservesIncentivesHumanized = <T = ReservesIncentiveDataHumanized[]>(
  marketsData: EvmMarketDataType[],
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

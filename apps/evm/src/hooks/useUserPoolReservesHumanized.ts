import { useQueries } from '@tanstack/react-query';

import { useAccountContext } from '@lendos/ui/providers/AccountProvider';

import { MarketDataType } from '@lendos/types/market';
import { UserReservesDataHumanized } from '@lendos/types/user';

import { POLLING_INTERVAL, queryKeysFactory } from '@lendos/constants/queries';

import { uiPoolService } from '../services/ui-pool.ts';
import { HookOpts } from './types';

export const useUserPoolsReservesHumanized = <T = UserReservesDataHumanized>(
  marketsData: MarketDataType[],
  opts?: HookOpts<UserReservesDataHumanized, T>,
) => {
  const { account } = useAccountContext();

  return useQueries({
    queries: marketsData.map(marketData => ({
      queryKey: queryKeysFactory.userPoolReservesDataHumanized(account ?? '', marketData),
      queryFn: async () => uiPoolService.getUserReservesHumanized(marketData, account ?? '0x'),
      enabled: !!account,
      refetchInterval: POLLING_INTERVAL,
      ...opts,
    })),
  });
};

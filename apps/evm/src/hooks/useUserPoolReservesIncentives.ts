import { useQueries } from '@tanstack/react-query';

import { useAccountContext } from '@lendos/ui/providers/AccountProvider';

import { UserReservesIncentivesDataHumanized } from '@lendos/types/user';

import { POLLING_INTERVAL, queryKeysFactory } from '@lendos/constants/queries';

import { uiIncentivesService } from '../services/ui-incentives.ts';
import { EvmMarketDataType } from '../types/common.ts';
import { HookOpts } from './types';

export const useUserPoolsReservesIncentivesHumanized = <T = UserReservesIncentivesDataHumanized[]>(
  marketsData: EvmMarketDataType[],
  opts?: HookOpts<UserReservesIncentivesDataHumanized[], T>,
) => {
  const { account } = useAccountContext();
  return useQueries({
    queries: marketsData.map(marketData => ({
      queryKey: queryKeysFactory.userPoolReservesIncentiveDataHumanized(account ?? '', marketData),
      queryFn: () => uiIncentivesService.getUserReservesIncentivesData(marketData, account ?? '0x'),
      enabled: !!account,
      refetchInterval: POLLING_INTERVAL,
      ...opts,
    })),
  });
};

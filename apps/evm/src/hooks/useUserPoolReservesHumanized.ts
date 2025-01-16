import { useQueries } from '@tanstack/react-query';
import { Address } from 'viem';

import { useAccountContext } from '@lendos/ui/providers/AccountProvider';

import { UserReservesDataHumanized } from '@lendos/types/user';

import { POLLING_INTERVAL, queryKeysFactory } from '@lendos/constants/queries';

import { uiPoolService } from '../services/ui-pool.ts';
import { EvmMarketDataType } from '../types/common.ts';
import { HookOpts } from './types';

export const useUserPoolsReservesHumanized = <T = UserReservesDataHumanized>(
  marketsData: EvmMarketDataType[],
  opts?: HookOpts<UserReservesDataHumanized, T>,
) => {
  const { account } = useAccountContext();

  return useQueries({
    queries: marketsData.map(marketData => ({
      queryKey: queryKeysFactory.userPoolReservesDataHumanized(account ?? '', marketData),
      queryFn: () => uiPoolService.getUserReservesHumanized(marketData, account as Address),
      enabled: !!account,
      refetchInterval: POLLING_INTERVAL,
      ...opts,
    })),
  });
};

export const useUserPoolReservesHumanized = (marketData: EvmMarketDataType) => {
  return useUserPoolsReservesHumanized([marketData])[0] as {
    data: UserReservesDataHumanized | undefined;
    isLoading: boolean;
  };
};

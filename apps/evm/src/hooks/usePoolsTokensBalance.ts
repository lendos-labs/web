import { useQueries } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

import { UserPoolTokensBalances } from '@lendos/types/user';

import { POLLING_INTERVAL, queryKeysFactory } from '@lendos/constants/queries';

import { walletBalanceService } from '../services/wallet-balance';
import { EvmMarketDataType } from '../types/common';
import { HookOpts } from './types';

export const usePoolsTokensBalance = <T = UserPoolTokensBalances[]>(
  marketsData: EvmMarketDataType[],
  opts?: HookOpts<UserPoolTokensBalances[], T>,
) => {
  const { address } = useAccount();
  return useQueries({
    queries: marketsData.map(marketData => ({
      queryKey: queryKeysFactory.poolTokens(address ?? '0x', marketData),
      queryFn: () => walletBalanceService.getPoolTokensBalances(address ?? '0x', marketData),
      enabled: !!address,
      refetchInterval: POLLING_INTERVAL,
      ...opts,
    })),
  });
};

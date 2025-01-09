import { MarketDataType } from '@lendos/types/market';
import { UserSummaryAndIncentives } from '@lendos/types/user';

import { formatUserSummaryAndIncentives } from '@lendos/constants/formatReserves';

import { usePoolsReservesHumanized } from './usePoolReserves';
import { usePoolsFormattedReserves } from './usePoolsFormattedReserves';
import { usePoolsReservesIncentivesHumanized } from './usePoolsReservesIncentivesHumanized';
import { useUserPoolsReservesHumanized } from './useUserPoolReservesHumanized';
import { useUserPoolsReservesIncentivesHumanized } from './useUserPoolReservesIncentives';
import { SimplifiedUseQueryResult, combineQueries } from './utils';

export const useUserSummariesAndIncentives = (
  marketsData: MarketDataType[],
): SimplifiedUseQueryResult<UserSummaryAndIncentives>[] => {
  const poolsReservesQuery = usePoolsReservesHumanized(marketsData);
  const userPoolsReservesQuery = useUserPoolsReservesHumanized(marketsData);
  const formattedReserves = usePoolsFormattedReserves(marketsData);
  const poolsReservesIncentivesQuery = usePoolsReservesIncentivesHumanized(marketsData);
  const userPoolsReservesIncentiveQuery = useUserPoolsReservesIncentivesHumanized(marketsData);

  return poolsReservesQuery.map((elem, index) => {
    const queries: SimplifiedUseQueryResult[] = [
      elem,
      userPoolsReservesQuery[index] ?? { data: null, error: null, isLoading: true },
      formattedReserves[index] ?? { data: null, error: null, isLoading: true },
      poolsReservesIncentivesQuery[index] ?? { data: null, error: null, isLoading: true },
      userPoolsReservesIncentiveQuery[index] ?? { data: null, error: null, isLoading: true },
    ];
    return combineQueries([...queries] as const, formatUserSummaryAndIncentives);
  });
};

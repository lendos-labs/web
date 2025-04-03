import { FormatUserSummaryAndIncentivesResponse } from '@aave/math-utils';

import { useAccountContext } from '@lendos/ui/providers/AccountProvider';

import { FormattedReservesAndIncentives } from '@lendos/types/reserves';

import { formatUserSummaryAndIncentives } from '@lendos/constants/formatReserves';

import { EvmMarketDataType } from '../types/common';
import { usePoolsReservesHumanized } from './usePoolReserves';
import { usePoolsFormattedReserves } from './usePoolsFormattedReserves';
import { usePoolsReservesIncentivesHumanized } from './usePoolsReservesIncentivesHumanized';
import { useUserPoolsReservesHumanized } from './useUserPoolReservesHumanized';
import { useUserPoolsReservesIncentivesHumanized } from './useUserPoolReservesIncentives';
import { SimplifiedUseQueryResult, combineQueries } from './utils';

export const useUserSummariesAndIncentives = (
  marketsData: EvmMarketDataType[],
): SimplifiedUseQueryResult<
  FormatUserSummaryAndIncentivesResponse<FormattedReservesAndIncentives>
>[] => {
  const poolsReservesQuery = usePoolsReservesHumanized(marketsData);
  const userPoolsReservesQuery = useUserPoolsReservesHumanized(marketsData);
  const formattedReserves = usePoolsFormattedReserves(marketsData);
  const poolsReservesIncentivesQuery = usePoolsReservesIncentivesHumanized(marketsData);
  const userPoolsReservesIncentiveQuery = useUserPoolsReservesIncentivesHumanized(marketsData);
  const { account } = useAccountContext();

  return poolsReservesQuery.map((elem, index) => {
    if (
      !account ||
      !userPoolsReservesQuery[index] ||
      !formattedReserves[index] ||
      !poolsReservesIncentivesQuery[index] ||
      !userPoolsReservesIncentiveQuery[index]
    ) {
      return {
        data: [] as unknown as FormatUserSummaryAndIncentivesResponse<FormattedReservesAndIncentives>,
        isLoading: false,
        error: undefined,
      };
    }

    return combineQueries(
      [
        elem,
        userPoolsReservesQuery[index],
        formattedReserves[index],
        poolsReservesIncentivesQuery[index],
        userPoolsReservesIncentiveQuery[index],
      ] as const,
      formatUserSummaryAndIncentives,
    );
  });
};

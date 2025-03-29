import { NetworkConfig } from '@lendos/types/chain';
import {
  FormattedReservesAndIncentives,
  ReservesDataHumanized,
  ReservesIncentiveDataHumanized,
} from '@lendos/types/reserves';

import { formatReservesAndIncentives } from '@lendos/constants/formatReserves';

import { EvmMarketDataType } from '../types/common.ts';
import { usePoolsReservesHumanized } from './usePoolReserves.ts';
import { usePoolsReservesIncentivesHumanized } from './usePoolsReservesIncentivesHumanized.ts';
import { SimplifiedUseQueryResult, combineQueries } from './utils.ts';

export const usePoolsFormattedReserves = (
  marketsData: EvmMarketDataType[],
): SimplifiedUseQueryResult<FormattedReservesAndIncentives[]>[] => {
  const poolsReservesQueries = usePoolsReservesHumanized(marketsData);
  const poolsReservesIncentivesQueries = usePoolsReservesIncentivesHumanized(marketsData);

  return poolsReservesQueries.map((poolReservesQuery, index) => {
    const marketData = marketsData[index];
    const poolReservesIncentivesQuery = poolsReservesIncentivesQueries[index];

    const networkConfig = marketData?.chain ?? ({} as NetworkConfig);
    const selector = (
      reservesData: ReservesDataHumanized,
      incentivesData: ReservesIncentiveDataHumanized[],
    ) => {
      return formatReservesAndIncentives(reservesData, incentivesData, networkConfig);
    };
    return poolReservesIncentivesQuery
      ? {
          ...combineQueries(
            [poolReservesQuery, poolReservesIncentivesQuery],
            selector as unknown as (
              ...data: (ReservesDataHumanized | ReservesIncentiveDataHumanized[])[]
            ) => FormattedReservesAndIncentives[],
          ),
        }
      : {
          isLoading: poolReservesQuery.isLoading,
          data: undefined,
          error: poolReservesQuery.error,
        };
  });
};

export const usePoolFormattedReserves = (marketData: EvmMarketDataType) => {
  return usePoolsFormattedReserves([marketData])[0] as {
    data: FormattedReservesAndIncentives[] | undefined;
    isLoading: boolean;
  };
};

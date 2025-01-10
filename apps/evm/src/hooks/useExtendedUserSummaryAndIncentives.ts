import { MarketDataType } from '@lendos/types/market';
import {
  ExtendedFormattedUser,
  UserReservesDataHumanized,
  UserSummaryAndIncentives,
  UserYield,
} from '@lendos/types/user';

import { reserveSortFn } from '@lendos/constants/sort';

import { useUserPoolsReservesHumanized } from './useUserPoolReservesHumanized.ts';
import { useUserSummariesAndIncentives } from './useUserSummaryAndIncentives.ts';
import { useUserYields } from './useUserYield.ts';
import { SimplifiedUseQueryResult, combineQueries } from './utils.ts';

const formatExtendedUserAndIncentives = (
  userSummariesAndIncentives: UserSummaryAndIncentives,
  userYield: UserYield,
  userReserves: UserReservesDataHumanized,
) => {
  return {
    ...userSummariesAndIncentives,
    userEmodeCategoryId: userReserves.userEmodeCategoryId,
    isInEmode: userReserves.userEmodeCategoryId !== 0,
    userReservesData: userSummariesAndIncentives.userReservesData.toSorted((a, b) =>
      reserveSortFn(a.reserve, b.reserve),
    ),
    earnedAPY: userYield.earnedAPY,
    debtAPY: userYield.debtAPY,
    netAPY: userYield.netAPY,
  };
};

export const useExtendedUserSummariesAndIncentives = (
  marketsData: MarketDataType[],
): SimplifiedUseQueryResult<ExtendedFormattedUser>[] => {
  const userSummariesQueries = useUserSummariesAndIncentives(marketsData);
  const userYieldsQueries = useUserYields(marketsData);
  const userReservesQueries = useUserPoolsReservesHumanized(marketsData);

  return userSummariesQueries.map((elem, index) => {
    const userYieldQuery = userYieldsQueries[index];
    const userReservesQuery = userReservesQueries[index];

    return userYieldQuery && userReservesQuery
      ? combineQueries(
          [elem, userYieldQuery, userReservesQuery] as const,
          formatExtendedUserAndIncentives,
        )
      : {
          isLoading: true,
          data: undefined,
          error: null,
        };
  });
};

export const useExtendedUserSummaryAndIncentives = (marketData: MarketDataType) => {
  return useExtendedUserSummariesAndIncentives([marketData])[0] as {
    data: ExtendedFormattedUser | undefined;
    isLoading: boolean;
  };
};

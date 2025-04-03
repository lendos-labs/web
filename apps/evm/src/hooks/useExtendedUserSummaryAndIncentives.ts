import { useAccountContext } from '@lendos/ui/providers/AccountProvider';

import {
  ExtendedFormattedUser,
  UserReservesDataHumanized,
  UserSummaryAndIncentives,
  UserYield,
} from '@lendos/types/user';

import { reserveSortFn } from '@lendos/constants/sort';

import { EvmMarketDataType } from '../types/common.ts';
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
  marketsData: EvmMarketDataType[],
): SimplifiedUseQueryResult<ExtendedFormattedUser>[] => {
  const userSummariesQueries = useUserSummariesAndIncentives(marketsData);
  const userYieldsQueries = useUserYields(marketsData);
  const userReservesQueries = useUserPoolsReservesHumanized(marketsData);
  const { account } = useAccountContext();

  return account
    ? userSummariesQueries.map((elem, index) => {
        const userYield = userYieldsQueries[index];
        const userReserve = userReservesQueries[index];
        if (!userYield || !userReserve) {
          return {
            data: {},
            isLoading: false,
          } as SimplifiedUseQueryResult<ExtendedFormattedUser>;
        }
        return combineQueries(
          [elem, userYield, userReserve] as const,
          formatExtendedUserAndIncentives,
        );
      })
    : [
        {
          data: {},
          isLoading: false,
        } as SimplifiedUseQueryResult<ExtendedFormattedUser>,
      ];
};

export const useExtendedUserSummaryAndIncentives = (marketData: EvmMarketDataType) => {
  return useExtendedUserSummariesAndIncentives([marketData])[0] as {
    data: ExtendedFormattedUser | undefined;
    isLoading: boolean;
  };
};

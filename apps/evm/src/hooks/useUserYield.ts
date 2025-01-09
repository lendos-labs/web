import { FormatUserSummaryAndIncentivesResponse } from '@aave/math-utils';
import { BigNumber } from 'bignumber.js';
import memoize from 'micro-memoize';

import { MarketDataType } from '@lendos/types/market';
import { FormattedReservesAndIncentives } from '@lendos/types/reserves';
import { UserYield } from '@lendos/types/user';

import { usePoolsFormattedReserves } from './usePoolsFormattedReserves';
import { useUserSummariesAndIncentives } from './useUserSummaryAndIncentives';
import { SimplifiedUseQueryResult, combineQueries } from './utils';

const formatUserYield = memoize(
  (
    formattedPoolReserves: FormattedReservesAndIncentives[],
    user: FormatUserSummaryAndIncentivesResponse,
  ) => {
    const proportions = user.userReservesData.reduce(
      (acc, value) => {
        const reserve = formattedPoolReserves.find(
          r => r.underlyingAsset === value.reserve.underlyingAsset,
        );

        if (reserve) {
          if (value.underlyingBalanceUSD !== '0') {
            acc.positiveProportion = acc.positiveProportion.plus(
              new BigNumber(reserve.supplyAPY).multipliedBy(value.underlyingBalanceUSD),
            );
            if (reserve.aIncentivesData) {
              reserve.aIncentivesData.forEach(incentive => {
                acc.positiveProportion = acc.positiveProportion.plus(
                  new BigNumber(incentive.incentiveAPR).multipliedBy(value.underlyingBalanceUSD),
                );
              });
            }
          }
          if (value.variableBorrowsUSD !== '0') {
            acc.negativeProportion = acc.negativeProportion.plus(
              new BigNumber(reserve.variableBorrowAPY).multipliedBy(value.variableBorrowsUSD),
            );
            if (reserve.vIncentivesData) {
              reserve.vIncentivesData.forEach(incentive => {
                acc.positiveProportion = acc.positiveProportion.plus(
                  new BigNumber(incentive.incentiveAPR).multipliedBy(value.variableBorrowsUSD),
                );
              });
            }
          }
        } else {
          throw new Error('no possible to calculate net apy');
        }

        return acc;
      },
      {
        positiveProportion: new BigNumber(0),
        negativeProportion: new BigNumber(0),
      },
    );

    const earnedAPY = proportions.positiveProportion.dividedBy(user.totalLiquidityUSD).toNumber();
    const debtAPY = proportions.negativeProportion.dividedBy(user.totalBorrowsUSD).toNumber();
    const netAPY =
      (earnedAPY || 0) *
        (Number(user.totalLiquidityUSD) /
          Number(user.netWorthUSD !== '0' ? user.netWorthUSD : '1')) -
      (debtAPY || 0) *
        (Number(user.totalBorrowsUSD) / Number(user.netWorthUSD !== '0' ? user.netWorthUSD : '1'));
    return {
      earnedAPY,
      debtAPY,
      netAPY,
    };
  },
);

export const useUserYields = (
  marketsData: MarketDataType[],
): SimplifiedUseQueryResult<UserYield>[] => {
  const poolsFormattedReservesQuery = usePoolsFormattedReserves(marketsData);

  const userSummaryQuery = useUserSummariesAndIncentives(marketsData);

  return poolsFormattedReservesQuery.map((elem, index) => {
    const ghoSelector = (
      formattedPoolReserves: FormattedReservesAndIncentives[],
      user: FormatUserSummaryAndIncentivesResponse,
    ) => {
      return formatUserYield(formattedPoolReserves, user);
    };

    return userSummaryQuery[index]
      ? (combineQueries(
          [elem, userSummaryQuery[index]] as const,
          ghoSelector,
        ) as SimplifiedUseQueryResult<UserYield>)
      : {
          isLoading: elem.isLoading,
          data: undefined,
          error: elem.error,
        };
  });
};

import { USD_DECIMALS, nativeToUSD, normalize } from '@aave/math-utils';
import BigNumber from 'bignumber.js';

import { ReservesDataHumanized } from '@lendos/types/reserves';
import { UserPoolTokensBalances } from '@lendos/types/user';

import { API_ETH_MOCK_ADDRESS } from '@lendos/constants/addresses';

import { EvmMarketDataType } from '../types/common';
import { usePoolsReservesHumanized } from './usePoolReserves';
import { usePoolsTokensBalance } from './usePoolsTokensBalance';

interface FormatAggregatedBalanceParams {
  reservesHumanized?: ReservesDataHumanized;
  balances?: UserPoolTokensBalances[];
  marketData: EvmMarketDataType;
}

const formatAggregatedBalance = ({
  reservesHumanized,
  balances,
  marketData,
}: FormatAggregatedBalanceParams) => {
  const reserves = reservesHumanized?.reservesData ?? [];
  const baseCurrencyData = reservesHumanized?.baseCurrencyData ?? {
    marketReferenceCurrencyDecimals: 0,
    marketReferenceCurrencyPriceInUsd: '0',
    networkBaseTokenPriceInUsd: '0',
    networkBaseTokenPriceDecimals: 0,
  };
  const walletBalances = balances ?? [];

  // process data
  let hasEmptyWallet = true;
  const aggregatedBalance = walletBalances.reduce<
    Record<string, { amount: string; amountUSD: string }>
  >((acc, reserve) => {
    const poolReserve = reserves.find(poolReserve => {
      if (reserve.address.toLowerCase() === API_ETH_MOCK_ADDRESS.toLowerCase()) {
        return (
          poolReserve.symbol.toLowerCase() === marketData.chain.wrappedAsset.symbol.toLowerCase()
        );
      }
      return poolReserve.underlyingAsset.toLowerCase() === reserve.address.toLowerCase();
    });

    if (reserve.amount !== '0') {
      hasEmptyWallet = false;
    }

    if (poolReserve) {
      acc[reserve.address] = {
        amount: normalize(reserve.amount, poolReserve.decimals),
        amountUSD: nativeToUSD({
          amount: new BigNumber(reserve.amount),
          currencyDecimals: poolReserve.decimals,
          priceInMarketReferenceCurrency: poolReserve.priceInMarketReferenceCurrency,
          marketReferenceCurrencyDecimals: baseCurrencyData.marketReferenceCurrencyDecimals,
          normalizedMarketReferencePriceInUsd: normalize(
            baseCurrencyData.marketReferenceCurrencyPriceInUsd,
            USD_DECIMALS,
          ),
        }),
      };
    }
    return acc;
  }, {});

  return {
    walletBalances: aggregatedBalance,
    hasEmptyWallet,
  };
};

export const usePoolsWalletBalances = (marketData: EvmMarketDataType[]) => {
  const tokensBalanceQueries = usePoolsTokensBalance(marketData);

  const poolsBalancesQueries = usePoolsReservesHumanized(marketData);

  const isLoading =
    tokensBalanceQueries.find(elem => elem.isLoading) ??
    poolsBalancesQueries.find(elem => elem.isLoading);

  const walletBalances = poolsBalancesQueries.map((query, index) =>
    formatAggregatedBalance({
      reservesHumanized: query.data,
      balances: tokensBalanceQueries[index]?.data,
      marketData: marketData[index] as unknown as EvmMarketDataType,
    }),
  );

  return {
    walletBalances,
    isLoading,
  };
};

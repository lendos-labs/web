import { readContract, readContracts } from '@wagmi/core';
import { Address, erc20Abi } from 'viem';

import {
  EXPOSURE,
  ReserveDataHumanized,
  Reserves,
  ReservesData,
  ReservesDataHumanized,
} from '@lendos/types/reserves';
import { UserReserveData, UserReservesDataHumanized } from '@lendos/types/user';

import { formatReserves, formatUserReserves } from '@lendos/constants/formatReserves';

import { getUiPoolDataAbi } from '../abi/ui-pool-data';
import { wagmiConfigCore } from '../config/connectors';
import { SupportedMarkets } from '../config/supported-markets';
import { lpTokens } from '../constants/lp-tokens';
import { EvmMarketDataType } from '../types/common';

class UiPoolService {
  async getReservesHumanized(marketData: EvmMarketDataType): Promise<ReservesDataHumanized> {
    const response = await readContract(wagmiConfigCore, {
      abi: getUiPoolDataAbi(marketData.market as SupportedMarkets),
      address: marketData.addresses.UI_POOL_DATA_PROVIDER,
      functionName: 'getReservesData',
      args: [marketData.addresses.LENDING_POOL_ADDRESS_PROVIDER],
      chainId: marketData.chain.id,
    });

    const data = formatReserves(
      response as ReservesData,
      marketData.chain.id,
      marketData.addresses.LENDING_POOL_ADDRESS_PROVIDER,
    );

    const reservesData: ReserveDataHumanized[] = await Promise.all(
      data.reservesData.map(async i => {
        const dexLP = lpTokens[i.name];
        if (dexLP) {
          const lpContract = {
            address: i.underlyingAsset as Address,
            abi: dexLP.abi,
            chainId: marketData.chain.id,
          };

          const lpTokensRes = await readContracts(wagmiConfigCore, {
            contracts: [
              { ...lpContract, functionName: 'token0' },
              { ...lpContract, functionName: 'token1' },
              { ...lpContract, functionName: 'totalSupply' },
              { ...lpContract, functionName: 'getReserves' },
            ],
          });

          const token0 = lpTokensRes[0].result ?? ('0x' as Address);
          const token1 = lpTokensRes[1].result ?? ('0x' as Address);
          const totalSupply = lpTokensRes[2].result ?? 0n;
          const reserves = lpTokensRes[3].result ?? [0n, 0n, 0];

          const symbols = await readContracts(wagmiConfigCore, {
            contracts: [
              {
                address: token0,
                abi: erc20Abi,
                functionName: 'symbol',
                chainId: marketData.chain.id,
              },
              {
                address: token1,
                abi: erc20Abi,
                functionName: 'symbol',
                chainId: marketData.chain.id,
              },
            ],
          });

          const symbol0 = symbols[0].result ?? '';
          const symbol1 = symbols[1].result ?? '';

          return {
            ...i,
            type: Reserves.LP,
            token0: {
              address: token0,
              symbol: symbol0,
            },
            token1: {
              address: token1,
              symbol: symbol1,
            },
            dex: {
              name: dexLP.name,
              APY: 0,
              totalSupply: totalSupply.toString(),
              reserve0: reserves[0].toString(),
              reserve1: reserves[1].toString(),
            },
            exposure: EXPOSURE.SINGLE,
          };
        }
        return { ...i, type: Reserves.ASSET };
      }),
    );

    return {
      baseCurrencyData: data.baseCurrencyData,
      reservesData,
    };
  }

  async getUserReservesHumanized(
    marketData: EvmMarketDataType,
    user: Address,
  ): Promise<UserReservesDataHumanized> {
    const response = await readContract(wagmiConfigCore, {
      abi: getUiPoolDataAbi(marketData.market as SupportedMarkets),
      address: marketData.addresses.UI_POOL_DATA_PROVIDER,
      functionName: 'getUserReservesData',
      args: [marketData.addresses.LENDING_POOL_ADDRESS_PROVIDER, user],
      chainId: marketData.chain.id,
    });

    return formatUserReserves(
      response as UserReserveData,
      marketData.chain.id,
      user,
      marketData.addresses.LENDING_POOL_ADDRESS_PROVIDER,
    );
  }
}

export const uiPoolService = new UiPoolService();

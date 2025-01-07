import { readContract, readContracts } from '@wagmi/core';
import { Address, erc20Abi } from 'viem';

import { MarketDataType } from '@lendos/types/market';
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
import { wagmiConfig } from '../config/connectors';
import { SupportedMarkets } from '../config/supported-markets';
import { lpTokens } from '../constants/lp-tokens';

export class UiPoolService {
  public market: MarketDataType;
  constructor(market: MarketDataType) {
    this.market = market;
  }

  async getReservesHumanized(): Promise<ReservesDataHumanized> {
    const response = await readContract(wagmiConfig, {
      abi: getUiPoolDataAbi(this.market.market as SupportedMarkets),
      address: this.market.addresses.UI_POOL_DATA_PROVIDER,
      functionName: 'getReservesData',
      args: [this.market.addresses.LENDING_POOL_ADDRESS_PROVIDER],
      chainId: this.market.chain.id,
    });

    const data = formatReserves(
      response as ReservesData,
      this.market.chain.id,
      this.market.addresses.LENDING_POOL_ADDRESS_PROVIDER,
    );

    const reservesData: ReserveDataHumanized[] = await Promise.all(
      data.reservesData.map(async i => {
        if (lpTokens[i.name]) {
          const lpContract = {
            address: i.underlyingAsset as Address,
            abi: lpTokens[i.name]?.abi ?? ([] as const),
            chainId: this.market.chain.id,
          } as const;

          const [token0, token1, totalSupply, reserves] = await readContracts(wagmiConfig, {
            contracts: [
              { ...lpContract, functionName: 'token0' },
              { ...lpContract, functionName: 'token1' },
              { ...lpContract, functionName: 'totalSupply' },
              { ...lpContract, functionName: 'getReserves' },
            ],
          });

          const [symbol0, sumbol1] = await readContracts(wagmiConfig, {
            contracts: [
              {
                address: token0.result as Address,
                abi: erc20Abi,
                functionName: 'symbol',
                chainId: this.market.chain.id,
              },
              {
                address: token1.result as Address,
                abi: erc20Abi,
                functionName: 'symbol',
                chainId: this.market.chain.id,
              },
            ],
          });

          return {
            ...i,
            type: Reserves.LP,
            token0: {
              address: token0.result as Address,
              symbol: symbol0.result ?? '',
            },
            token1: {
              address: token1.result as Address,
              symbol: sumbol1.result ?? '',
            },
            dex: {
              name: lpTokens[i.name]?.name ?? '',
              APY: 0,
              totalSupply: (totalSupply.result as bigint).toString(),
              reserve0: (reserves.result as bigint[])[0]?.toString() ?? '',
              reserve1: (reserves.result as bigint[])[1]?.toString() ?? '',
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

  async getUserReservesHumanized(user: Address): Promise<UserReservesDataHumanized> {
    const response = await readContract(wagmiConfig, {
      abi: getUiPoolDataAbi(this.market.market as SupportedMarkets),
      address: this.market.addresses.UI_POOL_DATA_PROVIDER,
      functionName: 'getUserReservesData',
      args: [this.market.addresses.LENDING_POOL_ADDRESS_PROVIDER, user],
      chainId: this.market.chain.id,
    });

    return formatUserReserves(
      response as UserReserveData,
      this.market.chain.id,
      user,
      this.market.addresses.LENDING_POOL_ADDRESS_PROVIDER,
    );
  }
}

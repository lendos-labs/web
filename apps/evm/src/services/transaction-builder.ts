import { EstimateGasParameters, estimateGas } from '@wagmi/core';
import { Address, encodeFunctionData } from 'viem';

import { MarketDataType } from '@lendos/types/market';

import { API_ETH_MOCK_ADDRESS } from '@lendos/constants/addresses';

import { lendingPoolAbi } from '../abi/lending-pool';
import { wethGatewayAbi } from '../abi/weth-gateway';
import { wagmiConfigCore } from '../config/connectors';

export class TransactionBuilder {
  private readonly market: MarketDataType;

  constructor(market: MarketDataType) {
    this.market = market;
  }

  prepareSupply(reserve: Address, amount: bigint, account: Address): EstimateGasParameters {
    if (reserve.toLowerCase() === API_ETH_MOCK_ADDRESS.toLowerCase()) {
      const txData = encodeFunctionData({
        abi: wethGatewayAbi,
        functionName: 'depositETH',
        args: [this.market.addresses.LENDING_POOL, account, 0],
      });

      return {
        data: txData,
        to: this.market.addresses.WETH_GATEWAY,
        account,
        value: amount,
      };
    }

    const txData = encodeFunctionData({
      abi: lendingPoolAbi,
      functionName: 'deposit',
      args: [reserve, amount, account, 0],
    });

    return {
      data: txData,
      to: this.market.addresses.LENDING_POOL,
      account,
    };
  }

  async estimateGas(data: EstimateGasParameters): Promise<bigint> {
    return await estimateGas(wagmiConfigCore, data);
  }
}

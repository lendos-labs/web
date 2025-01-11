import { EstimateGasParameters, estimateGas } from '@wagmi/core';
import { Address, encodeFunctionData, erc20Abi } from 'viem';

import { API_ETH_MOCK_ADDRESS, MAX_UINT_AMOUNT } from '@lendos/constants/addresses';

import { lendingPoolAbi } from '../abi/lending-pool';
import { wethGatewayAbi } from '../abi/weth-gateway';
import { wagmiConfigCore } from '../config/connectors';
import { EvmApproveData, EvmMarketDataType } from '../types/common';

export class TransactionBuilder {
  private readonly market: EvmMarketDataType;

  constructor(market: EvmMarketDataType) {
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

  prepareApproval({ spender, token, user }: EvmApproveData): EstimateGasParameters {
    const txData = encodeFunctionData({
      abi: erc20Abi,
      functionName: 'approve',
      args: [spender, BigInt(MAX_UINT_AMOUNT)],
    });

    return {
      data: txData,
      to: token,
      account: user,
    };
  }

  async estimateGas(data: EstimateGasParameters): Promise<bigint> {
    return await estimateGas(wagmiConfigCore, data);
  }
}

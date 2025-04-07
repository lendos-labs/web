import { EstimateGasParameters, estimateGas } from '@wagmi/core';
import { Address, encodeFunctionData, erc20Abi, maxUint256, parseEther, parseUnits } from 'viem';

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
        chainId: this.market.chain.id,
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
      chainId: this.market.chain.id,
    };
  }

  prepareWithdraw(
    reserve: Address,
    amount: string,
    account: Address,
    decimals: number,
  ): EstimateGasParameters {
    if (reserve.toLowerCase() === API_ETH_MOCK_ADDRESS.toLowerCase()) {
      const convertedAmount = amount === '-1' ? maxUint256 : parseEther(amount);

      const txData = encodeFunctionData({
        abi: wethGatewayAbi,
        functionName: 'withdrawETH',
        args: [this.market.addresses.LENDING_POOL, convertedAmount, account],
      });

      return {
        data: txData,
        to: this.market.addresses.WETH_GATEWAY,
        account,
      };
    }

    const convertedAmount = amount === '-1' ? maxUint256 : parseUnits(amount, decimals);

    const txData = encodeFunctionData({
      abi: lendingPoolAbi,
      functionName: 'withdraw',
      args: [reserve, convertedAmount, account],
    });

    return {
      data: txData,
      to: this.market.addresses.LENDING_POOL,
      account,
      chainId: this.market.chain.id,
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
      chainId: this.market.chain.id,
    };
  }

  async estimateGas(data: EstimateGasParameters): Promise<bigint> {
    return await estimateGas(wagmiConfigCore, data);
  }
}

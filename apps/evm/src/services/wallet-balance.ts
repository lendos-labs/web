import { readContract } from '@wagmi/core';
import { Address } from 'viem';

import { UserPoolTokensBalances } from '@lendos/types/user';

import { walletBalanceAbi } from '../abi/wallet-balance.ts';
import { wagmiConfigCore } from '../config/connectors.ts';
import { EvmMarketDataType } from '../types/common.ts';

export class WalletBalanceService {
  async getPoolTokensBalances(
    user: Address,
    market: EvmMarketDataType,
  ): Promise<UserPoolTokensBalances[]> {
    const response = await readContract(wagmiConfigCore, {
      address: market.addresses.WALLET_BALANCE_PROVIDER,
      abi: walletBalanceAbi,
      functionName: 'getUserWalletBalances',
      args: [market.addresses.LENDING_POOL_ADDRESS_PROVIDER, user],
      chainId: market.chain.id,
    });

    const { 0: tokenAddresses, 1: balances } = response;

    return tokenAddresses.map((address, index) => ({
      address: address,
      amount: balances[index] ? balances[index].toString() : '0',
    }));
  }
}

export const walletBalanceService = new WalletBalanceService();

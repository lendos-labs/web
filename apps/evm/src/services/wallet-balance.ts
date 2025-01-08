import { readContract } from '@wagmi/core';
import { Address } from 'viem';

import { MarketDataType } from '@lendos/types/market';

import { walletBalanceAbi } from '../abi/wallet-balance.ts';
import { wagmiConfigCore } from '../config/connectors.ts';

export interface UserPoolTokensBalances {
  address: string;
  amount: string;
}

export class WalletBalanceService {
  private readonly market: MarketDataType;

  constructor(market: MarketDataType) {
    this.market = market;
  }

  async getPoolTokensBalances(user: string): Promise<UserPoolTokensBalances[]> {
    const response = await readContract(wagmiConfigCore, {
      address: this.market.addresses.WALLET_BALANCE_PROVIDER,
      abi: walletBalanceAbi,
      functionName: 'getUserWalletBalances',
      args: [this.market.addresses.LENDING_POOL_ADDRESS_PROVIDER, user as Address],
      chainId: this.market.chain.id,
    });

    const { 0: tokenAddresses, 1: balances } = response;

    return tokenAddresses.map((address, index) => ({
      address: address.toLowerCase(),
      amount: balances[index] ? balances[index].toString() : '0',
    }));
  }
}

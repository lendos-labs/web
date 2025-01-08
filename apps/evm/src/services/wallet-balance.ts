import { readContract } from '@wagmi/core';
import BigNumber from 'bignumber.js';

import { MarketDataType } from '@lendos/types/market';

import { walletBalanceAbi } from '../abi/wallet-balance.ts';
import { wagmiConfig } from '../config/connectors.ts';

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
    const response = await readContract(wagmiConfig, {
      address: this.market.addresses.WALLET_BALANCE_PROVIDER,
      abi: walletBalanceAbi,
      functionName: 'getUserWalletBalances',
      args: [this.market.addresses.LENDING_POOL_ADDRESS_PROVIDER, user],
    });

    const { 0: tokenAddresses, 1: balances } = response as [string[], BigNumber[]];

    return tokenAddresses.map((address, index) => ({
      address: address.toLowerCase(),
      amount: BigNumber(balances[index] ?? 0).toString(),
    }));
  }
}

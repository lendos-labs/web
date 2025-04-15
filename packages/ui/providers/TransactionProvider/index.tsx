import { createContext, useContext } from 'react';

import { Address } from 'viem';

import { InterestRate } from '@lendos/types/reserves';

export interface TransactionContextType {
  supply: {
    action: (reserve: Address, amount: string, decimals: number) => Promise<string>;
  };
  withdraw: {
    action: (reserve: Address, amount: string, decimals: number) => Promise<string>;
  };
  borrow: {
    action: (
      reserve: Address,
      amount: string,
      interestRateMode: InterestRate,
      decimals: number,
    ) => Promise<string>;
  };
  repay: {
    action: (
      reserve: Address,
      amount: string,
      interestRateMode: InterestRate,
      decimals: number,
    ) => Promise<string>;
  };
  setUsageAsCollateral: {
    action: (reserve: Address, usageAsCollateral: boolean) => Promise<string>;
  };
}

export const TransactionContext = createContext<TransactionContextType>(
  {} as TransactionContextType,
);

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- check is hook call inside provider
  if (!context) {
    throw new Error('useTransactionContext must be used within a TransactionContextProvider');
  }

  return context;
};

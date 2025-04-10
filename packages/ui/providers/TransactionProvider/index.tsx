import { createContext, useContext } from 'react';

import { ApproveData } from '@lendos/types/erc20';

export interface TransactionContextType {
  supply: {
    action: (reserve: string, amount: string, decimals: number) => Promise<string>;
    approvedAmount: ApproveData | undefined;
    approval: () => Promise<void>;
  };
  withdraw: {
    action: (reserve: string, amount: string, decimals: number) => Promise<string>;
    // approvedAmount: ApproveData | undefined;
    // approval: () => Promise<void>;
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

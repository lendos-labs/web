import React, { ReactNode } from 'react';

import { TransactionContext } from '@lendos/ui/providers/TransactionProvider';

import { useSupply } from './hooks/useSupply';
import { useWithdraw } from './hooks/useWithdraw'

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const supply = useSupply();
  const withdraw = useWithdraw();
  return (
    <TransactionContext.Provider
      value={{
        supply,
        withdraw
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

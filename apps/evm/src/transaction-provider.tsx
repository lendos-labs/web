import React, { ReactNode } from 'react';

import { TransactionContext } from '@lendos/ui/providers/TransactionProvider';

import { useSupply } from './hooks/useSupply';

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const supply = useSupply();
  return (
    <TransactionContext.Provider
      value={{
        supply,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

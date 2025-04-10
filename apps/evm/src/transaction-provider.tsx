import React, { ReactNode } from 'react';

import { TransactionContext } from '@lendos/ui/providers/TransactionProvider';

import { useBorrow } from './hooks/useBorrow';
import { useSupply } from './hooks/useSupply';
import { useWithdraw } from './hooks/useWithdraw';

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const supply = useSupply();
  const withdraw = useWithdraw();
  const borrow = useBorrow();
  return (
    <TransactionContext.Provider
      value={{
        supply,
        withdraw,
        borrow,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

import React, { ReactNode } from 'react';
import { BalanceContext } from '@lendos/ui/providers/BalanceProvider';

export const BalanceProvider = ({ children }: { children: ReactNode }) => {
  return (
    <BalanceContext.Provider
      value={{
        loading: false,
        hasEmptyWallet: false,
        walletBalances: {
          '0x1552926e4df06fceefbbbdcc98747eb15cb27bbc': { amount: '1', amountUSD: '1' },
        },
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};

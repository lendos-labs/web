import React, { ReactNode } from 'react';

import { BalanceContext } from '@lendos/ui/providers/BalanceProvider';
import { useStateContext } from '@lendos/ui/providers/StateProvider';

import { usePoolsWalletBalances } from './hooks/usePoolsWalletBalance';

export const BalanceProvider = ({ children }: { children: ReactNode }) => {
  const { currentMarketData } = useStateContext();
  const { walletBalances, isLoading } = usePoolsWalletBalances([currentMarketData]);

  return (
    <BalanceContext.Provider
      value={{
        loading: Boolean(isLoading),
        hasEmptyWallet: Boolean(walletBalances[0]?.hasEmptyWallet),
        walletBalances: walletBalances[0]?.walletBalances ?? {},
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};

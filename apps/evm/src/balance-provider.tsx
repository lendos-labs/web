import React, { ReactNode, useState } from 'react';

import { BalanceContext } from '@lendos/ui/providers/BalanceProvider';

export const BalanceProvider = ({ children }: { children: ReactNode }) => {
  const [walletBalances, setWalletBalances] = useState<
    Record<string, { amount: string; amountUSD: string }>
  >({});
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <BalanceContext.Provider
      value={{
        loading,
        hasEmptyWallet: false,
        walletBalances,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};

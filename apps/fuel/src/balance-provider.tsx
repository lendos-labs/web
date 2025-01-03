import React, { ReactNode, useEffect, useState } from 'react';

import { useAccount, useChain, useProvider } from '@fuels/react';

import { BalanceContext } from '@lendos/ui/providers/BalanceProvider';

import { assets } from './temporary';

export const BalanceProvider = ({ children }: { children: ReactNode }) => {
  const { provider } = useProvider();
  const { chain } = useChain();
  const { account } = useAccount();
  const [walletBalances, setWalletBalances] = useState<
    Record<string, { amount: string; amountUSD: string }>
  >({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!provider || !account) {
      return;
    }

    void (async () => {
      setLoading(true);

      await Promise.all(
        assets.map(async i => {
          const balance = (await provider.getBalance(account, i.assetId)).format();

          setWalletBalances(state => ({
            ...state,
            [i.assetId]: { amount: balance, amountUSD: balance },
          }));
        }),
      );
      setLoading(false);
    })();
  }, [account, chain, provider]);

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

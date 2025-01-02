import React, { ReactNode, useEffect, useState } from 'react';
import { BalanceContext } from '@lendos/ui/providers/BalanceProvider';
import { useAccount, useChain, useProvider } from '@fuels/react';
import { Fuel, NetworkFuel } from 'fuels';
import { fuelConfig } from './fuel-providers';

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
      const fuel = new Fuel(fuelConfig);
      const chainId = chain?.consensusParameters.chainId.toNumber();
      const allAssets = await fuel.assets();

      const selectedChainAssets = [];

      for (const asset of allAssets) {
        const network = asset.networks.find(n => n.chainId === chainId) as NetworkFuel | undefined;
        if (!network) {
          continue;
        }

        selectedChainAssets.push({
          icon: asset.icon,
          name: asset.name,
          symbol: asset.symbol,
          ...network,
        });
      }

      await Promise.all(
        selectedChainAssets.map(async i => {
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

import React, { ReactNode, useMemo, useState } from 'react';

import { useAppKit, useAppKitAccount, useAppKitNetwork, useDisconnect } from '@reown/appkit/react';
import { readContracts, watchAsset } from '@wagmi/core';
import { Address, erc20Abi } from 'viem';

import { AccountContext } from '@lendos/ui/providers/AccountProvider';

import { wagmiAdapter } from './config/connectors.ts';

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [switchNetworkError, setSwitchNetworkError] = useState<Error>();
  const { open } = useAppKit();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAppKitAccount();
  const { switchNetwork, chainId } = useAppKitNetwork();

  return (
    <AccountContext.Provider
      value={useMemo(
        () => ({
          account: address as string | null,
          chainId: Number(chainId),
          connected: isConnected,
          loading: false,
          switchNetworkError,
          setSwitchNetworkError,
          disconnect: () => disconnect(),
          connect: () => open(),
          addToken: async (address: string) => {
            const res = await readContracts(wagmiAdapter.wagmiConfig, {
              contracts: [
                {
                  abi: erc20Abi,
                  address: address as Address,
                  functionName: 'symbol',
                },
                {
                  abi: erc20Abi,
                  address: address as Address,
                  functionName: 'decimals',
                },
              ],
            });

            await watchAsset(wagmiAdapter.wagmiConfig, {
              type: 'ERC20',
              options: {
                address: address,
                symbol: res[0].result ?? '',
                decimals: res[1].result ?? 1,
              },
            });
          },
          switchNetwork: network => switchNetwork(network),
        }),
        [
          address,
          isConnected,
          chainId,
          switchNetworkError,
          setSwitchNetworkError,
          disconnect,
          open,
          switchNetwork,
        ],
      )}
    >
      {children}
    </AccountContext.Provider>
  );
};

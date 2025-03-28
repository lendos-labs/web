import React, { ReactNode, useMemo, useState } from 'react';

import { readContracts, watchAsset } from '@wagmi/core';
import { useModal } from 'connectkit';
import { Address, erc20Abi } from 'viem';
import { useAccount, useDisconnect, useSwitchChain } from 'wagmi';

import { AccountContext } from '@lendos/ui/providers/AccountProvider';

import { wagmiConfigCore } from './config/connectors';

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [switchNetworkError, setSwitchNetworkError] = useState<Error>();
  const { address, isConnected, chainId } = useAccount();
  const { setOpen } = useModal();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();

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
          connect: () => setOpen(true),
          addToken: async (address: string) => {
            const res = await readContracts(wagmiConfigCore, {
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

            await watchAsset(wagmiConfigCore, {
              type: 'ERC20',
              options: {
                address: address,
                symbol: res[0].result ?? '',
                decimals: res[1].result ?? 1,
              },
            });
          },
          switchNetwork: (chainId: number) => switchChain({ chainId }),
        }),
        [
          address,
          isConnected,
          chainId,
          switchNetworkError,
          setSwitchNetworkError,
          disconnect,
          setOpen,
          switchChain,
        ],
      )}
    >
      {children}
    </AccountContext.Provider>
  );
};

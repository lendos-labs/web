import React, { ReactNode, useMemo, useState } from 'react';

import {  readContracts, watchAsset } from '@wagmi/core';
import { useModal } from 'connectkit';
import { Address, erc20Abi } from 'viem';
import { useAccount, useChainId, useDisconnect } from 'wagmi';

import { AccountContext } from '@lendos/ui/providers/AccountProvider';

import { wagmiConfigCore } from './config/connectors';

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [switchNetworkError, setSwitchNetworkError] = useState<Error>();
  const { address, isConnected } = useAccount();
  const { setOpen } = useModal();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();

  return (
    <AccountContext.Provider
      value={useMemo(
        () => ({
          account: address as string | undefined,
          chainId,
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
          switchNetwork: async () => {
            //
          },
        }),
        [
          address,
          isConnected,
          chainId,
          switchNetworkError,
          setSwitchNetworkError,
          disconnect,
          setOpen,
        ],
      )}
    >
      {children}
    </AccountContext.Provider>
  );
};

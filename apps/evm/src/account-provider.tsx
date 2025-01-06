import React, { ReactNode, useMemo, useState } from 'react';

import { useModal } from 'connectkit';
import { useAccount, useChainId, useDisconnect } from 'wagmi';

import { AccountContext } from '@lendos/ui/providers/AccountProvider';

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
          addToken: async () => {
            //
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

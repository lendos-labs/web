import React, { ReactNode, useMemo, useState } from 'react';

import { useAccount, useConnectUI, useDisconnect, useIsConnected } from '@fuels/react';
import { useChainId } from 'wagmi';

import { AccountContext } from '@lendos/ui/providers/AccountProvider';

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [switchNetworkError, setSwitchNetworkError] = useState<Error>();
  const { account } = useAccount();
  const { isLoading, connect } = useConnectUI();
  const { isConnected } = useIsConnected();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();

  return (
    <AccountContext.Provider
      value={useMemo(
        () => ({
          account,
          chainId,
          connected: isConnected,
          loading: isLoading,
          switchNetworkError,
          setSwitchNetworkError,
          disconnect: () => disconnect(),
          connect: () => connect(),
          addToken: async () => {
            //
          },
          switchNetwork: async () => {
            //
          },
        }),
        [
          account,
          isConnected,
          isLoading,
          chainId,
          switchNetworkError,
          setSwitchNetworkError,
          disconnect,
          connect,
        ],
      )}
    >
      {children}
    </AccountContext.Provider>
  );
};

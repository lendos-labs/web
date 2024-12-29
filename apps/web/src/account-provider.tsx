import React, { ReactNode, useMemo } from 'react';
import { AccountContext } from '@lendos/ui/providers/AccountProvider';
import { useAccount, useConnectUI, useDisconnect, useIsConnected } from '@fuels/react';
import { useChainId } from 'wagmi';

export const AccountProvider = ({ children }: { children: ReactNode }) => {
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
          disconnect: () => disconnect(),
          connect: () => connect(),
          addToken: async () => {
            //
          },
          switchNetwork: async () => {
            //
          },
        }),
        [account, isConnected, isLoading, chainId, disconnect, connect],
      )}
    >
      {children}
    </AccountContext.Provider>
  );
};

import React, { ReactNode } from 'react';
import { AccountContext } from '@lendos/ui/providers/AccountProvider';
import { useAccount, useConnectUI, useDisconnect, useIsConnected } from '@fuels/react';

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const { account } = useAccount();
  const { isLoading, connect } = useConnectUI();
  const { isConnected } = useIsConnected();
  const { disconnect } = useDisconnect();

  return (
    <AccountContext.Provider
      value={{
        account,
        connected: isConnected,
        // chainId
        loading: isLoading,
        disconnect: () => disconnect(),
        connect: () => connect(),
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

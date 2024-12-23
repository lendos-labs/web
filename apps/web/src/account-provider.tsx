import React, { ReactNode, useMemo } from 'react';
import { AccountContext } from '@lendos/ui/providers/AccountProvider';
import { useAccount, useConnectUI, useDisconnect, useIsConnected } from '@fuels/react';

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const { account } = useAccount();
  const { isLoading, connect } = useConnectUI();
  const { isConnected } = useIsConnected();
  const { disconnect } = useDisconnect();

  return (
    <AccountContext.Provider
      value={useMemo(
        () => ({
          account,
          accountSummary: {
            data: undefined,
            loading: false,
            error: undefined,
          },
          connected: isConnected,
          loading: isLoading,
          disconnect: () => disconnect(),
          connect: () => connect(),
        }),
        [account, isConnected, isLoading, disconnect, connect],
      )}
    >
      {children}
    </AccountContext.Provider>
  );
};

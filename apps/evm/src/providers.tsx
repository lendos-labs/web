'use client';

import React, { useEffect } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider } from 'connectkit';
import { setCookie } from 'cookies-next';
import { State, WagmiProvider } from 'wagmi';

import { MainLayout } from '@lendos/ui/layout/MainLayout';
import { MuiLayout } from '@lendos/ui/layout/MuiLayout';
import { ModalContextProvider } from '@lendos/ui/providers/ModalProvider';

import { CookieKey } from '@lendos/constants/cookie';
import { queryClient } from '@lendos/constants/queryClient';

import { AccountProvider } from './account-provider';
import { BalanceProvider } from './balance-provider';
import { wagmiConfig } from './config/connectors';
import { ReservesProvider } from './reserves-providers';
import { StateProvider } from './state-provider';
import { TransactionProvider } from './transaction-provider';
import { ChildrenProps } from './types/common';

interface ProviderProps extends ChildrenProps {
  initialState?: State;
  appState: {
    selectedMarket: string;
    [CookieKey.SHOW_ZERO_ASSETS]: boolean;
    [CookieKey.SHOW_ZERO_LPS]: boolean;
  };
}

export const Providers = ({ children, initialState, appState }: ProviderProps) => {
  useEffect(() => {
    void (async () => {
      await setCookie(CookieKey.SELECTED_MARKET, appState.selectedMarket);
    })();
  }, [appState.selectedMarket]);

  return (
    <QueryClientProvider client={queryClient}>
      <MuiLayout>
        <StateProvider appState={appState}>
          <WagmiProvider config={wagmiConfig} initialState={initialState}>
            <ConnectKitProvider>
              <AccountProvider>
                <ReservesProvider>
                  <BalanceProvider>
                    <ModalContextProvider>
                      <TransactionProvider>
                        <MainLayout>{children}</MainLayout>
                      </TransactionProvider>
                    </ModalContextProvider>
                  </BalanceProvider>
                </ReservesProvider>
              </AccountProvider>
            </ConnectKitProvider>
          </WagmiProvider>
        </StateProvider>
      </MuiLayout>
    </QueryClientProvider>
  );
};

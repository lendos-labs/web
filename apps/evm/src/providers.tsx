'use client';

import React, { useEffect, useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { setCookie } from 'cookies-next';

import { MainLayout } from '@lendos/ui/layout/MainLayout';
import { MuiLayout } from '@lendos/ui/layout/MuiLayout';
import { ModalContextProvider } from '@lendos/ui/providers/ModalProvider';

import { CookieKey } from '@lendos/constants/cookie';

import { AccountProvider } from './account-provider';
import { BalanceProvider } from './balance-provider';
import { ReservesProvider } from './reserves-providers';
import { StateProvider } from './state-provider';
import { TransactionProvider } from './transaction-provider';
import { ChildrenProps } from './types/common';
import WagmiProviderInit from './wagmi-provider.tsx';

interface ProviderProps extends ChildrenProps {
  appState: {
    selectedMarket: string;
    [CookieKey.SHOW_ZERO_ASSETS]: boolean;
    [CookieKey.SHOW_ZERO_LPS]: boolean;
  };
}

export const Providers = ({ children, appState }: ProviderProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      }),
  );
  useEffect(() => {
    void (async () => {
      await setCookie(CookieKey.SELECTED_MARKET, appState.selectedMarket);
    })();
  }, [appState.selectedMarket]);

  return (
    <QueryClientProvider client={queryClient}>
      <MuiLayout>
        <StateProvider appState={appState}>
          <WagmiProviderInit>
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
          </WagmiProviderInit>
        </StateProvider>
      </MuiLayout>
    </QueryClientProvider>
  );
};

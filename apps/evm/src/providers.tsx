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
import { ChildrenProps } from './types/common';

export const Providers = ({
  children,
  initialState,
  selectedMarket,
}: ChildrenProps & { initialState?: State; selectedMarket: string }) => {
  useEffect(() => {
    void (async () => {
      await setCookie(CookieKey.SELECTED_MARKET, selectedMarket);
    })();
  }, [selectedMarket]);
  return (
    <QueryClientProvider client={queryClient}>
      <MuiLayout>
        <StateProvider selectedMarket={selectedMarket}>
          <WagmiProvider config={wagmiConfig} initialState={initialState}>
            <ConnectKitProvider>
              <AccountProvider>
                <ReservesProvider>
                  <BalanceProvider>
                    <ModalContextProvider>
                      <MainLayout>{children}</MainLayout>
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

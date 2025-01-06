'use client';

import React from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider } from 'connectkit';
import { State, WagmiProvider } from 'wagmi';

import { MainLayout } from '@lendos/ui/layout/MainLayout';
import { MuiLayout } from '@lendos/ui/layout/MuiLayout';
import { ModalContextProvider } from '@lendos/ui/providers/ModalProvider';

import { queryClient } from '@lendos/constants/queryClient';

import { AccountProvider } from './account-provider';
import { BalanceProvider } from './balance-provider';
import { wagmiConfig } from './config/connectors';
import { ReservesProvider } from './reserves-providers';
import { StateProvider } from './state-provider';
import { ChildrenProps } from './types/common';

export const Providers = ({ children, initialState }: ChildrenProps & { initialState?: State }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MuiLayout>
        <StateProvider>
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

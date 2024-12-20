'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider } from 'connectkit';
import { State, WagmiProvider } from 'wagmi';
import { wagmiConfig } from './config/connectors';
import { FuelProviders } from './fuel-providers';
import { ChildrenProps } from './types/common';
import React from 'react';
import { MuiLayout } from '@lendos/ui/layout/MuiLayout';
import { MainLayout } from '@lendos/ui/layout/MainLayout';
import { ModalContextProvider } from '@lendos/ui/providers/ModalProvider';
import { StateProvider } from './state-provider';
import { Connect } from './components/Connect';
import { AccountProvider } from './account-provider';

const queryClient = new QueryClient();

export const Providers = ({ children, initialState }: ChildrenProps & { initialState?: State }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MuiLayout>
        <StateProvider>
          <WagmiProvider config={wagmiConfig} initialState={initialState}>
            <ConnectKitProvider>
              <FuelProviders>
                <AccountProvider>
                  <ModalContextProvider>
                    <MainLayout connectBtn={<Connect />}>{children}</MainLayout>
                  </ModalContextProvider>
                </AccountProvider>
              </FuelProviders>
            </ConnectKitProvider>
          </WagmiProvider>
        </StateProvider>
      </MuiLayout>
    </QueryClientProvider>
  );
};

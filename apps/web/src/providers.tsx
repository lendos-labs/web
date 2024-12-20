'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider } from 'connectkit';
import { State, WagmiProvider } from 'wagmi';
import { wagmiConfig } from './config/connectors.ts';
import { FuelProviders } from './fuel-providers.tsx';
import { ChildrenProps } from './types/common.ts';
import React from 'react';
import { MuiLayout } from '@lendos/ui/layout/MuiLayout';
import { MainLayout } from '@lendos/ui/layout/MainLayout';
import { ModalContextProvider } from '@lendos/ui/providers/ModalProvider';

const queryClient = new QueryClient();

export const Providers = ({ children, initialState }: ChildrenProps & { initialState?: State }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MuiLayout>
        <WagmiProvider config={wagmiConfig} initialState={initialState}>
          <ConnectKitProvider>
            <FuelProviders>
              <ModalContextProvider>
                <MainLayout>{children}</MainLayout>
              </ModalContextProvider>
            </FuelProviders>
          </ConnectKitProvider>
        </WagmiProvider>
      </MuiLayout>
    </QueryClientProvider>
  );
};

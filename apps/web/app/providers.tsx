'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider } from 'connectkit';
import { State, WagmiProvider } from 'wagmi';
import { wagmiConfig } from './config/connectors';
import { FuelProviders } from './fuel-providers';
import { ChildrenProps } from './types/common';
import React from 'react';
import { MuiLayout } from '@lendos/ui/layout/MuiLayout';

const queryClient = new QueryClient();

export const Providers = ({ children, initialState }: ChildrenProps & { initialState?: State }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MuiLayout>
        <WagmiProvider config={wagmiConfig} initialState={initialState}>
          <ConnectKitProvider>
            <FuelProviders>{children}</FuelProviders>
          </ConnectKitProvider>
        </WagmiProvider>
      </MuiLayout>
    </QueryClientProvider>
  );
};

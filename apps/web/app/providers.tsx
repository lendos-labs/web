'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider } from 'connectkit';
import { MuiLayout } from '@lendos/ui/src/layouts/MuiLayout';
import { State, WagmiProvider } from 'wagmi';
import { wagmiConfig } from './config/connectors';
import { FuelProviders } from './fuel-providers';
import { ChildrenProps } from './types/common';

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

'use client';

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
import { AccountProvider } from './account-provider';
import QueryProvider from '@lendos/ui/providers/QueryProvider';
import { BalanceProvider } from './balance-provider';
import { ReservesProvider } from './reserves-providers';

export const Providers = ({ children, initialState }: ChildrenProps & { initialState?: State }) => {
  return (
    <QueryProvider>
      <MuiLayout>
        <StateProvider>
          <WagmiProvider config={wagmiConfig} initialState={initialState}>
            <ConnectKitProvider>
              <FuelProviders>
                <AccountProvider>
                  <ReservesProvider>
                    <BalanceProvider>
                      <ModalContextProvider>
                        <MainLayout>{children}</MainLayout>
                      </ModalContextProvider>
                    </BalanceProvider>
                  </ReservesProvider>
                </AccountProvider>
              </FuelProviders>
            </ConnectKitProvider>
          </WagmiProvider>
        </StateProvider>
      </MuiLayout>
    </QueryProvider>
  );
};

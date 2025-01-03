'use client';

import React from 'react';

import { ConnectKitProvider } from 'connectkit';
import { State, WagmiProvider } from 'wagmi';

import { MainLayout } from '@lendos/ui/layout/MainLayout';
import { MuiLayout } from '@lendos/ui/layout/MuiLayout';
import { ModalContextProvider } from '@lendos/ui/providers/ModalProvider';
import QueryProvider from '@lendos/ui/providers/QueryProvider';

import { AccountProvider } from './account-provider';
import { BalanceProvider } from './balance-provider';
import { wagmiConfig } from './config/connectors';
import { FuelProviders } from './fuel-providers';
import { ReservesProvider } from './reserves-providers';
import { StateProvider } from './state-provider';
import { ChildrenProps } from './types/common';

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

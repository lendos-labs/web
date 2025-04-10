'use client';

import {
  FuelWalletConnector,
  SolanaConnector,
  WalletConnectConnector,
  createConfig,
} from '@fuels/connectors';
import { FuelProvider } from '@fuels/react';
import { Config } from '@wagmi/core';
import { Provider } from 'fuels';

import { supportedFuelNetwork, wagmiConfig } from './config/connectors.ts';
import { ChildrenProps } from './types/common.ts';

// eslint-disable-next-line turbo/no-undeclared-env-vars -- TODO fix it
const WALLETCONNECT_PROJECT_ID = process.env['NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID'];
// For SSR application we need to use
// createConfig to avoid errors related to window
// usage inside the connectors.
export const fuelConfig = createConfig(() => {
  return {
    connectors: WALLETCONNECT_PROJECT_ID
      ? [
          // new FueletWalletConnector(),
          new FuelWalletConnector(),
          // new BakoSafeConnector(),
          new WalletConnectConnector({
            projectId: WALLETCONNECT_PROJECT_ID,
            wagmiConfig: wagmiConfig as Config,
            chainId: supportedFuelNetwork[0]?.chainId,
            fuelProvider: Provider.create(supportedFuelNetwork[0]?.url ?? ''),
          }),
          new SolanaConnector({
            projectId: WALLETCONNECT_PROJECT_ID,
            chainId: supportedFuelNetwork[0]?.chainId,
            fuelProvider: Provider.create(supportedFuelNetwork[0]?.url ?? ''),
          }),
        ]
      : [],
  };
});

export const FuelProviders = ({ children }: ChildrenProps) => {
  return (
    <FuelProvider fuelConfig={fuelConfig} networks={supportedFuelNetwork}>
      {children}
    </FuelProvider>
  );
};

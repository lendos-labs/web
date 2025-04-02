'use client';

import React, { type ReactNode } from 'react';

import { createAppKit } from '@reown/appkit/react';
import { WagmiProvider, cookieToInitialState } from 'wagmi';

import {
  metadata,
  networks,
  projectId,
  solanaWeb3JsAdapter,
  wagmiAdapter,
  wagmiConfigCore,
} from './config/connectors';

createAppKit({
  adapters: [wagmiAdapter, solanaWeb3JsAdapter],
  networks,
  metadata,
  projectId,
  features: {
    email: false,
    socials: false,
    analytics: true,
  },
});

function WagmiProviderInit({ children }: { children: ReactNode }) {
  const initialState = cookieToInitialState(wagmiConfigCore, 'cookies');

  return (
    <WagmiProvider config={wagmiConfigCore} initialState={initialState}>
      {children}
    </WagmiProvider>
  );
}

export default WagmiProviderInit;

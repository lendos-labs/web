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
import { EWalletsInclude } from './types/wallets.ts';

createAppKit({
  allWallets: 'HIDE',
  includeWalletIds: Object.values(EWalletsInclude),
  adapters: [wagmiAdapter, solanaWeb3JsAdapter],
  networks,
  enableWalletGuide: false,
  allowUnsupportedChain: false,
  enableEmbedded: false,
  metadata,
  projectId,
  features: {
    email: false,
    socials: false,
    swaps: false,
    onramp: false,
    send: false,
  },

  // wallets
  enableInjected: false,
  enableWalletConnect: false,
  enableCoinbase: false,
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

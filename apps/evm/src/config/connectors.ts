import { Config } from '@wagmi/core';
import { Chain, neonDevnet, neonMainnet, sepolia } from '@wagmi/core/chains';
import {
  CreateConnectorFn,
  cookieStorage,
  createStorage,
  createConfig as createWagmiConfig,
  fallback,
  http,
} from 'wagmi';
import { injected, walletConnect } from 'wagmi/connectors';

const WALLETCONNECT_PROJECT_ID = process.env['NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID'];

const ALCHEMY_ID = process.env['NEXT_PUBLIC_ALCHEMY_ID'];

const isTestnet = process.env['NEXT_PUBLIC_ENV'] === 'testnet';

const METADATA = {
  name: 'lendos',
  description: 'lendos',
  url: 'https://lendos.org',
  // TODO add icon
  icons: [],
};

export function generateETHConnectors(): CreateConnectorFn[] {
  const connectors: CreateConnectorFn[] = [injected({ shimDisconnect: false })];

  if (WALLETCONNECT_PROJECT_ID) {
    connectors.push(
      walletConnect({
        projectId: WALLETCONNECT_PROJECT_ID,
        showQrModal: false,
        metadata: METADATA,
      }),
    );
  }
  return connectors;
}

const supportedChains = (isTestnet ? [sepolia, neonDevnet] : [neonMainnet]) as readonly [
  Chain,
  ...Chain[],
];

export const wagmiConfig = createWagmiConfig({
  chains: supportedChains,
  connectors: generateETHConnectors(),
  transports: {
    [neonMainnet.id]: fallback([http(`https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_ID}`)]),
    [neonDevnet.id]: fallback([http('https://245022926.rpc.thirdweb.com')]),
    [sepolia.id]: fallback([http(`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_ID}`)]),
  },
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
});

export const wagmiConfigCore = wagmiConfig as Config;

import {
  CreateConnectorFn,
  cookieStorage,
  createConfig as createConfigWagmiConfig,
  createStorage,
  fallback,
  http,
} from 'wagmi';
import { Chain, mainnet, neonMainnet, sepolia } from 'wagmi/chains';
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

const supportedChains = (isTestnet ? [sepolia] : [neonMainnet]) as readonly [Chain, ...Chain[]];

export const wagmiConfig = createConfigWagmiConfig({
  chains: supportedChains,
  connectors: generateETHConnectors(),
  transports: {
    [mainnet.id]: fallback([http(`https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_ID}`)]),
    [sepolia.id]: fallback([http(`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_ID}`)]),
  },
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
});

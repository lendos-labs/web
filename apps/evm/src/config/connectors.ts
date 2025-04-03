import { SolanaAdapter } from '@reown/appkit-adapter-solana';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import {
  AppKitNetwork,
  hemi,
  hemiSepolia,
  neonDevnet,
  neonMainnet,
  sepolia,
  solana,
  solanaDevnet,
} from '@reown/appkit/networks';
import { CreateConnectorFn, fallback, http } from 'wagmi';
import { injected } from 'wagmi/connectors';

export const metadata = {
  name: 'AppKit',
  description: 'AppKit Example',
  url: 'https://example.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
};

const isTestnet = process.env['NEXT_PUBLIC_ENV'] === 'testnet';

const testnetNetworks: [AppKitNetwork, ...AppKitNetwork[]] = [
  neonDevnet,
  sepolia,
  solanaDevnet,
  hemiSepolia,
];
const mainnetNetworks: [AppKitNetwork, ...AppKitNetwork[]] = [neonMainnet, solana, hemi];

const connectors: CreateConnectorFn[] = [injected({ shimDisconnect: true })];

export const networks: [AppKitNetwork, ...AppKitNetwork[]] = isTestnet
  ? testnetNetworks
  : mainnetNetworks;

export const projectId = process.env['NEXT_PUBLIC_REOWN_PROJECT_ID'] ?? '';

//  Create the Wagmi adapter
export const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  projectId,
  networks,
  connectors,
  transports: {
    [neonMainnet.id]: fallback([http(`https://neon-proxy-mainnet.solana.p2p.org`)]),
    [neonDevnet.id]: fallback([http('https://devnet.neonevm.org/', { timeout: 0 })]),
    [sepolia.id]: fallback([http(`https://1rpc.io/sepolia`)]),
  },
});

export const wagmiConfigCore = wagmiAdapter.wagmiConfig;

// Create Solana adapter
export const solanaWeb3JsAdapter = new SolanaAdapter();

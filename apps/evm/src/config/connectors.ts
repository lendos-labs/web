import { SolanaAdapter } from '@reown/appkit-adapter-solana';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import {
  AppKitNetwork,
  neonDevnet,
  neonMainnet,
  sepolia,
  solana,
  solanaDevnet,
} from '@reown/appkit/networks';
import { CreateConnectorFn, fallback, http } from 'wagmi';
import { injected, walletConnect } from 'wagmi/connectors';

export const metadata = {
  name: 'AppKit',
  description: 'AppKit Example',
  url: 'https://example.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
};

const WALLETCONNECT_PROJECT_ID = process.env['NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID'];

const isTestnet = process.env['NEXT_PUBLIC_ENV'] === 'testnet';

const testnetNetworks: [AppKitNetwork, ...AppKitNetwork[]] = [neonDevnet, sepolia, solanaDevnet];
const mainnetNetworks: [AppKitNetwork, ...AppKitNetwork[]] = [neonMainnet, solana];

const connectors: CreateConnectorFn[] = [injected({ shimDisconnect: true })];

if (WALLETCONNECT_PROJECT_ID) {
  connectors.push(
    walletConnect({
      projectId: WALLETCONNECT_PROJECT_ID,
      showQrModal: false,
      metadata,
    }),
  );
}

export const networks: [AppKitNetwork, ...AppKitNetwork[]] = isTestnet
  ? testnetNetworks
  : mainnetNetworks;

export const projectId = process.env['NEXT_PUBLIC_REOWN_PROJECT_ID'] ?? '';

//  Create the Wagmi adapter
export const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  projectId,
  networks,
  transports: {
    [neonMainnet.id]: fallback([http(`https://neon-proxy-mainnet.solana.p2p.org`)]),
    [neonDevnet.id]: fallback([http('https://devnet.neonevm.org/', { timeout: 0 })]),
    [sepolia.id]: fallback([http(`https://1rpc.io/sepolia`)]),
  },
});

export const wagmiConfigCore = wagmiAdapter.wagmiConfig;

// Create Solana adapter
export const solanaWeb3JsAdapter = new SolanaAdapter();

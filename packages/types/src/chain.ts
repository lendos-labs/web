export enum ChainId {
  neon = 245022934,
  neon_devnet = 245022926,
  hemi = 43111,
  hemi_testnet = 743111,
  sepolia = 11155111,
  fuel = 99,
}

export enum CustomPoints {
  neon = 'neon',
}

export interface ExplorerLinkBuilderProps {
  tx?: string;
  address?: string;
}

export interface NetworkConfig {
  name: string;
  displayName?: string;
  publicJsonRPCUrl: readonly string[];
  publicJsonRPCWSUrl?: string;
  ratesHistoryApiUrl?: string;
  wrappedBaseAssetSymbol: string;
  baseAssetSymbol: string;
  baseAssetDecimals: number;
  explorerLink: string;
  explorerLinkBuilder: (props: ExplorerLinkBuilderProps) => string;
  isTestnet?: boolean;
  networkLogoPath: string;
  underlyingChainId?: number;
}

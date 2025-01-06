import { Chain } from 'viem';

export enum CustomPoints {
  neon = 'neon',
}

export interface ExplorerLinkBuilder {
  tx?: string;
  address?: string;
}

export interface NetworkConfig {
  nativeCurrency: Chain['nativeCurrency'];
  name: Chain['name'];
  testnet: Chain['testnet'];
  id: Chain['id'];
  networkLogoPath: string;
  wrappedAsset: { name: string; symbol: string; decimals: number };
  explorerLinkBuilder: (args: ExplorerLinkBuilder) => string;
}

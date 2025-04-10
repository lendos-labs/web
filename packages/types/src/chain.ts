import { AppKitNetwork } from '@reown/appkit/networks';

export enum CustomPoints {
  neon = 'neon',
}

export interface ExplorerLinkBuilder {
  tx?: string;
  address?: string;
}

export type NetworkConfig = AppKitNetwork & {
  networkLogoPath: string;
  wrappedAsset: { name: string; symbol: string; decimals: number };
  baseAssetSymbol: string;
  explorerLinkBuilder: (args: ExplorerLinkBuilder) => string;
};

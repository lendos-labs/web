import { CHAIN_IDS } from 'fuels';

import { CustomPoints } from '@lendos/types/chain';
import { Markets } from '@lendos/types/market';

export enum SupportedMarkets {
  // Testnet
  fuel_sepolia = 'fuel_sepolia',
}

const linkBuilder =
  ({
    baseUrl,
    addressPrefix = 'address',
    txPrefix = 'tx',
  }: {
    baseUrl: string;
    addressPrefix?: string;
    txPrefix?: string;
  }) =>
  ({ tx, address }: { tx?: string; address?: string }): string => {
    if (tx) {
      return `${baseUrl}/${txPrefix}/${tx}`;
    }
    if (address) {
      return `${baseUrl}/${addressPrefix}/${address}`;
    }
    return baseUrl;
  };

// eslint-disable-next-line turbo/no-undeclared-env-vars -- fix it
const isTestnet = process.env['NEXT_PUBLIC_ENV'] === 'testnet';

export const marketsData: Markets = isTestnet
  ? {
      [SupportedMarkets.fuel_sepolia]: {
        marketTitle: 'Fuel Sepolia',
        market: SupportedMarkets.fuel_sepolia,
        chain: {
          name: 'Fuel Sepolia',
          id: CHAIN_IDS.fuel.testnet,
          testnet: true,
          nativeCurrency: { symbol: 'ETH', name: 'ETH', decimals: 18 },
          wrappedAsset: { name: 'WETH', symbol: 'WETH', decimals: 18 },
          explorerLinkBuilder: linkBuilder({
            baseUrl: 'https://app-testnet.fuel.network',
            addressPrefix: 'account',
          }),
          networkLogoPath: '/icons/networks/fuel.svg',
        },
        enabledFeatures: {
          switch: true,
          governance: true,
          points: true,
          borrowBoost: true,
          customPoints: CustomPoints.neon,
        },
        addresses: {
          LENDING_POOL_ADDRESS_PROVIDER: '0xe9f46d67eF44abf6f404316ec5A9E7fa013Ba049',
          LENDING_POOL: '0x64916311cf63F208069E5Ef6CA4b2a4Dc1987e8a',
          WETH_GATEWAY: '0x2666543d3822342CB6f2d135A1f98B89676F4d2B',
          WALLET_BALANCE_PROVIDER: '0x087A38529187809af940c29EC7Ec79Cd279F8dDB',
          UI_POOL_DATA_PROVIDER: '0x3ACF4B14762ee56ec2321B368bD1FbE643A2802e',
          UI_INCENTIVE_DATA_PROVIDER: '0x2c36b68d6F00CD70D44005aB1c477b4769E58Aa6',
        },
      },
    }
  : {};

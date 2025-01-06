import { neonDevnet, neonMainnet } from 'viem/chains';

import { CustomPoints } from '@lendos/types/chain';
import { Markets } from '@lendos/types/market';

export enum SupportedMarkets {
  // Mainnet
  neon = 'neon',
  hemi = 'hemi',

  // Testnet
  sepolia = 'sepolia',
  neon_devnet = 'neon_devnet',
  hemi_testnet = 'hemi_testnet',
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
      [SupportedMarkets.neon_devnet]: {
        marketTitle: 'Neon Devnet',
        market: SupportedMarkets.neon_devnet,
        chain: {
          ...neonDevnet,
          wrappedAsset: { name: 'WNEON', symbol: 'WNEON', decimals: 18 },
          explorerLinkBuilder: linkBuilder({
            baseUrl: neonDevnet.blockExplorers.default.url,
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
  : {
      [SupportedMarkets.neon]: {
        marketTitle: 'Neon',
        market: SupportedMarkets.neon,
        chain: {
          ...neonMainnet,
          wrappedAsset: { name: 'WNEON', symbol: 'WNEON', decimals: 18 },
          explorerLinkBuilder: linkBuilder({
            baseUrl: neonMainnet.blockExplorers.default.url,
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
          LENDING_POOL_ADDRESS_PROVIDER: '0x550F9Cc46566560D8d608815Aac34305cADaF569',
          LENDING_POOL: '0x3B2F6889bFac2B984754969116cD1D04447D012d',
          WETH_GATEWAY: '0xeef54C0464059F38DC9ec7dD618c8920F4B84626',
          WALLET_BALANCE_PROVIDER: '0x6724bd3A52b33BCe4fB3FEB85958Cdc7c1c1514E',
          UI_POOL_DATA_PROVIDER: '0x886E2DEA86192CFD939399B69e2e88933e3800eF',
          UI_INCENTIVE_DATA_PROVIDER: '0x56D03b4172942AaebD75fFC0C85B301FC6f4eAe8',
        },
      },
    };

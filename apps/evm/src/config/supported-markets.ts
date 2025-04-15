import { hemi, hemiSepolia, neonDevnet, neonMainnet, sepolia } from '@reown/appkit/networks';
import { Address } from 'viem';

import { CustomPoints } from '@lendos/types/chain';
import { Markets } from '@lendos/types/market';

import { linkBuilder } from '@lendos/constants/linkBuilder';

export enum SupportedMarkets {
  // Mainnet
  neon = 'neon',
  hemi = 'hemi',

  // Testnet
  sepolia = 'sepolia',
  neon_devnet = 'neon_devnet',
  hemi_testnet = 'hemi_testnet',
}

const isTestnet = process.env['NEXT_PUBLIC_ENV'] === 'testnet';

const testnetMarketsData: Markets<Address> = {
  [SupportedMarkets.neon_devnet]: {
    marketTitle: 'Neon Devnet',
    market: SupportedMarkets.neon_devnet,
    chain: {
      ...neonDevnet,
      baseAssetSymbol: 'NEON',
      explorerLinkBuilder: linkBuilder({
        baseUrl: neonDevnet.blockExplorers.default.url,
        addressPrefix: 'account',
      }),
      wrappedAsset: { name: 'WNEON', symbol: 'WNEON', decimals: 18 },
      networkLogoPath: '/icons/networks/neon.svg',
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
  [SupportedMarkets.hemi_testnet]: {
    marketTitle: 'Hemi Testnet',
    market: SupportedMarkets.hemi_testnet,
    chain: {
      ...hemiSepolia,
      baseAssetSymbol: 'ETH',
      wrappedAsset: { name: 'WETH', symbol: 'WETH', decimals: 18 },
      explorerLinkBuilder: linkBuilder({
        baseUrl: hemiSepolia.blockExplorers.default.url,
        addressPrefix: 'account',
      }),
      networkLogoPath: '/icons/networks/hemi.svg',
    },
    enabledFeatures: {
      switch: false,
      governance: true,
      points: false,
      borrowBoost: false,
      customPoints: CustomPoints.hemi,
    },
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: '0x9f473a881c17b0d157443717568e9b755e1e7aDe',
      LENDING_POOL: '0x9c18454211D5686afF70a6ace0097DbbCABf6161',
      WETH_GATEWAY: '0xCcaf008062dd11045e99a9C9AC3487d1d8D86028',
      WALLET_BALANCE_PROVIDER: '0x0428D769A60B3e1e1866a57D921e6b5b7EBA03A9',
      UI_POOL_DATA_PROVIDER: '0xD41b2E6e36Ec74a1d13990033f9b6aBb59961383',
      UI_INCENTIVE_DATA_PROVIDER: '0x3292167Dd7F0922c572336287D5A049A9E475E4C',
    },
  },
  [SupportedMarkets.sepolia]: {
    marketTitle: 'Sepolia Testnet',
    market: SupportedMarkets.sepolia,
    chain: {
      ...sepolia,
      baseAssetSymbol: 'ETH',

      wrappedAsset: { name: 'WETH', symbol: 'WETH', decimals: 18 },
      explorerLinkBuilder: linkBuilder({
        baseUrl: sepolia.blockExplorers.default.url,
        addressPrefix: 'account',
      }),
      networkLogoPath: '/icons/networks/eth.svg',
    },
    enabledFeatures: {
      switch: false,
      governance: true,
      points: false,
      borrowBoost: false,
      faucet: true,
      dexLp: true,
      strategies: true,
      addLiquidity: true,
    },
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: '0x770c638885D259d957eA250CD37F50EF0a24FE74',
      LENDING_POOL: '0xC3F0bF06cd32cEe528837726ac3D24c347611ED1',
      WETH_GATEWAY: '0xF47d73A6CaFc6c283b748B28b4425f484B4122b4',
      WALLET_BALANCE_PROVIDER: '0x05530667b8EAf46a23DD6b5d4C83dBD931Cbe59C',
      UI_POOL_DATA_PROVIDER: '0xe90D6bfD44BB463A74080A7976245450fd9d6306',
      UI_INCENTIVE_DATA_PROVIDER: '0x288953209aF216F7852a153307965e956CCE5F29',
      FAUCET: '0xf6cb987CF57b8F0Ff3618bF35DdC119A3a958903',
    },
  },
};

const maintnetMarketsData: Markets<Address> = {
  [SupportedMarkets.neon]: {
    marketTitle: 'Neon',
    market: SupportedMarkets.neon,
    chain: {
      ...neonMainnet,
      baseAssetSymbol: 'NEON',
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
  [SupportedMarkets.hemi]: {
    marketTitle: 'Hemi',
    market: SupportedMarkets.hemi,
    chain: {
      ...hemi,
      baseAssetSymbol: 'ETH',
      wrappedAsset: { name: 'WETH', symbol: 'WETH', decimals: 18 },
      explorerLinkBuilder: linkBuilder({
        baseUrl: hemi.blockExplorers.default.url,
        addressPrefix: 'account',
      }),
      networkLogoPath: '/icons/networks/hemi.svg',
    },
    enabledFeatures: {
      switch: false,
      governance: true,
      points: true,
      borrowBoost: false,
      customPoints: CustomPoints.hemi,
      dexLp: true,
    },
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: '0xD6aB40cb2B86905284E7549818869A2d3E98fF9b',
      LENDING_POOL: '0xaA397b29510a7219A0f3f7cE3eb53A09bc2A924c',
      WETH_GATEWAY: '0x3Ffc72ca95793b2e1B9D8848533C046616ff2949',
      WALLET_BALANCE_PROVIDER: '0x0a17e081A04C93f89dBb163e06475EF9a9865F5B',
      UI_POOL_DATA_PROVIDER: '0x48590DDB8277155C7c69ec9e33Ff45B375434D05',
      UI_INCENTIVE_DATA_PROVIDER: '0xc76A1832611ecfeB64E9E5d8d3CDDEb041EbA9Af',
    },
  },
};

export const marketsData: Markets<Address> = isTestnet ? testnetMarketsData : maintnetMarketsData;

import { CustomMarket, MarketDataType } from '@lendos/types/market';

export const isFeatureEnabled = {
  faucet: (data: MarketDataType) => data.enabledFeatures?.faucet,
  governance: (data: MarketDataType) => data.enabledFeatures?.governance,
  staking: (data: MarketDataType) => data.enabledFeatures?.staking,
  liquiditySwap: (data: MarketDataType) => data.enabledFeatures?.liquiditySwap,
  collateralRepay: (data: MarketDataType) => data.enabledFeatures?.collateralRepay,
  permissions: (data: MarketDataType) => data.enabledFeatures?.permissions,
  debtSwitch: (data: MarketDataType) => data.enabledFeatures?.debtSwitch,
  withdrawAndSwitch: (data: MarketDataType) => data.enabledFeatures?.withdrawAndSwitch,
  switch: (data: MarketDataType) => data.enabledFeatures?.switch,
  points: (data: MarketDataType) => data.enabledFeatures?.points,
  customPoints: (data: MarketDataType) => data.enabledFeatures?.customPoints,
  dexLp: (data: MarketDataType) => data.enabledFeatures?.dexLp,
  strategies: (data: MarketDataType) => data.enabledFeatures?.strategies,
  borrowBoost: (data: MarketDataType) => data.enabledFeatures?.borrowBoost,
  addLiquidity: (data: MarketDataType) => data.enabledFeatures?.addLiquidity,
};

export const AssetsBeingOffboarded: Record<string, Record<string, string>> = {
  [CustomMarket.proto_neon]: {
    BUSD: 'https://governance.aave.com/t/arfc-busd-offboarding-plan/12170',
    TUSD: 'https://governance.aave.com/t/arfc-tusd-offboarding-plan/14008',
  },
};

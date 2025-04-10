import { MarketDataType } from '@lendos/types/market';

export const isFeatureEnabled = {
  faucet: (data: MarketDataType) => data.enabledFeatures?.faucet,
  governance: (data: MarketDataType) => data.enabledFeatures?.governance,
  staking: (data: MarketDataType) => data.enabledFeatures?.staking,
  liquiditySwap: (data: MarketDataType) => data.enabledFeatures?.liquiditySwap,
  permissions: (data: MarketDataType) => data.enabledFeatures?.permissions,
  debtSwitch: (data: MarketDataType) => data.enabledFeatures?.debtSwitch,
  switch: (data: MarketDataType) => data.enabledFeatures?.switch,
  points: (data: MarketDataType) => data.enabledFeatures?.points,
  customPoints: (data: MarketDataType) => data.enabledFeatures?.customPoints,
  dexLp: (data: MarketDataType) => data.enabledFeatures?.dexLp,
  strategies: (data: MarketDataType) => data.enabledFeatures?.strategies,
  borrowBoost: (data: MarketDataType) => data.enabledFeatures?.borrowBoost,
  addLiquidity: (data: MarketDataType) => data.enabledFeatures?.addLiquidity,
};

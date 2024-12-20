import { ChainId, CustomPoints } from './chain.js';

export enum CustomMarket {
  proto_neon = 'proto_neon',
  proto_hemi = 'proto_hemi',
  proto_neon_devnet = 'proto_neon_devnet',
  proto_hemi_testnet = 'proto_hemi_testnet',
  proto_sepolia = 'proto_sepolia',
  proto_fuel = 'proto_fuel',
}

export interface MarketDataType {
  v3?: boolean;
  isTestnet?: boolean;
  marketTitle: string;
  market: CustomMarket;
  // the network the market operates on
  chainId: ChainId;
  enabledFeatures?: {
    liquiditySwap?: boolean;
    staking?: boolean;
    governance?: boolean;
    faucet?: boolean;
    collateralRepay?: boolean;
    incentives?: boolean;
    permissions?: boolean;
    debtSwitch?: boolean;
    withdrawAndSwitch?: boolean;
    switch?: boolean;
    points?: boolean;
    customPoints?: CustomPoints;
    borrowBoost?: boolean;
    dexLp?: boolean;
    strategies?: boolean;
    addLiquidity?: boolean;
  };
  disableCharts?: boolean;
  subgraphUrl?: string;
  addresses: {
    LENDING_POOL_ADDRESS_PROVIDER: string;
    LENDING_POOL: string;
    WETH_GATEWAY?: string;
    SWAP_COLLATERAL_ADAPTER?: string;
    REPAY_WITH_COLLATERAL_ADAPTER?: string;
    DEBT_SWITCH_ADAPTER?: string;
    WITHDRAW_SWITCH_ADAPTER?: string;
    FAUCET?: string;
    PERMISSION_MANAGER?: string;
    WALLET_BALANCE_PROVIDER: string;
    L2_ENCODER?: string;
    UI_POOL_DATA_PROVIDER: string;
    UI_INCENTIVE_DATA_PROVIDER?: string;
    COLLECTOR?: string;
  };
  halIntegration?: {
    URL: string;
    marketName: string;
  };
}

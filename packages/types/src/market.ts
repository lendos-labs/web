import { CustomPoints, NetworkConfig } from './chain';

export type Markets = Record<string, MarketDataType>;

export interface MarketDataType {
  marketTitle: string;
  market: string;
  // the network the market operates on
  chain: NetworkConfig;
  enabledFeatures?: {
    liquiditySwap?: boolean;
    staking?: boolean;
    governance?: boolean;
    faucet?: boolean;
    incentives?: boolean;
    permissions?: boolean;
    debtSwitch?: boolean;
    switch?: boolean;
    points?: boolean;
    customPoints?: CustomPoints;
    borrowBoost?: boolean;
    dexLp?: boolean;
    strategies?: boolean;
    addLiquidity?: boolean;
  };
  disableCharts?: boolean;
  ratesHistoryApiUrl?: string;
  subgraphUrl?: string;
  addresses: {
    LENDING_POOL_ADDRESS_PROVIDER: string;
    LENDING_POOL: string;
    WETH_GATEWAY: string;
    FAUCET?: string;
    WALLET_BALANCE_PROVIDER: string;
    UI_POOL_DATA_PROVIDER: string;
    UI_INCENTIVE_DATA_PROVIDER: string;
  };
}

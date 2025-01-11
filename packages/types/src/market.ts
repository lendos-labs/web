import { CustomPoints, NetworkConfig } from './chain';

export type Markets<T = string> = Record<string, MarketDataType<T>>;

export interface MarketDataType<T = string> {
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
    LENDING_POOL_ADDRESS_PROVIDER: T;
    LENDING_POOL: T;
    WETH_GATEWAY: T;
    FAUCET?: T;
    WALLET_BALANCE_PROVIDER: T;
    UI_POOL_DATA_PROVIDER: T;
    UI_INCENTIVE_DATA_PROVIDER: T;
  };
}

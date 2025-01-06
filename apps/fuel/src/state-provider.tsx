import React, { ReactNode, useState } from 'react';

import { StateContext } from '@lendos/ui/providers/StateProvider';

import { MarketDataType } from '@lendos/types/market';

import { SupportedMarkets, marketsData } from './config/supported-markets';

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const availableMarkets = marketsData;

  const [currentMarketData, setMarket] = useState<MarketDataType>(
    marketsData[SupportedMarkets.fuel_sepolia] as unknown as MarketDataType,
  );

  const setCurrentMarket = (market: string) => {
    const value = marketsData[market];
    if (!value) {
      return;
    }
    setMarket(value);
  };
  return (
    <StateContext.Provider
      value={{
        availableMarkets,
        currentMarketData,
        minRemainingBaseTokenBalance: '1',
        setCurrentMarket,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

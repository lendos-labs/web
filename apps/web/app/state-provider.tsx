import React, { ReactNode } from 'react';
import { StateContext } from '@lendos/ui/providers/StateProvider';
import { CustomMarket, MarketDataType } from '@lendos/types/market';
import { ChainId } from '@lendos/types/chain';

const mockMarket = {
  marketTitle: 'Fuel',
  market: CustomMarket.proto_fuel,
  chainId: ChainId.fuel,
  enabledFeatures: {
    switch: true,
    borrowBoost: true,
  },
  addresses: {},
} as MarketDataType;

export const StateProvider = ({ children }: { children: ReactNode }) => {
  return (
    <StateContext.Provider
      value={{
        currentMarketData: mockMarket,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

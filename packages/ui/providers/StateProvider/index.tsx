import { createContext, useContext } from 'react';

import { MarketDataType, Markets } from '@lendos/types/market';

export interface StateContextType {
  availableMarkets: Markets;
  currentMarketData: MarketDataType;
  minRemainingBaseTokenBalance: string;
  setCurrentMarket: (market: string) => void;
}

export const StateContext = createContext<StateContextType>({} as StateContextType);

export const useStateContext = () => {
  const context = useContext(StateContext);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- check is hook call inside provider
  if (!context) {
    throw new Error('useStateContext must be used within a ModalContextProvider');
  }

  return context;
};

import { createContext, useContext } from 'react';

import { MarketDataType, Markets } from '@lendos/types/market';

import { CookieKey } from '@lendos/constants/cookie';

export interface StateContextType {
  availableMarkets: Markets;
  currentMarketData: MarketDataType;
  minRemainingBaseTokenBalance: string;
  showZero: Record<CookieKey.SHOW_ZERO_ASSETS | CookieKey.SHOW_ZERO_LPS, boolean>;
  setCurrentMarket: (market: string) => void;
  setShowZero: (key: CookieKey.SHOW_ZERO_ASSETS | CookieKey.SHOW_ZERO_LPS) => void;
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

import { NetworkConfig } from '@lendos/types/chain';
import { MarketDataType } from '@lendos/types/market';
import { createContext, useContext } from 'react';

export interface StateContextType {
  currentMarketData: MarketDataType;
  currentNetworkData: NetworkConfig;
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

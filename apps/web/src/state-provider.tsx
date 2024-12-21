import React, { ReactNode, useState } from 'react';
import { StateContext } from '@lendos/ui/providers/StateProvider';
import { CustomMarket, MarketDataType } from '@lendos/types/market';
import { ChainId, NetworkConfig } from '@lendos/types/chain';

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

const linkBuilder =
  ({
    baseUrl,
    addressPrefix = 'address',
    txPrefix = 'tx',
  }: {
    baseUrl: string;
    addressPrefix?: string;
    txPrefix?: string;
  }) =>
  ({ tx, address }: { tx?: string; address?: string }): string => {
    if (tx) {
      return `${baseUrl}/${txPrefix}/${tx}`;
    }
    if (address) {
      return `${baseUrl}/${addressPrefix}/${address}`;
    }
    return baseUrl;
  };

const mockNetwork = {
  isTestnet: true,
  name: 'Fuel',
  explorerLink: 'https://app.fuel.network',
  explorerLinkBuilder: linkBuilder({
    baseUrl: 'https://app.fuel.network',
    addressPrefix: 'account',
  }),
} as NetworkConfig;

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const availableMarkets = [mockMarket];
  const [currentMarketData, setMarket] = useState<MarketDataType>(
    availableMarkets[0] ?? mockMarket,
  );

  const availableNetworks = { [ChainId.fuel]: mockNetwork };
  const setCurrentMarket = (
    market: CustomMarket,
    // TODO add omitQueryParameterUpdate
    // omitQueryParameterUpdate?: boolean
  ) => {
    const newMarket = availableMarkets.find(m => m.market === market);
    if (!newMarket) {
      return;
    }
    setMarket(newMarket);
  };
  return (
    <StateContext.Provider
      value={{
        availableMarkets,
        availableNetworks,
        currentMarketData,
        currentNetworkData: mockNetwork,
        setCurrentMarket,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

import React, { ReactNode } from 'react';
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
  explorerLink: '',
  explorerLinkBuilder: linkBuilder({ baseUrl: '' }),
} as NetworkConfig;

export const StateProvider = ({ children }: { children: ReactNode }) => {
  return (
    <StateContext.Provider
      value={{
        currentMarketData: mockMarket,
        currentNetworkData: mockNetwork,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

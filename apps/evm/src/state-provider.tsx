import React, { ReactNode, useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { setCookie } from 'cookies-next/client';

import { StateContext } from '@lendos/ui/providers/StateProvider';

import { MarketDataType } from '@lendos/types/market';

import { CookieKey } from '@lendos/constants/cookie';

import { marketsData } from './config/supported-markets';

export const StateProvider = ({
  children,
  selectedMarket,
}: {
  children: ReactNode;
  selectedMarket: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const availableMarkets = marketsData;

  const [currentMarketData, setMarket] = useState<MarketDataType>(
    marketsData[selectedMarket] ?? ({} as MarketDataType),
  );

  const setCurrentMarket = (market: string) => {
    const value = marketsData[market];
    if (!value) {
      return;
    }

    setCookie(CookieKey.SELECTED_MARKET, market);

    setMarket(value);

    const paths = pathname.split('/');
    paths[1] = market;
    router.push(paths.join('/'));
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

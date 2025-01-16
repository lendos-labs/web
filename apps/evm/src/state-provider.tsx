import React, { ReactNode, useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { setCookie } from 'cookies-next/client';

import { StateContext } from '@lendos/ui/providers/StateProvider';

import { CookieKey } from '@lendos/constants/cookie';

import { marketsData } from './config/supported-markets';
import { EvmMarketDataType } from './types/common';

interface StateProviderProps {
  children: ReactNode;
  appState: {
    selectedMarket: string;
    [CookieKey.SHOW_ZERO_ASSETS]: boolean;
    [CookieKey.SHOW_ZERO_LPS]: boolean;
  };
}

export const StateProvider = ({ children, appState }: StateProviderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const availableMarkets = marketsData;

  const [currentMarketData, setMarket] = useState<EvmMarketDataType>(
    marketsData[appState.selectedMarket] ?? ({} as EvmMarketDataType),
  );
  const [showZero, setShowZero] = useState<
    Record<CookieKey.SHOW_ZERO_ASSETS | CookieKey.SHOW_ZERO_LPS, boolean>
  >({
    [CookieKey.SHOW_ZERO_ASSETS]: appState[CookieKey.SHOW_ZERO_ASSETS],
    [CookieKey.SHOW_ZERO_LPS]: appState[CookieKey.SHOW_ZERO_LPS],
  });

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

  const showShowZeroByKey = (key: CookieKey.SHOW_ZERO_ASSETS | CookieKey.SHOW_ZERO_LPS) => {
    setCookie(key, !showZero[key]);
    setShowZero(state => ({
      ...state,
      [key]: !showZero[key],
    }));
  };

  return (
    <StateContext.Provider
      value={{
        availableMarkets,
        currentMarketData,
        minRemainingBaseTokenBalance: '1',
        showZero,
        setCurrentMarket,
        setShowZero: showShowZeroByKey,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

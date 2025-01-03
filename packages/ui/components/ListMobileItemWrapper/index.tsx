import { ReactNode } from 'react';

import { CustomMarket } from '@lendos/types/market';

import { ListMobileItem } from '../ListMobileItem';

interface ListMobileItemWrapperProps {
  symbol?: string;
  iconSymbol?: string;
  name?: string;
  underlyingAsset?: string;
  children: ReactNode;
  loading?: boolean;
  currentMarket?: CustomMarket;
}

export const ListMobileItemWrapper = ({
  symbol,
  iconSymbol,
  name,
  children,
  underlyingAsset,
  loading,
  currentMarket,
}: ListMobileItemWrapperProps) => {
  return (
    <ListMobileItem
      symbol={symbol}
      iconSymbol={iconSymbol}
      name={name}
      underlyingAsset={underlyingAsset}
      loading={loading}
      currentMarket={currentMarket}
    >
      {children}
    </ListMobileItem>
  );
};

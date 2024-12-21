'use client';

import { useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import { ListWrapper } from '../../components/ListWrapper';
import { FormattedReservesAndIncentives, ReserveToken } from '@lendos/types/reserves';
import { TitleWithSearchBar } from '../../components/TitleWithSearchBar';
import MarketAssetsList from './MarketAssetsList';

export const MarketAssetsListContainer = ({
  reserves,
  loading,
}: {
  reserves: FormattedReservesAndIncentives<ReserveToken>[];
  loading: boolean;
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { breakpoints } = useTheme();
  const sm = useMediaQuery(breakpoints.down('sm'));

  const filteredData = reserves
    .filter(res => res.isActive)
    .filter(res => {
      if (!searchTerm) {
        return true;
      }
      const term = searchTerm.toLowerCase().trim();
      return (
        res.symbol.toLowerCase().includes(term) ||
        res.name.toLowerCase().includes(term) ||
        res.underlyingAsset.toLowerCase().includes(term)
      );
    });

  return (
    <ListWrapper
      titleComponent={
        <TitleWithSearchBar
          onSearchTermChange={setSearchTerm}
          title='Assets'
          searchPlaceholder={sm ? 'Search asset' : 'Search asset name, symbol, or address'}
        />
      }
    >
      <MarketAssetsList reserves={filteredData} loading={loading} />
    </ListWrapper>
  );
};

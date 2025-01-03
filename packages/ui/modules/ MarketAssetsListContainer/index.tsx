'use client';

import { useState } from 'react';

import { Box } from '@mui/material';

import { FormattedReservesAndIncentives, ReserveToken } from '@lendos/types/reserves';

import { ListWrapper } from '../../components/ListWrapper';
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
          searchPlaceholder='Search asset name, symbol, or address'
        />
      }
    >
      <Box>
        <MarketAssetsList reserves={filteredData} loading={loading} />
      </Box>
    </ListWrapper>
  );
};

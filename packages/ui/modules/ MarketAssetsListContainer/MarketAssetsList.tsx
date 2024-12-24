'use client';

import { FormattedReservesAndIncentives, ReserveToken } from '@lendos/types/reserves';
import { useMediaQuery } from '@mui/material';
import { MarketAssetsListMobileItemLoader } from './MarketAssetsListMobileItemLoader';
import { MarketAssetsListItemLoader } from './MarketAssetsListItemLoader';
import { CustomTable, TableData } from '../../components/Table';
import { getMarketsCells, marketHeader } from './TableData';
import { useMemo } from 'react';
import { useStateContext } from '../../providers/StateProvider';

interface MarketAssetsListProps {
  reserves: FormattedReservesAndIncentives<ReserveToken>[];
  loading: boolean;
}

export default function MarketAssetsList({ loading, reserves }: MarketAssetsListProps) {
  const isTableChangedToCards = useMediaQuery('(max-width:1125px)');
  const { currentMarketData } = useStateContext();

  const data = useMemo(() => {
    return reserves.map(reserve => getMarketsCells(reserve, currentMarketData)) as TableData[];
  }, [reserves, currentMarketData]);

  // Show loading state when loading
  if (loading) {
    return isTableChangedToCards ? (
      <>
        <MarketAssetsListMobileItemLoader />
        <MarketAssetsListMobileItemLoader />
        <MarketAssetsListMobileItemLoader />
      </>
    ) : (
      <>
        <MarketAssetsListItemLoader />
        <MarketAssetsListItemLoader />
        <MarketAssetsListItemLoader />
        <MarketAssetsListItemLoader />
      </>
    );
  }

  return <CustomTable heightRow={50} header={marketHeader} data={data} />;
}

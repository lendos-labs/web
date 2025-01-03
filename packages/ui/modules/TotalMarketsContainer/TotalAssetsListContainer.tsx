'use client';

import { useMemo, useState } from 'react';

import { MarketDataType } from '@lendos/types/market';
import { TotalFormatReserveWithMarkets } from '@lendos/types/reserves';

import { ListWrapper } from '../../components/ListWrapper';
import { CustomTable, TableData } from '../../components/Table';
import { getAllTotalAssetsList, listHeaders, listHeadersCollapsibleHeader } from './TableData.tsx';
import { TotalListHeader } from './TotalListHeader.tsx';

interface TotalAssetsListContainerProps {
  reserves: TotalFormatReserveWithMarkets[];
  marketsData: MarketDataType[];
}

function TotalAssetsListContainer({
  reserves,
  marketsData,
}: Readonly<TotalAssetsListContainerProps>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterNetwork, setFilterNetwork] = useState<string>('all');

  const filteredData = reserves
    // filter out any that don't meet search term criteria
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
    })
    .filter(res => {
      if (filterNetwork === 'all') {
        return true;
      }
      return res.markets.some(m => String(m.market) === filterNetwork);
    });

  const data = useMemo(() => {
    return filteredData.map(reserve => getAllTotalAssetsList({ reserve })) as TableData[];
  }, [filteredData]);

  return (
    <ListWrapper
      titleComponent={
        <TotalListHeader
          handleSearchQueryChange={setSearchTerm}
          handleTotalNetworkChange={setFilterNetwork}
          filterNetwork={filterNetwork}
          marketsData={marketsData}
        />
      }
    >
      {/* <TotalAssetsList reserves={filteredData} />*/}
      <CustomTable
        header={listHeaders}
        collapsibleHeader={listHeadersCollapsibleHeader}
        data={data}
      />
    </ListWrapper>
  );
}

export default TotalAssetsListContainer;

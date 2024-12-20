import React from 'react';
import { Connect } from './components/Connect';
import { Link } from '@lendos/ui/components/Link';
import { CustomTable, TableHeadProperties } from '@lendos/ui/components/Table';

export const collateralHeader: TableHeadProperties[] = [
  {
    key: 'id',
    title: 'ID',
    sortKey: 'id',
  },
  {
    key: 'pool',
    title: 'Pool',
  },
  {
    key: 'dex',
    title: 'DEX',
  },
  {
    key: 'collateral',
    title: 'Value',
  },
  {
    key: 'actions',
    title: '',
    style: { width: '55%' },
  },
];

const Home = () => {
  return (
    <>
      <Connect />
      <Link href={'/test'}>Test</Link>
      <CustomTable
        header={collateralHeader}
        data={[
          {
            id: '1',
            pool: 'pool',
            dex: 'dex',
            collateral: 'collateral',
            actions: 'actions',
          },
          {
            id: 2,
            pool: 'pool',
            dex: 'dex',
            collateral: 'collateral',
            actions: 'actions',
          },
        ]}
      />
    </>
  );
};

export default Home;

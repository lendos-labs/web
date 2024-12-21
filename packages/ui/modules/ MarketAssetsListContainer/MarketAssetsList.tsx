import { FormattedReservesAndIncentives } from '@lendos/types/reserves';
import { useMediaQuery } from '@mui/material';
import { MarketAssetsListMobileItemLoader } from './MarketAssetsListMobileItemLoader';
import { MarketAssetsListItemLoader } from './MarketAssetsListItemLoader';
import { CustomTable, TableHeadProperties } from '../../components/Table';
import { VariableAPYTooltip } from '../../components/VariableAPYTooltip';

const listHeaders: TableHeadProperties[] = [
  {
    key: 'symbol',
    title: 'Asset',
    sortKey: 'symbol',
  },
  {
    key: 'totalLiquidityUSD',
    title: 'Total supplied',
    sortKey: 'totalLiquidityUSD',
  },
  {
    key: 'supplyAPY',
    title: 'Supply APY',
    sortKey: 'supplyAPY',
  },
  {
    key: 'totalDebtUSD',
    title: 'Total borrowed',
    sortKey: 'totalDebtUSD',
  },
  {
    key: 'variableBorrowAPY',
    title: (
      <VariableAPYTooltip text='Borrow APY, variable' key='APY_list_variable_type' variant='h3' />
    ),
    sortKey: 'variableBorrowAPY',
  },
];

interface MarketAssetsListProps {
  reserves: FormattedReservesAndIncentives[];
  loading: boolean;
}

export default function MarketAssetsList({ loading }: MarketAssetsListProps) {
  const isTableChangedToCards = useMediaQuery('(max-width:1125px)');

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

  return <CustomTable heightRow={50} header={listHeaders} data={[]} />;
}

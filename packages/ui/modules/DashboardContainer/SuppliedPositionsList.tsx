import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';

import { useAccountContext } from '../../providers/AccountProvider';
import { Reserves } from '@lendos/types/reserves';
import { ListWrapper } from '../../components/ListWrapper';
import { NoContent } from '../../components/NoContent';
import { ListTopInfoItem } from '../../components/ListTopInfoItem';
import { TotalSupplyAPYTooltip } from '../../components/infoTooltips/TotalSupplyAPYTooltip.tsx';
import { CollateralTooltip } from '../../components/infoTooltips/CollateralTooltip.tsx';
import { CustomTable, TableHeadProperties } from '../../components/Table';

const assetHead: TableHeadProperties[] = [
  {
    key: 'symbol',
    title: 'Assets',
    sortKey: 'symbol',
  },
  {
    key: 'underlyingBalance',
    title: 'Balance',
    sortKey: 'underlyingBalance',
  },
  {
    key: 'supplyAPY',
    title: 'APY',
    sortKey: 'supplyAPY',
  },
  {
    key: 'usageAsCollateralEnabledOnUser',
    title: 'Collateral',
  },
  {
    key: 'actions',
    title: '',
  },
];

const lpHead = [
  {
    key: 'symbol',
    title: 'Pool',
  },
  {
    key: 'Balance',
    title: 'Value',
    sortKey: 'underlyingBalanceUSD',
  },
  {
    key: 'DEX',
    title: 'DEX',
    sortKey: 'dex',
  },
];

interface SuppliedPositionsListProps {
  type: Reserves;
}

export const SuppliedPositionsList = ({ type }: SuppliedPositionsListProps) => {
  const { accountSummary } = useAccountContext();
  const { data } = accountSummary;
  // const { currentNetworkData } = useStateContext();

  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);

  // const suppliedPositions =
  //   data?.userReservesData
  //     .filter(userReserve => userReserve.reserve.type === type)
  //     .filter(userReserve => userReserve.underlyingBalance !== '0')
  //     .map(userReserve => ({
  //       ...userReserve,
  //       supplyAPY: userReserve.reserve.supplyAPY, // Note: added only for table sort
  //       reserve: {
  //         ...userReserve.reserve,
  //         // ...(userReserve.reserve.isWrappedBaseAsset
  //         //   ? fetchIconSymbolAndName({
  //         //       symbol: currentNetworkData.baseAssetSymbol,
  //         //       underlyingAsset: API_ETH_MOCK_ADDRESS.toLowerCase(),
  //         //     })
  //         //   : {}),
  //       },
  //     })) ?? [];

  // Transform to the DashboardReserve schema so the sort utils can work with it
  // const preSortedReserves = suppliedPositions as DashboardReserve[];
  const preSortedReserves = [
    {
      symbol: 'USDC',
      walletBalance: '7',
      supplyAPY: '0.02%',
      usageAsCollateralEnabledOnUser: true,
    },
  ];
  // const sortedReserves = handleSortDashboardReserves(
  //   sortDesc,
  //   sortName,
  //   'position',
  //   preSortedReserves,
  // ).map(item => ({
  //   ...item,
  //   reserve: { ...item.reserve, rewardAPY: rewardAPYs?.[item.reserve.symbol] || 0 },
  // }));

  return (
    <ListWrapper
      tooltipOpen={tooltipOpen}
      titleComponent={
        <Typography
          component='div'
          variant='h3'
          sx={{ mr: 4, display: 'flex', alignItems: 'center', gap: 1.5 }}
        >
          <PlayCircleIcon sx={{ color: 'primary.light' }} />
          {type === Reserves.ASSET ? 'Your supplies' : 'LP tokens under collateral'}
        </Typography>
      }
      localStorageName='suppliedAssetsDashboardTableCollapse'
      noData={!preSortedReserves.length}
      topInfo={
        type === Reserves.ASSET && (
          <>
            {!!preSortedReserves.length && (
              <>
                <ListTopInfoItem title={'Balance'} value={data?.totalLiquidityUSD ?? 0} />
                <ListTopInfoItem
                  title='APY'
                  value={data?.earnedAPY ?? 0}
                  percent
                  tooltip={<TotalSupplyAPYTooltip setOpen={setTooltipOpen} />}
                />
                <ListTopInfoItem
                  title='Collateral'
                  value={data?.totalCollateralUSD ?? 0}
                  tooltip={<CollateralTooltip setOpen={setTooltipOpen} />}
                />
              </>
            )}
          </>
        )
      }
    >
      {preSortedReserves.length ? (
        <Box px={4}>
          <CustomTable
            heightRow={50}
            header={type === Reserves.ASSET ? assetHead : lpHead}
            data={preSortedReserves}
          />
        </Box>
      ) : (
        <NoContent text='Nothing supplied yet' />
      )}
    </ListWrapper>
  );
};

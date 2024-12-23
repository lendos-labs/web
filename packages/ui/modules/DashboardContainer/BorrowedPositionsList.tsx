import { valueToBigNumber } from '@aave/math-utils';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useAccountContext } from '../../providers/AccountProvider';
import { ListTopInfoItem } from '../../components/ListTopInfoItem';
import { TotalBorrowAPYTooltip } from '../../components/infoTooltips/TotalBorrowAPYTooltip.tsx';
import { ListWrapper } from '../../components/ListWrapper';
import { NoContent } from '../../components/NoContent';
import { CustomTable, TableHeadProperties } from '../../components/Table';
import { BorrowPowerTooltip } from '../../components/infoTooltips/BorrowPowerTooltip.tsx';

const head: TableHeadProperties[] = [
  {
    key: 'symbol',
    title: 'Asset',
    sortKey: 'symbol',
  },
  {
    key: 'variableBorrows',
    title: 'Debt',
    sortKey: 'variableBorrows',
  },
  {
    key: 'borrowAPY',
    title: 'APY',
    sortKey: 'borrowAPY',
  },
  {
    // <APYTypeTooltip text={<>APY type</>} key='APY type' variant='h3' />
    key: 'typeAPY',
    title: 'APY type',
  },
  {
    key: 'actions',
    title: '',
  },
];

export const BorrowedPositionsList = () => {
  const { accountSummary } = useAccountContext();
  const { data } = accountSummary;

  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);

  // const borrowPositions =
  //   data?.userReservesData.reduce(
  //     (acc, userReserve) => {
  //       if (userReserve.variableBorrows !== '0') {
  //         acc.push({
  //           ...userReserve,
  //           borrowRateMode: InterestRate.Variable,
  //           reserve: {
  //             ...userReserve.reserve,
  //             ...(userReserve.reserve.isWrappedBaseAsset
  //               ? fetchIconSymbolAndName({
  //                   symbol: currentNetworkConfig.baseAssetSymbol,
  //                   underlyingAsset: API_ETH_MOCK_ADDRESS.toLowerCase(),
  //                 })
  //               : {}),
  //           },
  //         });
  //       }
  //       if (userReserve.stableBorrows !== '0') {
  //         acc.push({
  //           ...userReserve,
  //           borrowRateMode: InterestRate.Stable,
  //           reserve: {
  //             ...userReserve.reserve,
  //             ...(userReserve.reserve.isWrappedBaseAsset
  //               ? fetchIconSymbolAndName({
  //                   symbol: currentNetworkConfig.baseAssetSymbol,
  //                   underlyingAsset: API_ETH_MOCK_ADDRESS.toLowerCase(),
  //                 })
  //               : {}),
  //           },
  //         });
  //       }
  //       return acc;
  //     },
  //     [] as (ExtendedFormattedUser['userReservesData'][0] & { borrowRateMode: InterestRate })[],
  //   ) || [];

  const maxBorrowAmount = valueToBigNumber(data?.totalBorrowsMarketReferenceCurrency ?? '0').plus(
    data?.availableBorrowsMarketReferenceCurrency ?? '0',
  );

  const collateralUsagePercent = maxBorrowAmount.eq(0)
    ? '0'
    : valueToBigNumber(data?.totalBorrowsMarketReferenceCurrency ?? '0')
        .div(maxBorrowAmount)
        .toFixed();

  // Transform to the DashboardReserve schema so the sort utils can work with it
  // const preSortedReserves = borrowPositions as DashboardReserve[];
  const sortedReserves = [
    {
      symbol: 'USDC',
      walletBalance: '7',
      supplyAPY: '0.02%',
      usageAsCollateralEnabledOnUser: true,
    },
  ];

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
          Your borrows
        </Typography>
      }
      localStorageName='borrowedAssetsDashboardTableCollapse'
      noData={!sortedReserves.length}
      topInfo={
        <>
          {!!sortedReserves.length && (
            <>
              <ListTopInfoItem title={<>Balance</>} value={data?.totalBorrowsUSD ?? 0} />
              <ListTopInfoItem
                title={<>APY</>}
                value={data?.debtAPY ?? 0}
                percent
                tooltip={<TotalBorrowAPYTooltip setOpen={setTooltipOpen} />}
              />
              <ListTopInfoItem
                title={<>Borrow power used</>}
                value={collateralUsagePercent || 0}
                percent
                tooltip={<BorrowPowerTooltip setOpen={setTooltipOpen} />}
              />
            </>
          )}
        </>
      }
    >
      {sortedReserves.length ? (
        <Box px={4}>
          <CustomTable heightRow={50} header={head} data={sortedReserves} />
        </Box>
      ) : (
        <NoContent text={'Nothing borrowed yet'} />
      )}
    </ListWrapper>
  );
};

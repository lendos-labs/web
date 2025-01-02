import { valueToBigNumber } from '@aave/math-utils';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { ListTopInfoItem } from '../../components/ListTopInfoItem';
import { TotalBorrowAPYTooltip } from '../../components/infoTooltips/TotalBorrowAPYTooltip.tsx';
import { ListWrapper } from '../../components/ListWrapper';
import { NoContent } from '../../components/NoContent';
import { CustomTable, TableData } from '../../components/Table';
import { BorrowPowerTooltip } from '../../components/infoTooltips/BorrowPowerTooltip.tsx';
import { reservesDashboard } from '@lendos/constants/reserves';
import { borrowedPositionsHead, getBorrowedPositionsCells } from './TableData.tsx';
import { useStateContext } from '../../providers/StateProvider';
import { useModalContext } from '../../providers/ModalProvider';
import { useReservesContext } from '../../providers/ReservesProvider/index.tsx';
const hide = true;

export const BorrowedPositionsList = () => {
  const { accountSummary } = useReservesContext();

  const { openBorrow, openRepay, openRateSwitch, openDebtSwitch } = useModalContext();
  const { currentMarketData } = useStateContext();

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

  const maxBorrowAmount = valueToBigNumber(
    accountSummary?.totalBorrowsMarketReferenceCurrency ?? '0',
  ).plus(accountSummary?.availableBorrowsMarketReferenceCurrency ?? '0');

  const collateralUsagePercent = maxBorrowAmount.eq(0)
    ? '0'
    : valueToBigNumber(accountSummary?.totalBorrowsMarketReferenceCurrency ?? '0')
        .div(maxBorrowAmount)
        .toFixed();

  // Transform to the DashboardReserve schema so the sort utils can work with it
  // const preSortedReserves = borrowPositions as DashboardReserve[];
  const data = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- TODO delete later
    if (hide) {
      return [];
    }
    return reservesDashboard.map(reserve => {
      return getBorrowedPositionsCells(
        reserve,
        currentMarketData,
        openBorrow,
        openRepay,
        openRateSwitch,
        openDebtSwitch,
      );
    }) as TableData[];
  }, [currentMarketData, openBorrow, openDebtSwitch, openRateSwitch, openRepay]);

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
      noData={!data.length}
      topInfo={
        <>
          {!!data.length && (
            <>
              <ListTopInfoItem title={<>Balance</>} value={accountSummary?.totalBorrowsUSD ?? 0} />
              <ListTopInfoItem
                title={<>APY</>}
                value={accountSummary?.debtAPY ?? 0}
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
      {data.length ? (
        <CustomTable heightRow={50} header={borrowedPositionsHead} data={data} paddingColl={1} />
      ) : (
        <NoContent text={'Nothing borrowed yet'} />
      )}
    </ListWrapper>
  );
};

import { valueToBigNumber } from '@aave/math-utils';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Box, Typography } from '@mui/material';
import { useMemo } from 'react';

import { reservesDashboard } from '@lendos/constants/reserves';
import { borrowAssetsHead, getBorrowAssetsCells } from './TableData.tsx';
import { CustomTable, TableData } from '../../components/Table';
import { NoContent } from '../../components/NoContent';
import { useAccountContext } from '../../providers/AccountProvider';
import { useModalContext } from '../../providers/ModalProvider';
import { useStateContext } from '../../providers/StateProvider';
import { Warning } from '../../components/Warning';
import { ListWrapper } from '../../components/ListWrapper';

export const BorrowAssetsList = () => {
  const { accountSummary } = useAccountContext();
  const { data: userData } = accountSummary;
  const { openBorrow } = useModalContext();
  const { currentMarketData } = useStateContext();

  const maxBorrowAmount = valueToBigNumber(
    userData?.totalBorrowsMarketReferenceCurrency ?? '0',
  ).plus(userData?.availableBorrowsMarketReferenceCurrency ?? '0');
  const collateralUsagePercent = maxBorrowAmount.eq(0)
    ? '0'
    : valueToBigNumber(userData?.totalBorrowsMarketReferenceCurrency ?? '0')
        .div(maxBorrowAmount)
        .toFixed();

  const borrowReserves =
    userData?.totalCollateralMarketReferenceCurrency === '0' || +collateralUsagePercent >= 0.98
      ? reservesDashboard
      : reservesDashboard.filter(({ availableBorrowsInUSD, totalLiquidityUSD }) => {
          return availableBorrowsInUSD !== '0.00' && totalLiquidityUSD !== '0';
        });

  const borrowDisabled = !borrowReserves.length;

  const data = useMemo(() => {
    return reservesDashboard.map(reserve => {
      return getBorrowAssetsCells(reserve, currentMarketData, openBorrow);
    }) as TableData[];
  }, [currentMarketData, openBorrow]);

  return (
    <ListWrapper
      titleComponent={
        <Typography
          component='div'
          variant='h3'
          sx={{ mr: 4, display: 'flex', alignItems: 'center', gap: 1.5 }}
        >
          <PlayCircleIcon sx={{ color: 'primary.light' }} />
          Assets to borrow
        </Typography>
      }
      localStorageName='borrowAssetsDashboardTableCollapse'
      withTopMargin
      noData={borrowDisabled}
      subChildrenComponent={
        <Box sx={{ px: 6, mb: 4 }}>
          {userData?.healthFactor !== '-1' && Number(userData?.healthFactor) <= 1.1 && (
            <Warning severity='error'>
              Be careful - You are very close to liquidation. Consider depositing more collateral or
              paying down some of your borrowed positions
            </Warning>
          )}

          {!borrowDisabled && (
            <>
              {userData?.isInIsolationMode && (
                <Warning severity='warning'>
                  Borrowing power and assets are limited due to Isolation mode.
                </Warning>
              )}
              {userData?.isInEmode && (
                <Warning severity='warning'>
                  In E-Mode some assets are not borrowable. Exit E-Mode to get access to all assets
                </Warning>
              )}
              {userData?.totalCollateralMarketReferenceCurrency === '0' && (
                <Warning severity='info'>
                  To borrow you need to supply any asset to be used as collateral.
                </Warning>
              )}
            </>
          )}
        </Box>
      }
    >
      {data.length ? (
        <CustomTable heightRow={50} header={borrowAssetsHead} data={data} paddingColl={1} />
      ) : (
        <NoContent text={'Nothing borrowed yet'} />
      )}
    </ListWrapper>
  );
};

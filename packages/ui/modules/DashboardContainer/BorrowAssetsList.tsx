import { useMemo } from 'react';

import { valueToBigNumber } from '@aave/math-utils';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Box, Typography } from '@mui/material';

import { CookieKey } from '@lendos/constants/cookie';
import { reservesDashboard } from '@lendos/constants/reserves';

import { ListWrapper } from '../../components/ListWrapper';
import { NoContent } from '../../components/NoContent';
import { CustomTable, TableData } from '../../components/Table';
import { Warning } from '../../components/Warning';
import { useModalContext } from '../../providers/ModalProvider';
import { useReservesContext } from '../../providers/ReservesProvider/index.tsx';
import { useStateContext } from '../../providers/StateProvider';
import { borrowAssetsHead, getBorrowAssetsCells } from './TableData.tsx';

const hide = true;

export const BorrowAssetsList = () => {
  const { accountSummary } = useReservesContext();
  const { openBorrow } = useModalContext();
  const { currentMarketData } = useStateContext();

  const maxBorrowAmount = valueToBigNumber(
    accountSummary?.totalBorrowsMarketReferenceCurrency ?? '0',
  ).plus(accountSummary?.availableBorrowsMarketReferenceCurrency ?? '0');
  const collateralUsagePercent = maxBorrowAmount.eq(0)
    ? '0'
    : valueToBigNumber(accountSummary?.totalBorrowsMarketReferenceCurrency ?? '0')
        .div(maxBorrowAmount)
        .toFixed();

  const borrowReserves =
    accountSummary?.totalCollateralMarketReferenceCurrency === '0' ||
    +collateralUsagePercent >= 0.98
      ? reservesDashboard
      : reservesDashboard.filter(({ availableBorrowsInUSD, totalLiquidityUSD }) => {
          return availableBorrowsInUSD !== '0.00' && totalLiquidityUSD !== '0';
        });

  const borrowDisabled = !borrowReserves.length;

  const data = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- TODO delete later
    if (hide) {
      return [];
    }
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
      storageName={CookieKey.BORROW_ASSET_DASHBOARD_COLLAPSE}
      withTopMargin
      noData={borrowDisabled}
      subChildrenComponent={
        <Box sx={{ px: 6, mb: 4 }}>
          {accountSummary?.healthFactor !== '-1' && Number(accountSummary?.healthFactor) <= 1.1 && (
            <Warning severity='error'>
              Be careful - You are very close to liquidation. Consider depositing more collateral or
              paying down some of your borrowed positions
            </Warning>
          )}

          {!borrowDisabled && (
            <>
              {accountSummary?.isInIsolationMode && (
                <Warning severity='warning'>
                  Borrowing power and assets are limited due to Isolation mode.
                </Warning>
              )}
              {accountSummary?.isInEmode && (
                <Warning severity='warning'>
                  In E-Mode some assets are not borrowable. Exit E-Mode to get access to all assets
                </Warning>
              )}
              {accountSummary?.totalCollateralMarketReferenceCurrency === '0' && (
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

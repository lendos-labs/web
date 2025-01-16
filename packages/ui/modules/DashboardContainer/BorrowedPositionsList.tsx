import { useMemo, useState } from 'react';

import { valueToBigNumber } from '@aave/math-utils';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Typography } from '@mui/material';

import { CookieKey } from '@lendos/constants/cookie';

import { ListLoader } from '../../components/ListLoader/index.tsx';
import { ListTopInfoItem } from '../../components/ListTopInfoItem';
import { ListWrapper } from '../../components/ListWrapper';
import { NoContent } from '../../components/NoContent';
import { CustomTable, TableData } from '../../components/Table';
import { BorrowPowerTooltip } from '../../components/infoTooltips/BorrowPowerTooltip.tsx';
import { TotalBorrowAPYTooltip } from '../../components/infoTooltips/TotalBorrowAPYTooltip.tsx';
import { useModalContext } from '../../providers/ModalProvider';
import { useReservesContext } from '../../providers/ReservesProvider/index.tsx';
import { useStateContext } from '../../providers/StateProvider';
import { borrowedPositionsHead, getBorrowedPositionsCells } from './TableData';

export const BorrowedPositionsList = () => {
  const { accountTokenReserves, accountSummary, loading } = useReservesContext();

  const { openBorrow, openRepay, openRateSwitch, openDebtSwitch } = useModalContext();
  const { currentMarketData } = useStateContext();

  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);

  const maxBorrowAmount = valueToBigNumber(
    accountSummary?.totalBorrowsMarketReferenceCurrency ?? '0',
  ).plus(accountSummary?.availableBorrowsMarketReferenceCurrency ?? '0');

  const collateralUsagePercent = maxBorrowAmount.eq(0)
    ? '0'
    : valueToBigNumber(accountSummary?.totalBorrowsMarketReferenceCurrency ?? '0')
        .div(maxBorrowAmount)
        .toFixed();

  const data = useMemo(() => {
    return accountTokenReserves
      .filter(reserve => reserve.variableBorrows !== '0' || reserve.stableBorrows !== '0')
      .map(reserve => {
        return getBorrowedPositionsCells(
          reserve,
          currentMarketData,
          openBorrow,
          openRepay,
          openRateSwitch,
          openDebtSwitch,
        );
      }) as TableData[];
  }, [
    accountTokenReserves,
    currentMarketData,
    openBorrow,
    openDebtSwitch,
    openRateSwitch,
    openRepay,
  ]);

  if (loading) {
    return <ListLoader title='Your borrows' head={borrowedPositionsHead.map(col => col.title)} />;
  }

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
      storageName={CookieKey.BORROWED_ASSET_DASHBOARD_COLLAPSE}
      noData={!data.length}
      topInfo={
        <>
          {!!data.length && (
            <>
              <ListTopInfoItem title='Balance' value={accountSummary?.totalBorrowsUSD ?? 0} />
              <ListTopInfoItem
                title='APY'
                value={accountSummary?.debtAPY ?? 0}
                percent
                tooltip={<TotalBorrowAPYTooltip setOpen={setTooltipOpen} />}
              />
              <ListTopInfoItem
                title='Borrow power used'
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

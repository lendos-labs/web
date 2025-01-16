import { useMemo, useState } from 'react';

import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Typography } from '@mui/material';

import { Reserves } from '@lendos/types/reserves';

import { ListLoader } from '../../../components/ListLoader/index.tsx';
import { ListTopInfoItem } from '../../../components/ListTopInfoItem/index.tsx';
import { ListWrapper } from '../../../components/ListWrapper/index.tsx';
import { NoContent } from '../../../components/NoContent/index.tsx';
import { CustomTable, TableData } from '../../../components/Table/index.tsx';
import { CollateralTooltip } from '../../../components/infoTooltips/CollateralTooltip.tsx';
import { TotalSupplyAPYTooltip } from '../../../components/infoTooltips/TotalSupplyAPYTooltip.tsx';
import { useModalContext } from '../../../providers/ModalProvider/index.tsx';
import { useReservesContext } from '../../../providers/ReservesProvider/index.tsx';
import { useStateContext } from '../../../providers/StateProvider/index.tsx';
import { getDexLpSuppliedPositionsCells, getSuppliedPositionsCells } from '../TableData.tsx';
import { suppliedAssetsDataByType } from './constants';

interface SuppliedPositionsListProps {
  type: Reserves;
}

export const SuppliedPositionsList = ({ type }: SuppliedPositionsListProps) => {
  const { currentMarketData } = useStateContext();
  const { accountLpReserves, accountTokenReserves, accountSummary, loading } = useReservesContext();

  const { openSupply, openWithdraw, openCollateralChange } = useModalContext();
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);

  const data = useMemo(() => {
    if (type === Reserves.LP) {
      return accountLpReserves
        .filter(userReserve => userReserve.underlyingBalance !== '0')
        .map(i => {
          return getDexLpSuppliedPositionsCells(i, currentMarketData, openSupply, openWithdraw);
        }) as TableData[];
    }

    return accountTokenReserves
      .filter(userReserve => userReserve.underlyingBalance !== '0')
      .map(i => {
        const { reserve } = i;
        const canBeEnabledAsCollateral = accountSummary
          ? reserve.reserveLiquidationThreshold !== '0' &&
            ((!reserve.isIsolated && !accountSummary.isInIsolationMode) ||
              accountSummary.isolatedReserve?.underlyingAsset === reserve.underlyingAsset ||
              (reserve.isIsolated && accountSummary.totalCollateralMarketReferenceCurrency === '0'))
          : false;

        return getSuppliedPositionsCells(
          i,
          currentMarketData,
          canBeEnabledAsCollateral,
          openSupply,
          openWithdraw,
          openCollateralChange,
        );
      }) as TableData[];
  }, [
    type,
    accountTokenReserves,
    accountLpReserves,
    currentMarketData,
    openSupply,
    openWithdraw,
    accountSummary,
    openCollateralChange,
  ]);

  if (loading) {
    return (
      <ListLoader
        title={suppliedAssetsDataByType[type].title}
        head={suppliedAssetsDataByType[type].header.map(col => col.title)}
      />
    );
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
          {suppliedAssetsDataByType[type].title}
        </Typography>
      }
      storageName={suppliedAssetsDataByType[type].collapseStorageName}
      noData={!data.length}
      topInfo={
        type === Reserves.ASSET && (
          <>
            {!!data.length && (
              <>
                <ListTopInfoItem title={'Balance'} value={accountSummary?.totalLiquidityUSD ?? 0} />
                <ListTopInfoItem
                  title='APY'
                  value={accountSummary?.earnedAPY ?? 0}
                  percent
                  tooltip={<TotalSupplyAPYTooltip setOpen={setTooltipOpen} />}
                />
                <ListTopInfoItem
                  title='Collateral'
                  value={accountSummary?.totalCollateralUSD ?? 0}
                  tooltip={<CollateralTooltip setOpen={setTooltipOpen} />}
                />
              </>
            )}
          </>
        )
      }
    >
      {data.length ? (
        <CustomTable
          heightRow={50}
          header={suppliedAssetsDataByType[type].header}
          data={data}
          paddingColl={1}
        />
      ) : (
        <NoContent text='Nothing supplied yet' />
      )}
    </ListWrapper>
  );
};

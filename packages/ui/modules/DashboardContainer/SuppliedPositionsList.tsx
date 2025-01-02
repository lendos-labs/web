import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { Reserves } from '@lendos/types/reserves';
import { ListWrapper } from '../../components/ListWrapper';
import { NoContent } from '../../components/NoContent';
import { ListTopInfoItem } from '../../components/ListTopInfoItem';
import { TotalSupplyAPYTooltip } from '../../components/infoTooltips/TotalSupplyAPYTooltip.tsx';
import { CollateralTooltip } from '../../components/infoTooltips/CollateralTooltip.tsx';
import { CustomTable, TableData } from '../../components/Table';
import {
  getDexLpSuppliedPositionsCells,
  getSuppliedPositionsCells,
  lpHead,
  suppliedPositionsHead,
} from './TableData.tsx';
import { useStateContext } from '../../providers/StateProvider';
import { useModalContext } from '../../providers/ModalProvider';
import { useReservesContext } from '../../providers/ReservesProvider/index.tsx';

interface SuppliedPositionsListProps {
  type: Reserves;
}

const empty = true;

export const SuppliedPositionsList = ({ type }: SuppliedPositionsListProps) => {
  const { currentMarketData } = useStateContext();
  const { accountSummary, reserves, lpReserves } = useReservesContext();

  const { openSupply, openWithdraw, openCollateralChange } = useModalContext();
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);

  const data = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- TODO delete later
    if (empty) {
      return [];
    }
    return reserves.map(reserve => {
      const canBeEnabledAsCollateral = accountSummary
        ? reserve.reserveLiquidationThreshold !== '0' &&
          ((!reserve.isIsolated && !accountSummary.isInIsolationMode) ||
            accountSummary.isolatedReserve?.underlyingAsset === reserve.underlyingAsset ||
            (reserve.isIsolated && accountSummary.totalCollateralMarketReferenceCurrency === '0'))
        : false;
      return getSuppliedPositionsCells(
        reserve,
        currentMarketData,
        openSupply,
        openWithdraw,
        openCollateralChange,
        canBeEnabledAsCollateral,
      );
    }) as TableData[];
  }, [currentMarketData, openCollateralChange, openSupply, openWithdraw, accountSummary, reserves]);

  const dexLpData = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- TODO delete later
    if (empty) {
      return [];
    }
    return lpReserves.map(reserve =>
      getDexLpSuppliedPositionsCells(reserve, currentMarketData),
    ) as TableData[];
  }, [currentMarketData, lpReserves]);

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
          header={type === Reserves.ASSET ? suppliedPositionsHead : lpHead}
          data={type === Reserves.ASSET ? data : dexLpData}
          paddingColl={1}
        />
      ) : (
        <NoContent text='Nothing supplied yet' />
      )}
    </ListWrapper>
  );
};

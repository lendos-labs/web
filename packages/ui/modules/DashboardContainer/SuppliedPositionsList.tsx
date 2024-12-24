import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Box, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { Reserves } from '@lendos/types/reserves';
import { ListWrapper } from '../../components/ListWrapper';
import { NoContent } from '../../components/NoContent';
import { ListTopInfoItem } from '../../components/ListTopInfoItem';
import { TotalSupplyAPYTooltip } from '../../components/infoTooltips/TotalSupplyAPYTooltip.tsx';
import { CollateralTooltip } from '../../components/infoTooltips/CollateralTooltip.tsx';
import { CustomTable, TableData } from '../../components/Table';
import { getSuppliedPositionsCells, lpHead, suppliedPositionsHead } from './TableData.tsx';
import { reserves } from '@lendos/constants/reserves';
import { useStateContext } from '../../providers/StateProvider';
import { useAccountContext } from '../../providers/AccountProvider';
import { useModalContext } from '../../providers/ModalProvider';

interface SuppliedPositionsListProps {
  type: Reserves;
}

export const SuppliedPositionsList = ({ type }: SuppliedPositionsListProps) => {
  const { currentMarketData } = useStateContext();
  const { accountSummary } = useAccountContext();
  const { data: userData } = accountSummary;
  const { openSupply, openWithdraw, openCollateralChange } = useModalContext();
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);

  const data = useMemo(() => {
    return reserves.map(reserve => {
      const canBeEnabledAsCollateral = userData
        ? reserve.reserveLiquidationThreshold !== '0' &&
          ((!reserve.isIsolated && !userData.isInIsolationMode) ||
            userData.isolatedReserve?.underlyingAsset === reserve.underlyingAsset ||
            (reserve.isIsolated && userData.totalCollateralMarketReferenceCurrency === '0'))
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
  }, [currentMarketData, openCollateralChange, openSupply, openWithdraw, userData]);

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
                <ListTopInfoItem title={'Balance'} value={userData?.totalLiquidityUSD ?? 0} />
                <ListTopInfoItem
                  title='APY'
                  value={userData?.earnedAPY ?? 0}
                  percent
                  tooltip={<TotalSupplyAPYTooltip setOpen={setTooltipOpen} />}
                />
                <ListTopInfoItem
                  title='Collateral'
                  value={userData?.totalCollateralUSD ?? 0}
                  tooltip={<CollateralTooltip setOpen={setTooltipOpen} />}
                />
              </>
            )}
          </>
        )
      }
    >
      {data.length ? (
        <Box px={4}>
          <CustomTable
            heightRow={50}
            header={type === Reserves.ASSET ? suppliedPositionsHead : lpHead}
            data={data}
          />
        </Box>
      ) : (
        <NoContent text='Nothing supplied yet' />
      )}
    </ListWrapper>
  );
};

import { useCallback, useMemo, useState } from 'react';

import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Box, Typography } from '@mui/material';

import { ListWrapper } from '@lendos/ui/components/ListWrapper';
import { CustomTable, TableData } from '@lendos/ui/components/Table';

import { DashboardReserve, FormattedReservesAndIncentives, Reserves } from '@lendos/types/reserves';

import { ListLoader } from '../../../components/ListLoader/index.tsx';
import { WalletEmptyInfo } from '../../../components/WalletEmptyInfo/index.tsx';
import { Warning } from '../../../components/Warning/index.tsx';
import { useBalanceContext } from '../../../providers/BalanceProvider/index.tsx';
import { useModalContext } from '../../../providers/ModalProvider/index.tsx';
import { useReservesContext } from '../../../providers/ReservesProvider/index.tsx';
import { useStateContext } from '../../../providers/StateProvider/index.tsx';
import { DashboardListTopPanel } from '../DashboardListTopPanel.tsx';
import { getSupplyAssetsCells } from '../TableData';
import { supplyAssetsDataByType } from './constants';

interface SupplyAssetsListProps {
  type: Reserves;
}

export const SupplyAssetsList = ({ type }: SupplyAssetsListProps) => {
  const [anchors, setAnchors] = useState<Record<string, null | HTMLElement>>({});

  const showZeroStorageName = supplyAssetsDataByType[type].showZeroStorageName;

  const { currentMarketData, showZero } = useStateContext();
  const { openSupply, openSwitch } = useModalContext();
  const { walletBalances } = useBalanceContext();
  const { reserves, lpReserves, accountSummary, loading } = useReservesContext();
  const showWithZero = showZero[showZeroStorageName];

  const handleSwitchClick = useCallback(
    (reserve: FormattedReservesAndIncentives) => {
      openSwitch(reserve.underlyingAsset);
      setAnchors({});
    },
    [openSwitch, setAnchors],
  );

  const reserveWithBalance = (type === Reserves.ASSET ? reserves : lpReserves).map(reserve => {
    const walletBalance = walletBalances[reserve.underlyingAsset];
    return {
      ...reserve,
      walletBalance: walletBalance?.amount ?? '0',
      walletBalanceUSD: walletBalance?.amountUSD ?? '0',
    };
  });

  const data = useMemo(() => {
    return (reserveWithBalance as FormattedReservesAndIncentives<DashboardReserve>[])
      .filter(reserves => {
        if (showWithZero) {
          return reserves;
        }
        return reserves.walletBalance !== '0';
      })
      .map(reserve => {
        return getSupplyAssetsCells(
          reserve,
          currentMarketData,
          openSupply,
          handleSwitchClick,
          setAnchors,
          anchors[reserve.underlyingAsset] ?? null,
        );
      }) as TableData[];
  }, [reserveWithBalance, currentMarketData, openSupply, handleSwitchClick, anchors, showWithZero]);

  if (loading) {
    return (
      <ListLoader
        head={supplyAssetsDataByType[type].header.map(col => col.title)}
        title={supplyAssetsDataByType[type].title}
        withTopMargin
      />
    );
  }

  return (
    <ListWrapper
      titleComponent={
        <Typography
          component='div'
          variant='h3'
          sx={{ mr: 4, display: 'flex', alignItems: 'center', gap: 1.5 }}
        >
          <PlayCircleIcon sx={{ color: 'primary.light' }} />
          {supplyAssetsDataByType[type].title}
        </Typography>
      }
      storageName={supplyAssetsDataByType[type].collapseStorageName}
      withTopMargin
      noData={Boolean(!data.length)}
      subChildrenComponent={
        <>
          <Box sx={{ px: 5 }}>
            {accountSummary?.isInIsolationMode ? (
              <Warning severity='warning'>
                Collateral usage is limited because of isolation mode.
              </Warning>
            ) : (
              data.length === 0 && <WalletEmptyInfo name={currentMarketData.chain.name} />
            )}
          </Box>
          {data.length >= 1 && <DashboardListTopPanel storageName={showZeroStorageName} />}
        </>
      }
    >
      <CustomTable
        heightRow={50}
        header={supplyAssetsDataByType[type].header}
        data={data}
        paddingColl={1}
      />
    </ListWrapper>
  );
};

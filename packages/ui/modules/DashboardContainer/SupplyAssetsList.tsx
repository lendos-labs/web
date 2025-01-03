import { useCallback, useMemo, useState } from 'react';

import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Typography } from '@mui/material';

import { ListWrapper } from '@lendos/ui/components/ListWrapper';
import { CustomTable, TableData } from '@lendos/ui/components/Table';

import { DashboardReserve, FormattedReservesAndIncentives, Reserves } from '@lendos/types/reserves';

import { useBalanceContext } from '../../providers/BalanceProvider';
import { useModalContext } from '../../providers/ModalProvider';
import { useReservesContext } from '../../providers/ReservesProvider';
import { useStateContext } from '../../providers/StateProvider';
import { dexLpSupplyAssetsHead, getSupplyAssetsCells, supplyAssetsHead } from './TableData.tsx';

interface SupplyAssetsListProps {
  type: Reserves;
}

export const SupplyAssetsList = ({ type }: SupplyAssetsListProps) => {
  const [anchorEl, setAnchorEl] = useState<Record<string, null | HTMLElement>>({});

  const { currentMarketData } = useStateContext();
  const { openSupply, openSwitch } = useModalContext();
  const { walletBalances } = useBalanceContext();
  const { reserves, lpReserves } = useReservesContext();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    setAnchorEl(state => ({ ...state, [id]: event.currentTarget }));
  };

  const handleSwitchClick = useCallback(
    (reserve: FormattedReservesAndIncentives) => {
      openSwitch(reserve.underlyingAsset);
      setAnchorEl({});
    },
    [openSwitch, setAnchorEl],
  );

  const d = (type === Reserves.ASSET ? reserves : lpReserves).map(reserve => {
    const walletBalance = walletBalances[reserve.underlyingAsset];
    return {
      ...reserve,
      walletBalance: walletBalance?.amount ?? '0',
      walletBalanceUSD: walletBalance?.amountUSD ?? '0',
    };
  });

  const data = useMemo(() => {
    return (d as FormattedReservesAndIncentives<DashboardReserve>[]).map(reserve => {
      return getSupplyAssetsCells(
        reserve,
        currentMarketData,
        openSupply,
        handleSwitchClick,
        () => setAnchorEl({}),
        handleClick,
        anchorEl[reserve.underlyingAsset] ?? null,
      );
    }) as TableData[];
  }, [d, currentMarketData, openSupply, handleSwitchClick, anchorEl]);

  return (
    <ListWrapper
      titleComponent={
        <Typography
          component='div'
          variant='h3'
          sx={{ mr: 4, display: 'flex', alignItems: 'center', gap: 1.5 }}
        >
          <PlayCircleIcon sx={{ color: 'primary.light' }} />
          {type === Reserves.ASSET ? 'Assets to supply' : 'LP tokens to supply'}
        </Typography>
      }
      localStorageName='supplyAssetsDashboardTableCollapse'
      withTopMargin
      // noData={supplyDisabled}
      // subChildrenComponent={
      //   <>
      //     <Box sx={{ px: 5 }}>
      //       {user?.isInIsolationMode ? (
      //         <Warning severity='warning'>
      //           <>Collateral usage is limited because of isolation mode.</>
      //         </Warning>
      //       ) : (
      //         filteredSupplyReserves.length === 0 && (
      //           <WalletEmptyInfo name={networkName} bridge={bridge} chainId={currentChainId} />
      //         )
      //       )}
      //     </Box>
      //
      //     {filteredSupplyReserves.length >= 1 && (
      //       <DashboardListTopPanel
      //         value={isShowZeroAssets}
      //         onClick={setIsShowZeroAssets}
      //         localStorageName={localStorageName}
      //         bridge={bridge}
      //       />
      //     )}
      //   </>
      // }
    >
      <CustomTable
        heightRow={50}
        header={type === Reserves.ASSET ? supplyAssetsHead : dexLpSupplyAssetsHead}
        data={data}
        paddingColl={1}
      />
    </ListWrapper>
  );
};

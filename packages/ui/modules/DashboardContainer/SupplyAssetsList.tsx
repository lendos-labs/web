import { ListWrapper } from '@lendos/ui/components/ListWrapper';
import { Typography } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { CustomTable, TableData } from '@lendos/ui/components/Table';
import { DashboardReserve, FormattedReservesAndIncentives, Reserves } from '@lendos/types/reserves';
import { dexLpSupplyAssetsHead, getSupplyAssetsCells, supplyAssetsHead } from './TableData.tsx';
import { dexReserves, reserves } from '@lendos/constants/reserves';
import { useCallback, useMemo, useState } from 'react';
import { useStateContext } from '../../providers/StateProvider';
import { useModalContext } from '../../providers/ModalProvider';
import { useBalanceContext } from '../../providers/BalanceProvider';

interface SupplyAssetsListProps {
  type: Reserves;
}

export const SupplyAssetsList = ({ type }: SupplyAssetsListProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { currentMarketData } = useStateContext();
  const { openSupply, openSwitch } = useModalContext();
  const { walletBalances } = useBalanceContext();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSwitchClick = useCallback(
    (reserve: FormattedReservesAndIncentives) => {
      openSwitch(reserve.underlyingAsset);
      setAnchorEl(null);
    },
    [openSwitch, setAnchorEl],
  );

  const d = (type === Reserves.ASSET ? reserves : dexReserves).map(reserve => {
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
        handleClose,
        handleClick,
        anchorEl,
        open,
      );
    }) as TableData[];
  }, [d, currentMarketData, openSupply, handleSwitchClick, anchorEl, open]);

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

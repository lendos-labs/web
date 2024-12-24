import { ListWrapper } from '@lendos/ui/components/ListWrapper';
import { Box, Typography } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { CustomTable, TableData } from '@lendos/ui/components/Table';
import { FormattedReservesAndIncentives, Reserves, ReserveToken } from '@lendos/types/reserves';
import { getSupplyAssetsCells, supplyAssetsHead } from './TableData.tsx';
import { reserves } from '@lendos/constants/reserves';
import { useCallback, useMemo, useState } from 'react';
import { useStateContext } from '../../providers/StateProvider';
import { useModalContext } from '../../providers/ModalProvider';

interface SupplyAssetsListProps {
  type: Reserves;
}

export const SupplyAssetsList = ({ type }: SupplyAssetsListProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { currentMarketData } = useStateContext();
  const { openSupply, openSwitch } = useModalContext();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSwitchClick = useCallback(
    (reserve: FormattedReservesAndIncentives<ReserveToken>) => {
      openSwitch(reserve.underlyingAsset);
      setAnchorEl(null);
    },
    [openSwitch, setAnchorEl], // Залежності, від яких залежить функція
  );

  const data = useMemo(() => {
    return reserves.map(reserve => {
      // const wrappedToken = wrappedTokenReserves.find(
      //   r => r.tokenOut.underlyingAsset === underlyingAsset,
      // );
      //
      // const canSupplyAsWrappedToken =
      //   wrappedToken &&
      //   walletBalances[wrappedToken.tokenIn.underlyingAsset.toLowerCase()].amount !== '0';

      return getSupplyAssetsCells(
        reserve,
        currentMarketData,
        openSupply,
        handleSwitchClick,
        handleClose,
        handleClick,
        anchorEl,
        open,
        // canSupplyAsWrappedToken,
      );
    }) as TableData[];
  }, [currentMarketData, openSupply, handleSwitchClick, anchorEl, open]);

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
      <Box px={4}>
        <CustomTable heightRow={50} header={supplyAssetsHead} data={data} />
      </Box>
    </ListWrapper>
  );
};

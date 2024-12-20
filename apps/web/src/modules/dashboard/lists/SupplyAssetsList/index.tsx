import { ListWrapper } from '@lendos/ui/components/ListWrapper';
import { Box, Typography } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { CustomTable, TableHeadProperties } from '@lendos/ui/components/Table';
import React from 'react';

interface SupplyAssetsListProps {
  type: 'asset' | 'pl'; // Reserves TODO: Fix typo;
}

const collateralHeader: TableHeadProperties[] = [
  {
    key: 'symbol',
    title: 'Assets',
    sortKey: 'symbol',
  },
  {
    key: 'walletBalance',
    title: 'Wallet balance',
    sortKey: 'walletBalance',
  },
  {
    key: 'supplyAPY',
    title: 'APY',
    sortKey: 'supplyAPY',
  },
  {
    key: 'usageAsCollateralEnabledOnUser',
    title: 'Can be collateral',
  },
  {
    key: 'actions',
    title: '',
  },
];

export const SupplyAssetsList = ({ type }: SupplyAssetsListProps) => {
  return (
    <ListWrapper
      titleComponent={
        <Typography
          component='div'
          variant='h3'
          sx={{ mr: 4, display: 'flex', alignItems: 'center', gap: 1.5 }}
        >
          <PlayCircleIcon sx={{ color: 'primary.light' }} />
          {type === 'asset' ? 'Assets to supply' : 'LP tokens to supply'}
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
        <CustomTable
          heightRow={50}
          header={collateralHeader}
          data={[
            {
              symbol: 'ETH',
              walletBalance: '2',
              supplyAPY: '0.05%',
              usageAsCollateralEnabledOnUser: true,
            },
            {
              symbol: 'USDC',
              walletBalance: '7',
              supplyAPY: '0.02%',
              usageAsCollateralEnabledOnUser: true,
            },
            {
              symbol: 'USDT',
              walletBalance: '5',
              supplyAPY: '0.09%',
              usageAsCollateralEnabledOnUser: true,
            },
            {
              symbol: 'DAI',
              walletBalance: '6',
              supplyAPY: '0.05%',
              usageAsCollateralEnabledOnUser: false,
            },
          ]}
        />
      </Box>
    </ListWrapper>
  );
};

import { Box, useMediaQuery, useTheme } from '@mui/material';

import { Reserves } from '@lendos/types/reserves';

import { isFeatureEnabled } from '@lendos/constants/markets';

import { useStateContext } from '../../providers/StateProvider';
import { BorrowAssetsList } from './BorrowAssetsList.tsx';
import { BorrowedPositionsList } from './BorrowedPositionsList.tsx';
import { SuppliedPositionsList } from './SuppliedPositionsList.tsx';
import { SupplyAssetsList } from './SupplyAssetsList.tsx';

interface DashboardContentWrapperProps {
  isBorrow: boolean;
}

export const DashboardContentWrapper = ({ isBorrow }: DashboardContentWrapperProps) => {
  const { breakpoints } = useTheme();
  const { currentMarketData } = useStateContext();

  const isDesktop = useMediaQuery(breakpoints.up('lg'));
  const paperWidth = isDesktop ? 'calc(50% - 8px)' : '100%';
  const isDexLp = isFeatureEnabled.dexLp(currentMarketData);

  return (
    <Box
      sx={{
        display: isDesktop ? 'flex' : 'block',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}
    >
      <Box
        sx={{
          position: 'relative',

          display: { xs: isBorrow ? 'none' : 'block', lg: 'block' },
          width: paperWidth,
        }}
      >
        <SuppliedPositionsList type={Reserves.ASSET} />
        {isDexLp && (
          <Box sx={{ mt: 4 }}>
            <SuppliedPositionsList type={Reserves.LP} />
          </Box>
        )}
        <SupplyAssetsList type={Reserves.ASSET} />
        {isDexLp && <SupplyAssetsList type={Reserves.LP} />}
      </Box>

      <Box
        sx={{
          position: 'relative',
          display: { xs: !isBorrow ? 'none' : 'block', lg: 'block' },
          width: paperWidth,
        }}
      >
        <BorrowedPositionsList />
        <BorrowAssetsList />
      </Box>
    </Box>
  );
};

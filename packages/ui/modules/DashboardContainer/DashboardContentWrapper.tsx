import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Reserves } from '@lendos/types/reserves';
import { SupplyAssetsList } from './SupplyAssetsList.tsx';
import { SuppliedPositionsList } from './SuppliedPositionsList.tsx';
import { BorrowedPositionsList } from './BorrowedPositionsList.tsx';
import { BorrowAssetsList } from './BorrowAssetsList.tsx';

interface DashboardContentWrapperProps {
  isBorrow: boolean;
}

export const DashboardContentWrapper = ({ isBorrow }: DashboardContentWrapperProps) => {
  const { breakpoints } = useTheme();

  const isDesktop = useMediaQuery(breakpoints.up('lg'));
  const paperWidth = isDesktop ? 'calc(50% - 8px)' : '100%';

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
        {/* {isDexLp && (*/}
        {/*  <Box sx={{ mt: 4 }}>*/}
        {/*    <SuppliedPositionsList type={Reserves.LP} />*/}
        {/*  </Box>*/}
        {/* )}*/}
        <SupplyAssetsList type={Reserves.ASSET} />
        {/* {isDexLp && <SupplyAssetsList type={Reserves.LP} />}*/}
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

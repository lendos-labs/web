import { Box } from '@mui/material';

import { Reserves } from '@lendos/types/reserves';

import { isFeatureEnabled } from '@lendos/constants/markets';

import { useStateContext } from '../../providers/StateProvider';
import { BorrowAssetsList } from './BorrowAssetsList';
import { BorrowedPositionsList } from './BorrowedPositionsList';
import { SuppliedPositionsList } from './SuppliedPositionsList';
import { SupplyAssetsList } from './SupplyAssetsList';

interface DashboardContentWrapperProps {
  isBorrow: boolean;
}

export const DashboardContentWrapper = ({ isBorrow }: DashboardContentWrapperProps) => {
  const { currentMarketData } = useStateContext();

  const isDexLp = isFeatureEnabled.dexLp(currentMarketData);

  return (
    <Box
      sx={theme => ({
        [theme.breakpoints.up('lg')]: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        },
        display: 'block',
      })}
    >
      <Box
        sx={theme => ({
          position: 'relative',

          display: { xs: isBorrow ? 'none' : 'block', lg: 'block' },
          width: 'calc(50% - 8px)',
          [theme.breakpoints.down('lg')]: {
            width: '100%',
          },
        })}
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
        sx={theme => ({
          position: 'relative',
          display: { xs: !isBorrow ? 'none' : 'block', lg: 'block' },
          width: 'calc(50% - 8px)',
          [theme.breakpoints.down('lg')]: {
            width: '100%',
          },
        })}
      >
        <BorrowedPositionsList />
        <BorrowAssetsList />
      </Box>
    </Box>
  );
};

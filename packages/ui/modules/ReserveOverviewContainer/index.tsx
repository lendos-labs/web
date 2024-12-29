import { FormattedReservesAndIncentives } from '@lendos/types/reserves';
import { AssetCapsProvider } from '../../providers/AssetCapsProvider';
import { ReserveTopDetailsWrapper } from './ReserveTopDetailsWrapper';
import { ContentContainer } from '../../components/ContentContainer';
import { Box } from '@mui/material';
import { Mode, OverviewTab } from './OverviewTab';
import { useState } from 'react';
import { ReserveConfigurationWrapper } from './ReserveConfigurationWrapper';

export const ReserveOverviewContainer = ({
  reserve,
  loading,
}: {
  reserve: FormattedReservesAndIncentives;
  loading: boolean;
}) => {
  const [mode, setMode] = useState<Mode>(Mode.overview);

  const isOverview = mode === Mode.overview;
  return (
    <AssetCapsProvider asset={reserve}>
      <ReserveTopDetailsWrapper reserve={reserve} loading={loading} />
      <ContentContainer>
        <Box
          sx={{
            display: { xs: 'flex', lg: 'none' },
            justifyContent: { xs: 'center', xsm: 'flex-start' },
            mb: { xs: 3, xsm: 4 },
          }}
        >
          <OverviewTab mode={mode} setMode={setMode} />
        </Box>

        <Box sx={{ display: 'flex' }}>
          <Box
            sx={{
              display: { xs: !isOverview ? 'none' : 'block', lg: 'block' },
              width: { xs: '100%', lg: 'calc(100% - 432px)' },
              mr: { xs: 0, lg: 4 },
            }}
          >
            <ReserveConfigurationWrapper reserve={reserve} />
          </Box>

          <Box
            sx={{
              display: { xs: isOverview ? 'none' : 'block', lg: 'block' },
              width: { xs: '100%', lg: '416px' },
            }}
          >
            {/* <ReserveActions reserve={reserve} /> */}
          </Box>
        </Box>
      </ContentContainer>
    </AssetCapsProvider>
  );
};

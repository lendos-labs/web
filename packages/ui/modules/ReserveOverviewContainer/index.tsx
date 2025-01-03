'use client';

import { useState } from 'react';

import { Box } from '@mui/material';

import { FormattedReservesAndIncentives } from '@lendos/types/reserves';

import { ContentContainer } from '../../components/ContentContainer';
import { AssetCapsProvider } from '../../providers/AssetCapsProvider';
import { Mode, OverviewTab } from './OverviewTab';
import { ReserveActions } from './ReserveActions';
import { ReserveConfigurationWrapper } from './ReserveConfigurationWrapper';
import { ReserveTopDetailsWrapper } from './ReserveTopDetailsWrapper';

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
            <ReserveActions reserve={reserve} />
          </Box>
        </Box>
      </ContentContainer>
    </AssetCapsProvider>
  );
};

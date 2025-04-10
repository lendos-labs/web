'use client';

import { useState } from 'react';

import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

import { ConnectWalletPaper } from '../../components/ConnectWalletPaper';
import { ContentContainer } from '../../components/ContentContainer';
import StyledToggleGroup from '../../components/StyledToggleButtonGroup';
import StyledToggleButton from '../../components/StyledToggleTabButton';
import { useAccountContext } from '../../providers/AccountProvider';
import { DashboardContentWrapper } from './DashboardContentWrapper.tsx';
import DashboardTopPanel from './DashboardTopPanel.tsx';

const DashboardContainer = () => {
  const { account, loading } = useAccountContext();
  const [mode, setMode] = useState<'supply' | 'borrow' | ''>('supply');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 18, md: 20, lg: '56px' },
      }}
    >
      <DashboardTopPanel />
      <ContentContainer>
        {account && (
          <Box
            sx={{
              display: { xs: 'flex', lg: 'none' },
              justifyContent: { xs: 'center', xsm: 'flex-start' },
              mb: { xs: 3, xsm: 4 },
              mt: { xs: 10, xsm: 0 },
            }}
          >
            <StyledToggleGroup
              color='primary'
              value={mode}
              exclusive
              onChange={(_, value: 'supply' | 'borrow') => setMode(value)}
              sx={{ width: { xs: '100%', xsm: '359px' } }}
            >
              <StyledToggleButton value='supply' disabled={mode === 'supply'}>
                <Typography variant='subheader1'>Supply</Typography>
              </StyledToggleButton>
              <StyledToggleButton value='borrow' disabled={mode === 'borrow'}>
                <Typography variant='subheader1'>Borrow</Typography>
              </StyledToggleButton>
            </StyledToggleGroup>
          </Box>
        )}

        {account ? (
          <DashboardContentWrapper isBorrow={mode === 'borrow'} />
        ) : (
          <ConnectWalletPaper loading={loading} />
        )}
      </ContentContainer>
    </Box>
  );
};

export default DashboardContainer;

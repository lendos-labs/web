'use client';

import { ContentContainer } from '../../components/ContentContainer';
import { useAccountContext } from '../../providers/AccountProvider';
import { Box } from '@mui/material';
import StyledToggleButton from '../../components/StyledToggleTabButton';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import StyledToggleGroup from '../../components/StyledToggleButtonGroup';
import DashboardTopPanel from './DashboardTopPanel.tsx';
import { ConnectWalletPaper } from '../../components/ConnectWalletPaper';
import { DashboardContentWrapper } from './DashboardContentWrapper.tsx';

const DashboardContainer = () => {
  const { account, loading: web3Loading } = useAccountContext();
  const [mode, setMode] = useState<'supply' | 'borrow' | ''>('supply');

  return (
    <>
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
          <ConnectWalletPaper loading={web3Loading} />
        )}
      </ContentContainer>
    </>
  );
};

export default DashboardContainer;

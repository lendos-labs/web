import { ReactNode } from 'react';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Typography } from '@mui/material';

import { useStateContext } from '../../providers/StateProvider';
import { MarketLogo } from '../MarketLogo';
import { NetworkSwitcher } from './NetworkSwitcher';

export interface PageTitleProps {
  pageTitle?: ReactNode;
  withMarketSwitcher?: boolean;
}

export const PageTitle = ({ pageTitle, withMarketSwitcher }: PageTitleProps) => {
  const { currentMarketData, currentNetworkData } = useStateContext();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: { xs: 'flex-start', xsm: 'center' },
        mb: pageTitle ? 4 : 0,
        flexDirection: { xs: 'column', xsm: 'row' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          mb: !pageTitle ? 4 : 0,
        }}
      >
        {withMarketSwitcher && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <MarketLogo
              size={theme => (theme.breakpoints.down('sm') ? 28 : 40)}
              sx={{
                mr: 0,
              }}
              logo={currentNetworkData.networkLogoPath}
            />
            <Box sx={{ display: 'inline-flex', alignItems: 'flex-start' }}>
              <Typography
                variant={'h1'}
                sx={theme => ({
                  color: theme.palette.text.dark,
                  mr: 1,
                })}
              >
                {currentMarketData.marketTitle}
              </Typography>
            </Box>
            <NetworkSwitcher />
            {currentMarketData.isTestnet && (
              <Typography
                variant='buttonS'
                sx={theme => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  py: 1.5,
                  px: 2.5,
                  borderRadius: 1,
                  text: 'text.white',
                  bgcolor: theme.palette.mode === 'dark' ? 'primary.light' : 'primary.main',
                })}
              >
                <InfoOutlinedIcon sx={{ fontSize: '18px' }} />
                Testnet
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

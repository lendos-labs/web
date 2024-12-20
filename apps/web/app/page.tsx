'use client';

import React from 'react';
import { ContentContainer } from '@lendos/ui/components/ContentContainer';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { SupplyAssetsList } from '../src/modules/dashboard/lists/SupplyAssetsList';

interface DashboardContentWrapperProps {
  isBorrow: boolean;
}

const Home = ({ isBorrow }: DashboardContentWrapperProps) => {
  const { breakpoints } = useTheme();

  const isDesktop = useMediaQuery(breakpoints.up('lg'));
  const paperWidth = isDesktop ? 'calc(50% - 8px)' : '100%';
  return (
    <ContentContainer>
      <Box
        display={isDesktop ? 'flex' : 'block'}
        justifyContent='space-between'
        alignItems='flex-start'
        width='100%'
      >
        <Box
          sx={{
            position: 'relative',

            display: { xs: isBorrow ? 'none' : 'block', lg: 'block' },
            width: paperWidth,
          }}
        >
          <SupplyAssetsList type='asset' />
        </Box>
      </Box>
    </ContentContainer>
  );
};

export default Home;

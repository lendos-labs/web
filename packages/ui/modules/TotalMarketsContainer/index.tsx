'use client';

import { Box } from '@mui/material';

import { TotalFormatReserveWithMarkets } from '@lendos/types/reserves';

import { useStateContext } from '../../providers/StateProvider';
import TotalAssetsListContainer from './TotalAssetsListContainer.tsx';
import { TotalContainer } from './TotalContainer.tsx';
import { TotalTopPanel } from './TotalTopPanel.tsx';

const TotalMarketsContainer = () => {
  const data = [] as TotalFormatReserveWithMarkets[];
  const { availableMarkets } = useStateContext();
  const marketsData = availableMarkets;
  return (
    <>
      <TotalTopPanel reserves={data} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flex: 1,
          mt: { xs: '-32px', lg: '-46px', xl: '-44px', xxl: '-48px' },
        }}
      >
        <TotalContainer>
          <TotalAssetsListContainer reserves={data} marketsData={marketsData} />
        </TotalContainer>
      </Box>
    </>
  );
};

export default TotalMarketsContainer;

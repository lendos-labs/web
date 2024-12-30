'use client';

import { TotalContainer } from './TotalContainer.tsx';
import { Box } from '@mui/material';
import { TotalTopPanel } from './TotalTopPanel.tsx';
import { totalData } from '@lendos/constants/reserves';
import TotalAssetsListContainer from './TotalAssetsListContainer.tsx';
import { useStateContext } from '../../providers/StateProvider';

const TotalMarketsContainer = (
  {
    // data,
    // marketsData,
  }: Readonly<{
    // data: TotalFormatReserveWithMarkets[];
    // marketsData: MarketDataType[];
  }>,
) => {
  const data = totalData;
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

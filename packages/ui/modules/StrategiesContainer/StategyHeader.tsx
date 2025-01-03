import { Box, Typography } from '@mui/material';

import { MarketLogo } from '../../components/MarketLogo';
import { TokenIcon } from '../../components/TokenIcon';
import { useStateContext } from '../../providers/StateProvider';
import { Pair } from './types.ts';

export const StategyHeader = ({ pair }: { pair: Pair }) => {
  const { currentMarketData, currentNetworkData } = useStateContext();

  return (
    <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
      <TokenIcon symbol={`${pair.lend.symbol}_${pair.borrow.symbol}`} fontSize='large' />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <Typography variant='h2'>{pair.name}</Typography>
        <Box sx={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <MarketLogo sx={{ mr: 0 }} size={16} logo={currentNetworkData.networkLogoPath} />
          <Typography variant='description' fontFamily='Aldrich'>
            {currentMarketData.marketTitle}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

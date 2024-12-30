import { Box, Button, Paper, Typography } from '@mui/material';
import { Pair } from './types';
import { Dispatch, SetStateAction } from 'react';
import { StategyHeader } from './StategyHeader';

export const StarategyCard = ({
  pair,
  setSelectedPair,
}: {
  pair: Pair;
  setSelectedPair: Dispatch<SetStateAction<Pair | undefined>>;
}) => {
  const maxLeverage = 1 / (1 - Number(pair.lend.formattedBaseLTVasCollateral));
  const supplyAPY = Number(pair.lend.supplyAPY) * 100;
  const borrowAPY = Number(pair.borrow.variableBorrowAPY) * 100;
  const maxDebtRatio = 1 - 1 / maxLeverage;
  const maxRoe = (supplyAPY - borrowAPY * maxDebtRatio) * maxLeverage;

  // const maxPoints = 0;

  return (
    <Paper
      sx={{
        padding: theme => theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      <StategyHeader pair={pair} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Typography variant='h3'>Max ROE</Typography>
          <Typography variant='description' sx={{ fontFamily: 'Aldrich' }}>
            {maxRoe.toFixed(2)}%
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Typography variant='h3'>Max Leverage</Typography>
          <Typography variant='description' sx={{ fontFamily: 'Aldrich' }}>
            {maxLeverage.toFixed(2)}x
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Typography variant='h3'>Max Amount</Typography>
          <Typography variant='description' sx={{ fontFamily: 'Aldrich' }}>
            -
          </Typography>
        </Box>
        {/* {maxPoints && (*/}
        {/*  <Box*/}
        {/*    sx={{*/}
        {/*      display: 'flex',*/}
        {/*      alignItems: 'center',*/}
        {/*      justifyContent: 'space-between',*/}
        {/*      width: '100%',*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    <Typography variant='h3'>Max Points</Typography>*/}
        {/*    <Typography variant='description' sx={{ fontFamily: 'Aldrich' }}>*/}
        {/*      {maxPoints}*/}
        {/*    </Typography>*/}
        {/*  </Box>*/}
        {/* )}*/}
      </Box>
      <Button
        onClick={() => setSelectedPair(pair)}
        variant='contained'
        size='medium'
        sx={{ width: '100%' }}
      >
        Submit Loop
      </Button>
    </Paper>
  );
};

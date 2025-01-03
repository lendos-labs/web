import { Box, Paper, Typography } from '@mui/material';

import { Pair } from './types.ts';

export const GeneralInfo = ({
  margin,
  pair,
  leverage,
  liquidationPrice,
  markPrice,
  liquidationBuffer,
  roe,
}: {
  margin: string;
  pair: Pair;
  leverage: number;
  liquidationPrice: number;
  markPrice: number;
  liquidationBuffer: number;
  roe: number;
}) => {
  return (
    <Paper
      sx={{
        padding: theme => theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <Box
        sx={theme => ({
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          pb: 5,
          borderBottom: '1px solid',
          borderColor: theme.palette.border.grey,
        })}
      >
        <Typography variant='h2' pb={4}>
          General Info
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='h3'>Chain</Typography>
          <Typography variant='h3'>Hemi</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='h3'>Pair</Typography>
          <Typography variant='h3'>{pair.name}</Typography>
        </Box>
      </Box>
      <Box
        sx={theme => ({
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          pb: 5,
          borderBottom: '1px solid',
          borderColor: theme.palette.border.grey,
        })}
      >
        <Typography variant='h2' pb={4}>
          Final State
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='h3'>Value</Typography>
          <Typography variant='h3'>
            {Number(margin).toFixed(2)} {pair.borrow.symbol}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='h3'>Leverage</Typography>
          <Typography variant='h3'>{leverage}x</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='h3'>ROE</Typography>
          <Typography variant='h3'>{roe.toFixed(2)}%</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant='h2' pb={4}>
          Liquidation Info
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='h3'>Liquidation Price</Typography>
          <Typography variant='h3'>
            {liquidationPrice ? liquidationPrice.toFixed(2) : '-'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='h3'>Current Price</Typography>
          <Typography variant='h3'>{markPrice.toFixed(2)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='h3'>Liquidation Buffer</Typography>
          <Typography variant='h3'>{liquidationBuffer.toFixed(2)}%</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

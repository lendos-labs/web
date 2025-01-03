import dynamic from 'next/dynamic';

import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Box, Paper, Typography } from '@mui/material';

import { FormattedReservesAndIncentives } from '@lendos/types/reserves';

interface ReserveConfigurationProps {
  reserve: FormattedReservesAndIncentives;
}

const ReserveConfiguration = dynamic(() =>
  import('./ReserveConfiguration').then(module => module.ReserveConfiguration),
);

export const ReserveConfigurationWrapper: React.FC<ReserveConfigurationProps> = ({ reserve }) => {
  return (
    <Paper
      sx={theme => ({
        pt: 4,
        pb: 20,
        px: 6,
        [theme.breakpoints.down('xsm')]: {
          px: 4,
        },
      })}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          flexWrap: 'wrap',
          mb: reserve.isFrozen ? '0px' : '36px',
        }}
      >
        <Typography
          component='h2'
          variant='h2'
          sx={{ mr: 4, display: 'flex', alignItems: 'center', gap: 1.5 }}
        >
          <PlayCircleIcon sx={{ color: 'primary.light' }} />
          Reserve status &#38; configuration
        </Typography>
      </Box>

      <ReserveConfiguration reserve={reserve} />
    </Paper>
  );
};

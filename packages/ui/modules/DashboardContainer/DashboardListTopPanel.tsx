'use client';

import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';

import { CookieKey } from '@lendos/constants/cookie';

import { useStateContext } from '../../providers/StateProvider';

interface DashboardListTopPanelProps {
  storageName: CookieKey.SHOW_ZERO_ASSETS | CookieKey.SHOW_ZERO_LPS;
}

export const DashboardListTopPanel = ({ storageName }: DashboardListTopPanelProps) => {
  const { showZero, setShowZero } = useStateContext();
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: { xs: 'flex-start', xsm: 'center' },
        justifyContent: 'space-between',
        flexDirection: { xs: 'column-reverse', xsm: 'row' },
        px: { xs: 4, xsm: 6 },
        py: 2,
        pl: { xs: '18px', xsm: '27px' },
      }}
    >
      <FormControlLabel
        sx={{ mt: { xs: 0, xsm: 0 } }}
        control={
          <Checkbox
            sx={{
              p: '6px',
            }}
          />
        }
        checked={showZero[storageName]}
        onChange={() => {
          setShowZero(storageName);
        }}
        label={<Typography variant={'h3'}>Show assets with 0 balance</Typography>}
      />
    </Box>
  );
};

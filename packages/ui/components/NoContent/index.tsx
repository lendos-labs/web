import { ReactNode } from 'react';

import { Box, Typography } from '@mui/material';

interface NoDataProps {
  text: ReactNode;
}

export const NoContent = ({ text }: NoDataProps) => {
  return (
    <Box sx={{ px: { xs: 4, xsm: 6 }, pt: { xs: 3.5, xsm: 5.5 }, pb: { xs: 6, sxm: 7 } }}>
      <Typography color='text.secondary'>{text}</Typography>
    </Box>
  );
};

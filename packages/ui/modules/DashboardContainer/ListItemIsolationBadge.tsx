import { ReactNode } from 'react';

import { Box } from '@mui/material';

import { IsolatedEnabledBadge } from '../../components/IsolatedBadge';

interface ListItemIsolationBadgeProps {
  children: ReactNode;
}

export const ListItemIsolationBadge = ({ children }: ListItemIsolationBadgeProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: { xs: 'flex-end', xsm: 'center' },
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      {children}
      <IsolatedEnabledBadge />
    </Box>
  );
};

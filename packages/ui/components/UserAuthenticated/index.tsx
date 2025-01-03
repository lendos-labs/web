import { ReactNode } from 'react';

import { Box, CircularProgress } from '@mui/material';
import invariant from 'tiny-invariant';

import { ExtendedFormattedUser } from '@lendos/types/user';

import { useReservesContext } from '../../providers/ReservesProvider';

interface UserAuthenticatedProps {
  children: (user: ExtendedFormattedUser) => ReactNode;
}

export const UserAuthenticated = ({ children }: UserAuthenticatedProps) => {
  const { accountSummary, loading } = useReservesContext();

  if (loading) {
    return (
      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress sx={{ color: 'text.primary' }} />
      </Box>
    );
  }
  invariant(accountSummary, 'User data loaded but no user found');

  return <>{children(accountSummary)}</>;
};

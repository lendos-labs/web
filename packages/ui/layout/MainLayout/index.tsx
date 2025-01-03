import { ReactNode } from 'react';

import { Box } from '@mui/material';

import { BorrowModal } from '../../modals/BorrowModal';
import { RepayModal } from '../../modals/RepayModal';
import { SupplyModal } from '../../modals/SupplyModal';
import { WithdrawModal } from '../../modals/WithdrawModal';
import { Footer } from './Footer';
import { Header } from './Header';

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <Box
        component='main'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          background: theme => theme.palette.gradients.body,
        }}
      >
        {children}
      </Box>

      <Footer />

      <SupplyModal />
      <RepayModal />
      <BorrowModal />
      <WithdrawModal />
    </>
  );
};

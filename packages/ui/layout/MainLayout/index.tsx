import { Box } from '@mui/material';
import { Header } from './Header';
import { ReactNode } from 'react';
import { Footer } from './Footer';
import { SupplyModal } from '../../modals/SupplyModal';
import { RepayModal } from '../../modals/RepayModal';
import { BorrowModal } from '../../modals/BorrowModal';

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
    </>
  );
};

import { Box } from '@mui/material';
import { Header } from './Header';
import { ReactNode } from 'react';
import { Footer } from './Footer';

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
      {/* <FeedbackModal /> */}
    </>
  );
};

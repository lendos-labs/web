import { Box } from '@mui/material';
import { Header } from './Header';
import { ReactNode } from 'react';

export const MainLayout = ({
  children,
  connectBtn,
}: {
  children: ReactNode;
  connectBtn: ReactNode;
}) => {
  return (
    <>
      <Header connectBtn={connectBtn} />
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

      {/* <AppFooter />
      <FeedbackModal /> */}
    </>
  );
};

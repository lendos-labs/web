import { ReactNode } from 'react';

import { Box, Container } from '@mui/material';

interface ContentContainerProps {
  children: ReactNode;
}

export const ContentContainer = ({ children }: ContentContainerProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}
    >
      <Container>{children}</Container>
    </Box>
  );
};

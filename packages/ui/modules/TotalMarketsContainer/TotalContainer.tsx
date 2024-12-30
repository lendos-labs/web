import { PropsWithChildren } from 'react';
import { Container, SxProps } from '@mui/material';

export const totalContainerProps = {
  sx: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    pb: '39px',
    px: {
      xs: 2,
      xsm: 5,
      sm: 12,
      md: 5,
      lg: 0,
      xl: '96px',
      xxl: 0,
    },
    maxWidth: {
      xs: 'unset',
      lg: '1240px',
      xl: 'unset',
      xxl: '1440px',
    },
  },
};

interface TotalContainerProps extends PropsWithChildren {
  sx?: SxProps;
}

export const TotalContainer = ({ children, sx }: TotalContainerProps) => {
  return (
    <Container {...totalContainerProps} sx={sx}>
      {children}
    </Container>
  );
};

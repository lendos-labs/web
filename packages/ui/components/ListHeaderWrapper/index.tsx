import { ReactNode } from 'react';

import { Box, BoxProps } from '@mui/material';

export type ListHeaderWrapperMx = 0 | 4 | 5 | 6;

export interface ListHeaderWrapperProps extends BoxProps {
  mx?: ListHeaderWrapperMx;
  children: ReactNode;
}

export const ListHeaderWrapper = ({ mx = 5, children, ...rest }: ListHeaderWrapperProps) => {
  return (
    <Box
      {...rest}
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        mx,
        pt: 4,
        pb: 1,
        position: 'sticky',
        top: 0,
        zIndex: 100,
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: theme => theme.palette.border.grey,
        ...rest.sx,
      }}
    >
      {children}
    </Box>
  );
};

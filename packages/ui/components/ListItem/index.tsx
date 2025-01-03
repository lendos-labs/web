import { ReactNode } from 'react';

import { Box, BoxProps } from '@mui/material';

interface ListItemProps extends BoxProps {
  children: ReactNode;
  minHeight?: number;
  mx?: number;
  button?: boolean;
}

export const ListItem = ({ children, minHeight = 50, mx = 5, button, ...rest }: ListItemProps) => {
  return (
    <Box
      {...rest}
      sx={{
        display: 'flex',
        alignItems: 'center',
        minHeight,
        mx,
        '&:not(:last-child)': {
          borderBottom: '1px solid',
          borderColor: theme => theme.palette.border.grey,
        },
        ...(button ? { '&:hover': { bgcolor: 'action.hover' } } : {}),
        ...rest.sx,
      }}
    >
      {children}
    </Box>
  );
};

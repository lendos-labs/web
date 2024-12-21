import { Box, BoxProps } from '@mui/material';
import { ReactNode } from 'react';

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

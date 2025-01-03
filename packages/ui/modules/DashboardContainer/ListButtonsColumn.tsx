import { ReactNode } from 'react';

import { Box } from '@mui/material';

interface ListButtonsColumnProps {
  children?: ReactNode;
  isColumnHeader?: boolean;
}

export const ListButtonsColumn = ({ children, isColumnHeader = false }: ListButtonsColumnProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        maxWidth: { xs: '100%', md: 160 },
        minWidth: { xs: '100%', md: 160 },
        flex: isColumnHeader ? 1 : 1,
        gap: '6px',
      }}
    >
      {children}
    </Box>
  );
};

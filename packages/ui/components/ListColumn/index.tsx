import { ReactNode } from 'react';

import { Box } from '@mui/material';

export interface ListColumnProps {
  children?: ReactNode;
  maxWidth?: number;
  minWidth?: number;
  isRow?: boolean;
  align?: 'flex-start' | 'center' | 'flex-end';
  overFlow?: 'hidden' | 'visible';
  flex?: string | number;
  p?: string | number;
}

export const ListColumn = ({
  isRow,
  children,
  minWidth,
  maxWidth,
  align = 'center',
  overFlow = 'visible',
  flex = 1,
  p = 1,
}: ListColumnProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isRow ? 'row' : 'column',
        alignItems: isRow ? 'center' : align,
        justifyContent: isRow ? 'flex-start' : 'flex-end',
        flex,
        minWidth: minWidth ?? '50px',
        maxWidth,
        overflow: overFlow,
        padding: p,
      }}
    >
      {children}
    </Box>
  );
};

import { Typography } from '@mui/material';
import { ReactNode } from 'react';

export interface TxModalTitleProps {
  title: ReactNode;
  symbol?: string;
}

export const TxModalTitle = ({ title, symbol }: TxModalTitleProps) => {
  return (
    <Typography
      variant='h2'
      color='text.primary'
      sx={theme => ({
        pb: 5,
        mb: 6,
        borderBottom: `1px solid ${theme.palette.border.grey}`,
      })}
    >
      {title} {symbol ?? ''}
    </Typography>
  );
};

import { ReactNode } from 'react';

import { Paper, Typography } from '@mui/material';

import { FormattedNumber } from '../FormattedNumber';

interface ListTopInfoItemProps {
  title: ReactNode;
  value: number | string;
  percent?: boolean;
  tooltip?: ReactNode;
}

export const ListTopInfoItem = ({ title, value, percent, tooltip }: ListTopInfoItemProps) => {
  return (
    <Paper
      variant='outlined'
      sx={{
        mr: 2,
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        bgcolor: theme => theme.palette.background.white,
        borderColor: '#061A3B',
      }}
    >
      <Typography variant='numberS' color={'text.dark'} sx={{ mr: 1 }} noWrap>
        {title}
      </Typography>
      <FormattedNumber value={value} percent={percent} variant='numberS' symbol='USD' />
      {tooltip}
    </Paper>
  );
};

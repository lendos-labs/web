import type { ElementType } from 'react';

import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import type { TypographyProps } from '@mui/material/Typography/Typography';

import { FormattedNumber } from '../FormattedNumber';

type ReserveSubheaderProps = TypographyProps<ElementType, { component?: ElementType }> & {
  value: string;
  rightAlign?: boolean;
};

export function ReserveSubheader({ value, rightAlign, variant, color }: ReserveSubheaderProps) {
  return (
    <Box
      sx={{
        p: rightAlign ? { xs: '0', xsm: '2px 0' } : { xs: '0', xsm: '3.625px 0px' },
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {value === 'Disabled' ? (
        <Typography component='span' sx={{ mr: 0.5 }} variant='numberS' color='primary'>
          Disabled
        </Typography>
      ) : (
        <FormattedNumber
          compact
          value={value}
          variant={variant ?? 'subtitle'}
          color={color ?? 'text.dark'}
          symbolsVariant={variant ?? 'subtitle'}
          symbolsColor={(color as string) || 'text.dark'}
          symbol='USD'
        />
      )}
    </Box>
  );
}

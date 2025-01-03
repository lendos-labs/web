import { ReactNode } from 'react';

import { Box, Typography } from '@mui/material';

import { ReserveIncentiveResponse } from '@lendos/types/reserves';

import { FormattedNumber } from '../FormattedNumber';
import { IncentivesButton } from '../IncentivesButton';

interface IncentivesCardProps {
  symbol: string;
  value: string | number;
  incentives?: ReserveIncentiveResponse[];
  variant?: 'main14' | 'main16' | 'secondary14' | 'numberS' | 'subtitle' | 'h3';
  symbolsVariant?: 'secondary14' | 'secondary16' | 'numberS' | 'subtitle' | 'h3';
  align?: 'center' | 'flex-end';
  color?: string;
  tooltip?: ReactNode;
}

export const IncentivesCard = ({
  symbol,
  value,
  incentives,
  variant = 'secondary14',
  symbolsVariant,
  align,
  color,
  tooltip,
}: IncentivesCardProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: align ?? { xs: 'flex-end', xsm: 'center' },
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      {value.toString() !== '-1' ? (
        <Box sx={{ display: 'flex' }}>
          <FormattedNumber
            data-cy={`apy`}
            value={value}
            percent
            variant={variant}
            symbolsVariant={symbolsVariant}
            color={color ?? 'text.dark'}
            symbolsColor={color ?? 'text.dark'}
          />
          {tooltip}
        </Box>
      ) : (
        <Typography variant={variant} color={color ?? 'text.dark'}>
          —
        </Typography>
      )}

      <IncentivesButton incentives={incentives} symbol={symbol} />
    </Box>
  );
};

import type { ElementType } from 'react';

import { Typography } from '@mui/material';
import type {
  TypographyProps,
  TypographyPropsVariantOverrides,
} from '@mui/material/Typography/Typography';
import { Variant } from '@mui/material/styles/createTypography';
import { OverridableStringUnion } from '@mui/types';

import { compactNumber } from '@lendos/constants/compactNumber';

interface CompactNumberProps {
  value: string | number;
  visibleDecimals?: number;
  roundDown?: boolean;
  compactThreshold?: number;
}

function CompactNumber({ value, visibleDecimals, roundDown }: CompactNumberProps) {
  const { prefix, postfix } = compactNumber({ value, visibleDecimals, roundDown });

  return (
    <>
      {prefix}
      {postfix}
    </>
  );
}

export type FormattedNumberProps = TypographyProps<ElementType, { component?: ElementType }> & {
  value: string | number;
  symbol?: string;
  visibleDecimals?: number;
  compact?: boolean;
  percent?: boolean;
  symbolsColor?: string;
  symbolsVariant?: OverridableStringUnion<Variant | 'inherit', TypographyPropsVariantOverrides>;
  roundDown?: boolean;
  compactThreshold?: number;
};

export function FormattedNumber({
  value,
  symbol,
  visibleDecimals,
  compact,
  percent,
  symbolsVariant,
  symbolsColor,
  roundDown,
  compactThreshold,
  ...rest
}: FormattedNumberProps) {
  const number = percent ? Number(value) * 100 : Number(value);

  let decimals: number = visibleDecimals ?? 0;
  if (number === 0) {
    decimals = 0;
  } else if (visibleDecimals === undefined) {
    if (number > 1 || percent || symbol === 'USD') {
      decimals = 2;
    } else {
      decimals = 7;
    }
  }

  const minValue = 10 ** -decimals;
  const isSmallerThanMin = number !== 0 && Math.abs(number) < Math.abs(minValue);
  let formattedNumber = isSmallerThanMin ? minValue : number;
  const forceCompact = compact !== false && (compact ?? number > 99_999);

  // rounding occurs inside of CompactNumber as the prefix, not base number is rounded
  if (roundDown && !forceCompact) {
    formattedNumber = Math.trunc(Number(formattedNumber) * 10 ** decimals) / 10 ** decimals;
  }

  return (
    <Typography
      {...rest}
      sx={{
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        color: rest.color ?? 'text.dark',
        ...rest.sx,
      }}
      noWrap
    >
      {isSmallerThanMin && (
        <Typography
          component='span'
          sx={{ mr: 0.5 }}
          variant={symbolsVariant ?? rest.variant}
          color={symbolsColor ?? 'text.secondary'}
        >
          {'<'}
        </Typography>
      )}
      {symbol?.toLowerCase() === 'usd' && !percent && (
        <Typography
          component='span'
          sx={{ mr: 0.5 }}
          variant={symbolsVariant ?? rest.variant}
          color={symbolsColor ?? 'text.dark'}
        >
          $
        </Typography>
      )}

      {!forceCompact ? (
        new Intl.NumberFormat('en-US', {
          maximumFractionDigits: decimals,
          minimumFractionDigits: decimals,
        }).format(formattedNumber)
      ) : (
        <CompactNumber
          value={formattedNumber}
          visibleDecimals={decimals}
          roundDown={roundDown}
          compactThreshold={compactThreshold}
        />
      )}

      {percent && (
        <Typography
          component='span'
          sx={{ ml: 0.5 }}
          variant={symbolsVariant ?? rest.variant}
          color={symbolsColor ?? 'text.dark'}
        >
          %
        </Typography>
      )}
      {symbol?.toLowerCase() !== 'usd' && typeof symbol !== 'undefined' && (
        <Typography
          component='span'
          sx={{ ml: 0.5 }}
          variant={symbolsVariant ?? rest.variant}
          color={symbolsColor ?? 'text.dark'}
        >
          {symbol}
        </Typography>
      )}
    </Typography>
  );
}

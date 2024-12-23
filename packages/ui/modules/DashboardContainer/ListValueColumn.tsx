import { Box, Tooltip } from '@mui/material';
import { ReactNode } from 'react';

import { FormattedNumber } from '../../components/FormattedNumber';

interface ListValueColumnProps {
  symbol?: string;
  value: string | number;
  subValue?: string | number;
  withTooltip?: boolean;
  capsComponent?: ReactNode;
  disabled?: boolean;
}

const Content = ({
  value,
  withTooltip,
  subValue,
  disabled,
  capsComponent,
}: ListValueColumnProps) => {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <FormattedNumber
          value={value}
          variant='secondary14'
          sx={{ mb: !withTooltip && !!subValue ? '2px' : 0 }}
          color={disabled ? 'text.dark' : 'text.main'}
          data-cy={`nativeAmount`}
        />
        {capsComponent}
      </Box>

      {!withTooltip && !!subValue && !disabled && (
        <FormattedNumber value={subValue} symbol='USD' variant='subtitle' color='text.dark' />
      )}
    </>
  );
};

export const ListValueColumn = ({
  symbol,
  value,
  subValue,
  withTooltip,
  capsComponent,
  disabled,
}: ListValueColumnProps) => {
  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      {withTooltip ? (
        <Tooltip
          title={
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FormattedNumber
                value={subValue ?? 0}
                symbol='USD'
                variant='secondary14'
                sx={{ mb: '2px', color: '#fff' }}
                symbolsColor='common.white'
                compact={false}
              />
              <FormattedNumber
                value={value}
                variant='secondary12'
                symbol={symbol}
                symbolsColor='common.white'
                compact={false}
                sx={{ color: '#fff' }}
              />
            </Box>
          }
          arrow
          placement='top'
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Content
              symbol={symbol}
              value={value}
              subValue={subValue}
              capsComponent={capsComponent}
              disabled={disabled}
              withTooltip={withTooltip}
            />
          </Box>
        </Tooltip>
      ) : (
        <Content
          symbol={symbol}
          value={value}
          subValue={subValue}
          capsComponent={capsComponent}
          disabled={disabled}
          withTooltip={withTooltip}
        />
      )}
    </Box>
  );
};

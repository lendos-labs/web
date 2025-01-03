import { Box, Button, SxProps, Theme, Typography } from '@mui/material';

import { ESupportedTimeRanges } from './types';

export const supportedTimeRangeOptions = ['1m', '3m', '6m', '1y'] as const;

export interface TimeRangeSelectorProps {
  disabled?: boolean;
  timeRanges: ESupportedTimeRanges[];
  selectedTimeRange: ESupportedTimeRanges;
  onTimeRangeChanged: (value: ESupportedTimeRanges) => void;
  sx?: {
    buttonGroup: SxProps<Theme>;
    button: SxProps<Theme>;
  };
}

export const TimeRangeSelector = ({
  disabled = false, // support default fallback
  timeRanges,
  selectedTimeRange,
  onTimeRangeChanged,
}: TimeRangeSelectorProps) => {
  return (
    <Box gap={2.5} display={'flex'}>
      {timeRanges.map(interval => {
        return (
          <Button
            variant={'white'}
            key={interval}
            value={interval}
            size={'small'}
            disabled={disabled}
            onClick={() => onTimeRangeChanged(interval)}
            sx={theme => ({
              backgroundColor:
                selectedTimeRange === interval ? theme.palette.buttons.white.hover : undefined,
              borderColor: selectedTimeRange === interval ? theme.palette.primary.main : undefined,
              color: 'text.dark',
              height: '26px',
            })}
          >
            <Typography variant='buttonS'>{interval}</Typography>
          </Button>
        );
      })}
    </Box>
  );
};

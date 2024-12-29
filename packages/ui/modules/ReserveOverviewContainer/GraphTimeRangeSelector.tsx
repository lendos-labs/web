import { TimeRangeSelector } from './TimeRangeSelector';
import { ESupportedTimeRanges, reserveRateTimeRangeOptions } from './types';

export interface GraphTimeRangeSelectorProps {
  disabled: boolean;
  timeRange: ESupportedTimeRanges;
  onTimeRangeChanged: (value: ESupportedTimeRanges) => void;
}

export const GraphTimeRangeSelector = ({
  disabled,
  timeRange,
  onTimeRangeChanged,
}: GraphTimeRangeSelectorProps) => (
  <TimeRangeSelector
    disabled={disabled}
    timeRanges={reserveRateTimeRangeOptions}
    selectedTimeRange={timeRange}
    onTimeRangeChanged={onTimeRangeChanged}
  />
);

'use client';

import { MarketDataType } from '@lendos/types/market';
import { FormattedReservesAndIncentives } from '@lendos/types/reserves';
import { Box, Button, CircularProgress, Typography, useTheme } from '@mui/material';
import { ParentSize } from '@visx/responsive';
import { useState } from 'react';
import { ApyGraphContainerKey, ESupportedTimeRanges, Fields, ReserveRateTimeRange } from './types';
import { GraphLegend } from './GraphLegend';
import { GraphTimeRangeSelector } from './GraphTimeRangeSelector';
import { ApyGraph } from './ApyGraph';
import { useReserveRatesHistory } from './hooks/useReserveRatesHistory';

interface ApyGraphContainerProps {
  graphKey: ApyGraphContainerKey;
  reserve: FormattedReservesAndIncentives;
  currentMarketData: MarketDataType;
}

const CHART_HEIGHT = 155;
const CHART_HEIGHT_LOADING_FIX = 3.5;

export const ApyGraphContainer = ({ graphKey, reserve }: ApyGraphContainerProps) => {
  const { palette } = useTheme();
  const [selectedTimeRange, setSelectedTimeRange] = useState<ReserveRateTimeRange>(
    ESupportedTimeRanges.OneMonth,
  );

  const { data, loading, error, refetch } = useReserveRatesHistory(
    reserve.underlyingAsset,
    selectedTimeRange,
  );

  // Supply fields
  const supplyFields: Fields[] = [
    { name: 'liquidityRate', color: palette.text.primaryLight, text: 'Supply APR' },
  ];

  // Borrow fields
  const borrowFields: Fields[] = [
    ...(reserve.stableBorrowRateEnabled
      ? ([
          {
            name: 'stableBorrowRate',
            color: palette.text.primaryLight,
            text: 'Borrow APR, stable',
          },
        ] as const)
      : []),
    {
      name: 'variableBorrowRate',
      color: palette.text.primaryLight,
      text: 'Borrow APR, variable',
    },
  ];

  const fields = graphKey === ApyGraphContainerKey.supply ? supplyFields : borrowFields;

  const graphLoading = (
    <Box
      sx={{
        height: CHART_HEIGHT + CHART_HEIGHT_LOADING_FIX,
        width: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress size={20} sx={{ mb: 2, opacity: 0.5 }} />
      <Typography variant='subheader1' color='text.muted'>
        Loading data...
      </Typography>
    </Box>
  );

  const graphError = (
    <Box
      sx={{
        height: CHART_HEIGHT + CHART_HEIGHT_LOADING_FIX,
        width: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant='subheader1'>Something went wrong</Typography>
      <Typography variant='caption' sx={{ mb: 3 }}>
        Data couldn&apos;t be fetched, please reload graph.
      </Typography>
      <Button variant='white' onClick={refetch}>
        Reload
      </Button>
    </Box>
  );

  return (
    <Box sx={{ mt: 10, mb: 4 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 4,
        }}
      >
        <GraphLegend labels={fields} />
        <GraphTimeRangeSelector
          disabled={loading || error}
          timeRange={selectedTimeRange}
          onTimeRangeChanged={setSelectedTimeRange}
        />
      </Box>
      {loading && graphLoading}
      {error && graphError}
      {!loading && !error && data.length > 0 && (
        <ParentSize>
          {({ width }) => (
            <ApyGraph
              width={width}
              height={CHART_HEIGHT}
              data={data}
              fields={fields}
              selectedTimeRange={selectedTimeRange}
              avgFieldName={
                graphKey === ApyGraphContainerKey.supply ? 'liquidityRate' : 'variableBorrowRate'
              }
            />
          )}
        </ParentSize>
      )}
    </Box>
  );
};

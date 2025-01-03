'use client';

import { ReactNode, useState } from 'react';

import Box from '@mui/material/Box';
import CircularProgress, { circularProgressClasses } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import { ContentWithTooltip } from '../ContentWithTooltip';

interface CapsCircularStatusProps {
  value: number;
  tooltipContent: ReactNode;
  onClick?: (open: boolean) => void;
}

export const CapsCircularStatus = ({ value, tooltipContent, onClick }: CapsCircularStatusProps) => {
  const [open, setOpen] = useState<boolean>(false);

  // If value is zero, don't show anything
  if (value === 0) {
    return null;
  }

  const determineValueDisplay = (): string => {
    if (value >= 99.99) {
      return '100%';
    } else if (value === 0) {
      return 'N/A';
    } else if (value < 0.01) {
      return '<0.01%';
    } else {
      return `${value.toFixed(2)}%`;
    }
  };

  let progress = 0;

  if (value <= 2) {
    progress = 2;
  } else if (value > 100) {
    progress = 100;
  } else {
    progress = value;
  }

  return (
    <ContentWithTooltip
      tooltipContent={<>{tooltipContent}</>}
      open={open}
      setOpen={value => {
        setOpen(value);
        if (onClick) {
          onClick(value);
        }
      }}
    >
      <Box sx={{ position: 'relative', mr: 4 }}>
        <CircularProgress
          variant='determinate'
          sx={{
            color: theme => theme.palette.border.grey,
            position: 'absolute',
            left: 1.25,
            top: 1.25,
          }}
          size={98}
          thickness={2}
          value={100}
        />
        <CircularProgress
          variant='determinate'
          sx={{
            [`& .${circularProgressClasses.circle}`]: {
              strokeLinecap: 'round',
            },
            color: theme => theme.palette.primary.light,
          }}
          size={98}
          thickness={3}
          // We show at minimum, 2% color to represent small values
          value={progress}
        />
        <Typography
          variant='secondary14'
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {determineValueDisplay()}
        </Typography>
      </Box>
    </ContentWithTooltip>
  );
};

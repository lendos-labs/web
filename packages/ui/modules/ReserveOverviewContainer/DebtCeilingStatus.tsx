import {
  Box,
  LinearProgress,
  LinearProgressProps,
  Theme,
  Typography,
  linearProgressClasses,
} from '@mui/material';

import { FormattedNumber } from '../../components/FormattedNumber';
import { TextWithTooltip } from '../../components/TextWithTooltip';
import { AssetCapHookData } from '../../providers/AssetCapsProvider/types';

interface DebtCeilingTooltipProps {
  debt: string;
  ceiling: string;
  usageData: AssetCapHookData;
}

export const DebtCeilingStatus = ({
  debt,
  ceiling,
  usageData,
}: LinearProgressProps & DebtCeilingTooltipProps) => {
  const determineColor = (theme: Theme): string => {
    if (usageData.isMaxed || usageData.percentUsed >= 99.99) {
      return theme.palette.error.main;
    } else if (usageData.percentUsed >= 98) {
      return theme.palette.warning.main;
    } else {
      return theme.palette.success.main;
    }
  };

  const progressBarStyles = {
    borderRadius: 5,
    my: 2,
    height: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: (theme: Theme) =>
        theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: (theme: Theme) => determineColor(theme),
    },
  };

  return (
    <>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Box display='flex' alignItems='center'>
          <Typography color='text.secondary' component='span'>
            Isolated Debt Ceiling
          </Typography>
          <TextWithTooltip>
            Debt ceiling limits the amount possible to borrow against this asset by protocol users.
            Debt ceiling is specific to assets in isolation mode and is denoted in USD.
          </TextWithTooltip>
        </Box>
        <Box>
          <FormattedNumber
            value={debt}
            variant='main14'
            symbol='USD'
            symbolsVariant='secondary14'
            visibleDecimals={2}
          />
          <Typography
            component='span'
            color='text.secondary'
            variant='secondary14'
            sx={{ display: 'inline-block', mx: 1 }}
          >
            of
          </Typography>
          <FormattedNumber
            value={ceiling}
            variant='main14'
            symbol='USD'
            symbolsVariant='secondary14'
            visibleDecimals={2}
          />
        </Box>
      </Box>
      <LinearProgress
        sx={progressBarStyles}
        variant='determinate'
        value={usageData.percentUsed <= 1 ? 1 : usageData.percentUsed}
      />
    </>
  );
};

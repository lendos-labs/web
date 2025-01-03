import { valueToBigNumber } from '@aave/math-utils';
import { AlertColor, Box, Typography, useTheme } from '@mui/material';
import { BigNumber } from 'bignumber.js';

import { FormattedNumber } from '../../../../../components/FormattedNumber';

interface LTVContentProps {
  loanToValue: string;
  currentLoanToValue: string;
  currentLiquidationThreshold: string;
  color: AlertColor;
}

const calculateWidth = (value: string) =>
  valueToBigNumber(value).multipliedBy(100).precision(20, BigNumber.ROUND_UP).toNumber();

const getPositionStyles = (lineWidth: number, color: string) => ({
  position: 'absolute',
  bottom: 'calc(100% + 6px)',
  left: `${lineWidth > 100 ? 100 : lineWidth}%`,
  zIndex: 3,
  '&:after': {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderWidth: '6px 4px 0 4px',
    borderColor: `${color} transparent transparent transparent`,
    content: "''",
    position: 'absolute',
    left: lineWidth > 75 ? 'auto' : '50%',
    right: lineWidth > 75 ? 0 : 'auto',
    transform: lineWidth > 75 ? 'translateX(0)' : 'translateX(-50%)',
  },
});

const LiquidationThreshold = ({
  liquidationThresholdLeftPosition,
  liquidationThresholdPercent,
}: {
  liquidationThresholdLeftPosition: number;
  liquidationThresholdPercent: number;
}) => (
  <Box
    sx={{
      position: 'absolute',
      top: 'calc(100% + 6px)',
      left: `${Math.min(liquidationThresholdLeftPosition, 100)}%`,
      zIndex: 2,
    }}
  >
    <Box
      sx={{
        position: 'relative',
        whiteSpace: 'nowrap',
        '&:after': {
          content: "''",
          position: 'absolute',
          left: liquidationThresholdPercent > 75 ? 'auto' : '50%',
          transform: liquidationThresholdPercent > 75 ? 'translateX(0)' : 'translateX(-50%)',
          right: liquidationThresholdPercent > 75 ? 0 : 'auto',
          bottom: '100%',
          height: '10px',
          width: '2px',
          bgcolor: 'error.main',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          position: 'absolute',
          left: liquidationThresholdPercent > 75 ? 'auto' : '50%',
          transform: liquidationThresholdPercent > 75 ? 'translateX(0)' : 'translateX(-50%)',
          right: liquidationThresholdPercent > 75 ? 0 : 'auto',
          flexDirection: 'column',
          alignItems: liquidationThresholdPercent > 75 ? 'flex-end' : 'center',
          textAlign: liquidationThresholdPercent > 75 ? 'right' : 'center',
        }}
      >
        <FormattedNumber
          value={liquidationThresholdPercent / 100}
          visibleDecimals={2}
          color='error.main'
          variant='subheader2'
          percent
          symbolsColor='error.main'
        />
        <Typography
          sx={{ display: 'flex' }}
          variant='helperText'
          lineHeight='12px'
          color='error.main'
        >
          Liquidation <br /> threshold
        </Typography>
      </Box>
    </Box>
  </Box>
);

export const LTVContent = ({
  loanToValue,
  currentLoanToValue,
  currentLiquidationThreshold,
  color,
}: LTVContentProps) => {
  const { palette } = useTheme();

  const LTVLineWidth = calculateWidth(loanToValue);
  const CurrentLTVLineWidth = calculateWidth(currentLoanToValue);
  const currentLiquidationThresholdLeftPosition = calculateWidth(currentLiquidationThreshold);
  const liquidationThresholdPercent = Number(currentLiquidationThreshold) * 100;

  return (
    <Box sx={{ position: 'relative', margin: '45px 0 55px' }}>
      <LiquidationThreshold
        liquidationThresholdLeftPosition={currentLiquidationThresholdLeftPosition}
        liquidationThresholdPercent={liquidationThresholdPercent}
      />

      <Box sx={getPositionStyles(LTVLineWidth, color)}>
        <Box
          sx={{
            display: 'flex',
            position: 'absolute',
            left: LTVLineWidth > 75 ? 'auto' : '50%',
            transform: LTVLineWidth > 75 ? 'translateX(0)' : 'translateX(-50%)',
            right: LTVLineWidth > 75 ? 0 : 'auto',
            flexDirection: 'column',
            alignItems: LTVLineWidth > 75 ? 'flex-end' : 'center',
            textAlign: LTVLineWidth > 75 ? 'right' : 'center',
            bottom: 'calc(100% + 2px)',
          }}
        >
          <FormattedNumber value={loanToValue} percent visibleDecimals={2} variant='main12' />
          <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
            <Typography variant='helperText' color='text.muted' mr={0.5}>
              MAX
            </Typography>
            <FormattedNumber
              value={currentLoanToValue}
              percent
              visibleDecimals={2}
              variant='helperText'
              color='text.muted'
              symbolsColor='text.muted'
            />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          height: '4px',
          width: '100%',
          borderRadius: '1px',
          position: 'relative',
          bgcolor: 'divider',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            height: '4px',
            borderRadius: '1px',
            width: `${Math.min(LTVLineWidth, 100)}%`,
            maxWidth: '100%',
            bgcolor: `${color}.main`,
            zIndex: 2,
          }}
        />
        {LTVLineWidth < CurrentLTVLineWidth && (
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              height: '4px',
              borderRadius: '1px',
              width: `${Math.min(CurrentLTVLineWidth, 100)}%`,
              maxWidth: '100%',
              background: `repeating-linear-gradient(-45deg, ${palette.divider}, ${palette.divider} 4px, ${palette[color].main} 4px, ${palette[color].main} 7px)`,
            }}
          />
        )}
      </Box>
    </Box>
  );
};

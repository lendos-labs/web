import { Box, Typography } from '@mui/material';
import { useStateContext } from '../../providers/StateProvider';
import { StyledTxModalToggleGroup } from '../../components/StyledToggleButtonGroup';
import { StyledTxModalToggleButton } from '../../components/StyledToggleTabButton';

export enum RepayType {
  BALANCE,
  COLLATERAL,
}

export function RepayTypeSelector({
  repayType,
  setRepayType,
}: Readonly<{
  repayType: RepayType;
  setRepayType: (type: RepayType) => void;
}>) {
  const { currentMarketData } = useStateContext();

  if (!currentMarketData.enabledFeatures?.collateralRepay) {
    return null;
  }

  return (
    <Box sx={{ mb: 6 }}>
      <Typography mb={1} color='text.secondary'>
        Repay with
      </Typography>

      <StyledTxModalToggleGroup
        color='primary'
        value={repayType}
        exclusive
        onChange={(_, value: RepayType) => value && setRepayType(value)}
      >
        <StyledTxModalToggleButton
          value={RepayType.BALANCE}
          disabled={repayType === RepayType.BALANCE}
        >
          <Typography variant='buttonM'>Wallet balance</Typography>
        </StyledTxModalToggleButton>

        <StyledTxModalToggleButton
          value={RepayType.COLLATERAL}
          disabled={repayType === RepayType.COLLATERAL}
        >
          <Typography variant='buttonM'>Collateral</Typography>
        </StyledTxModalToggleButton>
      </StyledTxModalToggleGroup>
    </Box>
  );
}

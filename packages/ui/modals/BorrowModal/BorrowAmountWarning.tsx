import { Box, Checkbox, Typography } from '@mui/material';
import { Warning } from '../../components/Warning';

interface BorrowAmountWarningProps {
  riskCheckboxAccepted: boolean;
  onRiskCheckboxChange: () => void;
}

export const BorrowAmountWarning = ({
  riskCheckboxAccepted,
  onRiskCheckboxChange,
}: BorrowAmountWarningProps) => {
  return (
    <>
      <Warning severity='error' sx={{ my: 6 }}>
        Borrowing this amount will reduce your health factor and increase risk of liquidation.
      </Warning>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: '12px',
          ml: '-9px',
        }}
      >
        <Checkbox
          checked={riskCheckboxAccepted}
          onChange={() => {
            onRiskCheckboxChange();
          }}
          size='small'
          data-cy={'risk-checkbox'}
        />
        <Typography variant='h3' color={'text.primary'}>
          I acknowledge the risks involved.
        </Typography>
      </Box>
    </>
  );
};

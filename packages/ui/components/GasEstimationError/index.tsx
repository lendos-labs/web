import { Button, Typography } from '@mui/material';

import { TxErrorType } from '../../providers/ModalProvider';
import { Warning } from '../Warning';

export const GasEstimationError = ({ txError }: { txError: TxErrorType }) => {
  return (
    <Warning severity='error' sx={{ mt: 4, mb: 0 }}>
      <Typography variant='description'>
        {txError.error ? (
          <>
            {txError.error}{' '}
            <Button
              sx={{ verticalAlign: 'top' }}
              variant='text'
              onClick={() => {
                void navigator.clipboard.writeText(txError.rawError.message.toString());
              }}
            >
              <Typography variant='description'>copy the error</Typography>
            </Button>
          </>
        ) : (
          <>
            There was some error. Please try changing the parameters or{' '}
            <Button
              sx={{ verticalAlign: 'top' }}
              onClick={() => {
                void navigator.clipboard.writeText(txError.rawError.message.toString());
              }}
            >
              <Typography variant='description'>copy the error</Typography>
            </Button>
          </>
        )}
      </Typography>
    </Warning>
  );
};

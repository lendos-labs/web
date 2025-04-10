import { Button, Typography } from '@mui/material';

import { useAccountContext } from '../../providers/AccountProvider';
import { useStateContext } from '../../providers/StateProvider';
import { Warning } from '../Warning';

export interface ChangeNetworkWarningProps {
  networkName: string;
}

export const ChangeNetworkWarning = ({ networkName }: ChangeNetworkWarningProps) => {
  const { currentMarketData } = useStateContext();
  const { switchNetwork, switchNetworkError } = useAccountContext();

  return (
    <Warning severity='error'>
      {switchNetworkError ? (
        <Typography>
          Seems like we can&apos;t switch the network automatically. Please check if you can change
          it from the wallet.
        </Typography>
      ) : (
        <Typography variant='subtitle'>
          <>Please switch to {networkName}.</>{' '}
          <Button
            variant='text'
            sx={{ verticalAlign: 'top', color: 'text.dark' }}
            onClick={() => switchNetwork(currentMarketData.chain.id)}
            disableRipple
          >
            <Typography variant='subtitle'>Switch Network</Typography>
          </Button>
        </Typography>
      )}
    </Warning>
  );
};

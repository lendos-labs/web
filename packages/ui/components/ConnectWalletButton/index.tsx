import { Button } from '@mui/material';

import { useAccountContext } from '../../providers/AccountProvider';

export const ConnectWalletButton = () => {
  const { connect } = useAccountContext();

  return (
    <>
      <Button
        variant='white'
        onClick={() => {
          connect();
        }}
      >
        Connect wallet
      </Button>

      {/* TODO this logic go to webapp only for EVM */}
      {/* <WalletModal /> */}
    </>
  );
};

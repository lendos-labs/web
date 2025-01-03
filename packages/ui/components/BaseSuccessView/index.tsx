import { ReactNode } from 'react';

import CheckIcon from '@mui/icons-material/Check';
import OpenInNewOffOutlinedIcon from '@mui/icons-material/OpenInNewOffOutlined';
import { Box, Button, Link, SvgIcon, Typography } from '@mui/material';

import { useModalContext } from '../../providers/ModalProvider';
import { useStateContext } from '../../providers/StateProvider';

export interface BaseSuccessTxViewProps {
  txHash?: string;
  children: ReactNode;
  hideTx?: boolean;
}

export const BaseSuccessView = ({ txHash, children, hideTx }: BaseSuccessTxViewProps) => {
  const { close, mainTxState } = useModalContext();
  const { currentNetworkData } = useStateContext();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            mt: 14,
            mx: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <SvgIcon sx={{ fontSize: '40px' }}>
            <CheckIcon />
          </SvgIcon>
        </Box>

        <Typography sx={{ mt: 6 }} variant='h3'>
          Success!
        </Typography>

        {children}
      </Box>

      {!hideTx && (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Link
            variant='helperText'
            href={currentNetworkData.explorerLinkBuilder({
              tx: txHash ? txHash : mainTxState.txHash,
            })}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'right',
              mt: 6,
              mb: 3,
              color: 'text.primary',
            }}
            underline='hover'
            target='_blank'
            rel='noreferrer noopener'
          >
            Review tx details
            <SvgIcon sx={{ ml: '2px', fontSize: '11px' }}>
              <OpenInNewOffOutlinedIcon />
            </SvgIcon>
          </Link>
          <Button
            onClick={close}
            variant='contained'
            size='large'
            sx={{ minHeight: '44px' }}
            data-cy='closeButton'
          >
            Ok, Close
          </Button>
        </Box>
      )}
    </>
  );
};

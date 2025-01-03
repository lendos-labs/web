import { ReactNode } from 'react';

import { Box, CircularProgress, Paper, PaperProps, Typography } from '@mui/material';

interface ConnectWalletPaperProps extends PaperProps {
  loading?: boolean;
  description?: ReactNode;
}

export const ConnectWalletPaper = ({
  loading,
  description,
  sx,
  ...rest
}: ConnectWalletPaperProps) => {
  return (
    <Paper
      {...rest}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 10,
        flex: 1,
        maxHeight: '380px',
        ...sx,
      }}
    >
      <Box
        component='img'
        src='/stop.webp'
        sx={{
          width: '80px',
          height: '63.5px',
          mb: 2,
        }}
        alt=''
      />
      <>
        {loading ? (
          <CircularProgress sx={{ color: 'text.primary' }} />
        ) : (
          <>
            <Typography variant='h2' color='text.dark' sx={{ mb: 2, mt: 6 }}>
              Please, connect your wallet
            </Typography>
            <Typography variant='h3' color='text.primary' textAlign='center'>
              {description ?? (
                <>
                  Please connect your wallet to see your supplies, borrowings, and open positions.
                </>
              )}
            </Typography>
          </>
        )}
      </>
    </Paper>
  );
};

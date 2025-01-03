import { ReactNode } from 'react';

import { Box, Typography } from '@mui/material';

interface ReserveOverviewBoxProps {
  children: ReactNode;
  title?: ReactNode;
  fullWidth?: boolean;
}

export function ReserveOverviewBox({
  title,
  children,
  fullWidth = false,
}: Readonly<ReserveOverviewBoxProps>) {
  return (
    <Box
      sx={theme => ({
        borderRadius: '8px',
        flex: fullWidth ? '0 100%' : '0 30%',
        marginBottom: '2%',
        maxWidth: fullWidth ? '100%' : '32%',
        background: theme.palette.mode === 'light' ? theme.palette.gradients.body : '#0B172B',
        ...(theme.palette.mode === 'light' && {
          border: `1px solid ${theme.palette.text.dark}`,
        }),
      })}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          p: 5,
          gap: 2,
        }}
      >
        {title && (
          <Typography variant='h3' component='span'>
            {title}
          </Typography>
        )}
        {children}
      </Box>
    </Box>
  );
}

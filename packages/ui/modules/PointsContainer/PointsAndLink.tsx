import { Box, Button, Paper, Typography, useTheme } from '@mui/material';

import { useGetCodes, useGetSquad } from '@lendos/constants/hooks/usePoints';

export const PointsAndLink = () => {
  const { palette } = useTheme();
  const { data } = useGetCodes();
  const { data: squad } = useGetSquad();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      `${window.location.hostname}?referral_code=${data?.referral_code}`,
    );
  };

  return (
    <Paper
      sx={{
        p: { xs: 4, md: 10 },
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '40px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          gap: { xs: '32px', sm: '70px', md: '129px' },
          width: { xs: '100%', sm: 'auto' },
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          <Typography variant='h1' sx={{ mb: { xs: 4, md: 6 } }}>
            Refer and earn points
          </Typography>
          <Typography variant='numberM'>1 lvl - 15% / 2 lvl - 3%</Typography>
        </Box>
        <img src={`/icons/package_${palette.mode}.svg`} width='77px' alt='' />
        <Box
          sx={{
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          <Typography variant='h1' sx={{ mb: { xs: 4, md: 6 } }}>
            Referrals
          </Typography>
          <Typography variant='numberM'>{squad?.total_users_count ?? 0}</Typography>
        </Box>
      </Box>
      <Button
        variant={'contained'}
        sx={{
          width: { xs: '100%', sm: '186px' },
        }}
        onClick={() => void handleCopy()}
      >
        Copy invite link
      </Button>
    </Paper>
  );
};

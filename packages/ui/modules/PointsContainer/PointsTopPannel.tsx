import { Box, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';

import { useGetUsers } from '@lendos/constants/hooks/usePoints';

import { FormattedNumber } from '../../components/FormattedNumber';
import { TopInfoPanel } from '../../components/TopInfoPanel';
import { useAccountContext } from '../../providers/AccountProvider';

export const PointsTopPannel = () => {
  const { account } = useAccountContext();

  const { breakpoints, palette } = useTheme();
  const md = useMediaQuery(breakpoints.down('md'));

  const { data } = useGetUsers();

  return (
    <TopInfoPanel
      titleComponent={
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            gap: { xs: 0, md: 10 },
            flex: 1,
          }}
        >
          <Box mb={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
              <img
                src={`/icons/tokens/token_${palette.mode}.svg`}
                width='32px'
                height='32px'
                alt=''
              />
              <Typography variant={'h1'} sx={{ ml: 2, mr: 3 }} color={'text.dark'}>
                Markets Points
              </Typography>
            </Box>

            <Typography variant='h3' sx={{ maxWidth: '616px' }} color={'text.dark'}>
              lendOS is a fully decentralized, community governed protocol by the lendOS
              token-holders. lendOS token-holders collectively discuss, propose, and vote on
              upgrades to the protocol.
            </Typography>
          </Box>
          {account && (
            <Paper
              sx={{
                width: { xs: '100%', sm: 'auto' },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: { xs: '16px', md: '36px' },
                  px: { xs: 4, md: 5 },
                  py: 10,
                  minWidth: { xs: 'auto', md: '440px' },
                }}
              >
                <Typography
                  variant='h1'
                  sx={{
                    maxWidth: '616px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                  }}
                  color={'text.dark'}
                >
                  Total Points
                  {data && data.total_points === '< 1' ? (
                    <Typography variant='numberM' color={'primary.light'}>
                      {data.total_points}
                    </Typography>
                  ) : (
                    <FormattedNumber
                      compact
                      value={data?.total_points ?? 0}
                      variant='numberM'
                      color={'primary.light'}
                    />
                  )}
                </Typography>
                <img
                  src={md ? `/chart_mobile_${palette.mode}.png` : `/chart_${palette.mode}.png`}
                  alt=''
                  width={md ? 98 : 154}
                />
              </Box>
            </Paper>
          )}
        </Box>
      }
    />
  );
};

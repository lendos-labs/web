import { useEffect } from 'react';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { Box, Paper, Typography } from '@mui/material';
import { deleteCookie, setCookie } from 'cookies-next';

import { useGetCodes } from '@lendos/constants/hooks/usePoints';
import { Routes } from '@lendos/constants/routes';

import { DiscordVerifyTooltip } from '../../components/infoTooltips/DiscordVerifyTooltip';
import { useAccountContext } from '../../providers/AccountProvider';
import { PointsCard } from './PointsCard';
import { PointsLeaderboard } from './PointsLeaderboard';

// eslint-disable-next-line turbo/no-undeclared-env-vars -- fix it
const discordLink = process.env['NEXT_PUBLIC_DISCORD_LINK'] ?? '';

export const PointsContent = () => {
  const {
    user: { discord_name, twitter_id },
    tokens: { access_token: token },
  } = useAccountContext();
  const router = useRouter();
  const { data } = useGetCodes();

  useEffect(() => {
    void (async () => {
      await deleteCookie('t');
    })();
  }, []);

  return (
    <Paper
      sx={{
        p: { xs: 4, sm: 5 },
        mt: { xs: '30px', sm: '60px' },
      }}
    >
      <Box
        sx={theme => ({
          px: { xs: 4, sm: 6 },
          py: { xs: 4, sm: 12 },
          border:
            theme.palette.mode === 'light'
              ? `1px solid ${theme.palette.primary.main}`
              : theme.palette.background.surface,
          background:
            theme.palette.mode === 'light'
              ? 'linear-gradient(240deg, #FFF -62.56%, #69BFFD 309.36%)'
              : theme.palette.background.default,
          borderRadius: '4px',
          boxShadow: theme.palette.shadow.card,
        })}
      >
        <Typography variant='h1' sx={{ mb: { xs: 4, sm: 2 } }}>
          How to earn points?
        </Typography>
        <Typography variant='h3'>
          The greater your points total, the larger your lendOS allocation.
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 6, sm: 4 },
          mt: { xs: 10, sm: '60px' },
        }}
      >
        {[
          {
            title: 'Supply liquidity',
            description: '(Supply collateral to the markets and earn daily points)',
            value: '3 points / 1$ / day',
            handleAction: () => {
              router.push(Routes.markets);
            },
            actionText: 'Supply liquidity',
          },
          {
            title: 'Borrow assets',
            description: '(Borrow assets from the lending protocol to earn points)',
            value: '9 points / 1$ / day',
            handleAction: () => {
              router.push(Routes.markets);
            },
            actionText: 'Borrow Liquidity',
          },
          {
            title: 'Referrals',
            description: '(Earn by reffering users)',
            value: '1 lvl - 15%, 2 lvl - 3%',
            handleAction: async () => {
              await navigator.clipboard.writeText(
                `${window.location.hostname}?referral_code=${data?.referral_code}`,
              );
            },
            actionText: 'Copy link',
          },
          {
            title: 'Connect discord',
            titleLink: discordLink,
            description: '(Join and get Verified on Discord)',
            value: (
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                }}
              >
                100 points <DiscordVerifyTooltip />
              </Box>
            ),
            handleAction: async () => {
              await setCookie('t', token);
              await signIn('discord', { redirect: false });
            },
            actionText: discord_name ? 'Verified' : 'Verify discord',
            disabledBtn: !!discord_name,
          },

          {
            title: 'Follow lendOS on Twitter (X)',
            description: '(Follow us on Twitter (x) )',
            value: '100 points',
            handleAction: async () => {
              await setCookie('t', token);
              await signIn('twitter', {
                redirect: false,
              });
            },
            actionText: 'Follow lendOS X',
            disabledBtn: !!twitter_id,
          },

          {
            title: 'Say GM to Discord',
            description:
              '(Head to the #gm-gn channel on our discord and say GM to get daily points',
            value: '10 points (1 time per day)',
            handleAction: () => {
              window.open(
                'https://discord.com/channels/1214606360864497785/1219298953108131922',
                '_blank',
              );
            },
            actionText: 'Say GM',
          },
        ].map(item => (
          <PointsCard key={item.title} {...item} />
        ))}
      </Box>

      <Typography
        variant='h1'
        sx={{
          mt: { xs: '66px', sm: '80px' },
          mb: { xs: 6, sm: 10 },
        }}
      >
        Leaderboard
      </Typography>
      <PointsLeaderboard />
    </Paper>
  );
};

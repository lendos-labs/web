import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

import { TextWithTooltip, TextWithTooltipProps } from '../TextWithTooltip';

interface RewardAPYTooltipProps extends TextWithTooltipProps {
  supplyAPY: string;
  rewardAPY?: number;
}

export const RewardAPYTooltip = ({ supplyAPY, rewardAPY, ...rest }: RewardAPYTooltipProps) => {
  const fsupplyAPY = Number((Number(supplyAPY) * 100).toFixed(2));
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <TextWithTooltip {...rest} disableHoverListener={isMobile}>
      <Box>
        <Box
          sx={{
            borderBottom: '1px solid',
            borderColor: '#C3C3CC',
            pb: 4,
            mb: 4,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant='h3' color='black'>
              Native APY
            </Typography>
            <Typography variant='numberS' color='black'>
              {fsupplyAPY}%
            </Typography>
          </Box>
          <Box
            mt={2}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant='h3' color={'primary.light'}>
              Reward APY
            </Typography>
            <Typography variant='numberS' color={'primary.light'}>
              {rewardAPY && rewardAPY - fsupplyAPY >= 0 ? rewardAPY - fsupplyAPY : 0}%
            </Typography>
          </Box>
        </Box>
        <Typography variant='subtitle'>
          Information about these rewards can be found on lendOS Discord and{' '}
          <Typography
            component={'a'}
            variant='subtitle'
            href='https://medium.com/@lendos/maximizing-your-returns-introducing-our-summer-rewards-program-for-lendos-users-8f86e186153b'
            color='primary'
            target={'_blank'}
          >
            <Typography component={'span'} fontWeight={600}>
              here
            </Typography>
          </Typography>
        </Typography>
      </Box>
    </TextWithTooltip>
  );
};

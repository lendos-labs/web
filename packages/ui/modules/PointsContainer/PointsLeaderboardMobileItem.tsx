import { Box, Typography } from '@mui/material';

import { ILeaderboard } from '@lendos/types/points';

import { FormattedNumber } from '../../components/FormattedNumber';
import { Row } from '../../components/Row';

export const PointsLeaderboardMobileItem = ({
  rank,
  wallet,
  deposit_points,
  borrowing_points,
  referral_points,
  total_points,
}: ILeaderboard) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        py: 6,
        borderTop: '1px solid',
        borderBottom: '1px solid',
        borderColor: 'text.muted',
      }}
    >
      <Row caption='Rank' captionVariant='h3' captionColor={'text.primary'}>
        <Typography variant='subtitle'>{rank}</Typography>
      </Row>
      <Row caption='User' captionVariant='h3' captionColor={'text.primary'}>
        <Typography variant='subtitle'>
          {wallet ? `${wallet.slice(0, 4)}...${wallet.slice(-4)}` : '-'}
        </Typography>
      </Row>
      <Row caption='Lending Points' captionVariant='h3' captionColor={'text.primary'}>
        <FormattedNumber compact value={deposit_points} variant='subtitle' />
      </Row>
      <Row caption='Borrowing Points' captionVariant='h3' captionColor={'text.primary'}>
        <FormattedNumber compact value={borrowing_points} variant='subtitle' />
      </Row>
      <Row caption='Referral Points' captionVariant='h3' captionColor={'text.primary'}>
        <Typography variant='subtitle'>{referral_points}</Typography>
      </Row>
      <Row caption='TotalPage Points' captionVariant='h3' captionColor={'text.primary'}>
        <FormattedNumber compact value={total_points} variant='subtitle' />
      </Row>
    </Box>
  );
};

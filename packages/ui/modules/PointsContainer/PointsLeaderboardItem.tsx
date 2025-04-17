import { Typography } from '@mui/material';

import { ILeaderboard } from '@lendos/types/points';

import { FormattedNumber } from '../../components/FormattedNumber';
import { ListColumn } from '../../components/ListColumn';
import { ListItem } from '../../components/ListItem';

export const PointsLeaderboardItem = ({
  rank,
  wallet,
  deposit_points,
  borrowing_points,
  referral_points,
  total_points,
}: ILeaderboard) => {
  return (
    <ListItem minHeight={76} sx={{ cursor: 'pointer' }} button>
      <ListColumn>
        <Typography variant='subtitle'>{rank}</Typography>
      </ListColumn>
      <ListColumn>
        <Typography variant='subtitle'>
          {wallet ? `${wallet.slice(0, 4)}...${wallet.slice(-4)}` : '-'}
        </Typography>
      </ListColumn>
      <ListColumn>
        <FormattedNumber compact value={deposit_points} visibleDecimals={2} variant='subtitle' />
      </ListColumn>
      <ListColumn>
        <FormattedNumber compact value={borrowing_points} visibleDecimals={2} variant='subtitle' />
      </ListColumn>
      <ListColumn>
        <FormattedNumber compact value={referral_points} visibleDecimals={2} variant='subtitle' />
      </ListColumn>
      <ListColumn>
        <FormattedNumber compact value={total_points} visibleDecimals={2} variant='subtitle' />
      </ListColumn>
    </ListItem>
  );
};

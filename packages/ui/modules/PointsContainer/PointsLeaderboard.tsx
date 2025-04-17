import { Box, useMediaQuery, useTheme } from '@mui/material';

import { useGetLeaderboard } from '@lendos/constants/hooks/usePoints';

import { ListColumn } from '../../components/ListColumn';
import { ListHeaderTitle } from '../../components/ListHeaderTitle';
import { ListHeaderWrapper } from '../../components/ListHeaderWrapper';
import { PointsLeaderboardItem } from './PointsLeaderboardItem';
import { PointsLeaderboardMobileItem } from './PointsLeaderboardMobileItem';

const listHeaders = [
  {
    title: 'Rank',
  },
  {
    title: 'User',
  },
  {
    title: 'Lending Points',
  },
  {
    title: 'Borrowing Points',
  },
  {
    title: 'Referral Points',
  },
  {
    title: 'Total Points',
  },
];

export const PointsLeaderboard = () => {
  const { breakpoints } = useTheme();
  const isTableChangedToCards = useMediaQuery(breakpoints.down('md'));

  const { data } = useGetLeaderboard();

  return (
    <>
      {!isTableChangedToCards && (
        <ListHeaderWrapper>
          {listHeaders.map(col => (
            <ListColumn key={col.title}>
              <ListHeaderTitle>{col.title}</ListHeaderTitle>
            </ListColumn>
          ))}
        </ListHeaderWrapper>
      )}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 10, md: 0 },
        }}
      >
        {data?.map(reserve =>
          isTableChangedToCards ? (
            <PointsLeaderboardMobileItem {...reserve} key={reserve.user_id} />
          ) : (
            <PointsLeaderboardItem {...reserve} key={reserve.user_id} />
          ),
        )}
      </Box>
    </>
  );
};

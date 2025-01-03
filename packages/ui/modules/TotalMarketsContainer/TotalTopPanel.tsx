'use client';

import { valueToBigNumber } from '@aave/math-utils';
import { Box, Typography } from '@mui/material';

import { TotalFormatReserveWithMarkets } from '@lendos/types/reserves';

import { FormattedNumber } from '../../components/FormattedNumber';
import { TopInfoPanelItem } from '../../components/TopInfoPanelItem';
import { TotalContainer } from './TotalContainer.tsx';

interface TotalTopPanelProps {
  reserves: TotalFormatReserveWithMarkets[];
}

export const TotalTopPanel = ({ reserves }: TotalTopPanelProps) => {
  const aggregatedStats = reserves.reduce(
    (acc, reserve) => {
      return {
        totalLiquidity: acc.totalLiquidity.plus(reserve.totalLiquidityUSD),
        totalDebt: acc.totalDebt.plus(reserve.totalDebtUSD),
      };
    },
    {
      totalLiquidity: valueToBigNumber(0),
      totalDebt: valueToBigNumber(0),
    },
  );

  return (
    <Box
      sx={{
        pt: { xs: 10, md: 12 },
        pb: { xs: 18, md: 20, lg: '94px', xl: '92px', xxl: '96px' },
        color: '#F1F1F3',
      }}
    >
      <TotalContainer sx={{ pb: 0 }}>
        <Typography
          variant={'h1'}
          sx={theme => ({
            color: theme.palette.text.dark,
            mb: 5,
          })}
        >
          Total Markets
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 10,
          }}
        >
          <TopInfoPanelItem hideIcon title={<>Total market size</>}>
            <FormattedNumber
              value={aggregatedStats.totalLiquidity.toString()}
              symbol='USD'
              variant={'numberM'}
              visibleDecimals={2}
              compact
            />
          </TopInfoPanelItem>
          <TopInfoPanelItem hideIcon title={<>Total available</>}>
            <FormattedNumber
              value={aggregatedStats.totalLiquidity.minus(aggregatedStats.totalDebt).toString()}
              symbol='USD'
              variant={'numberM'}
              visibleDecimals={2}
              compact
            />
          </TopInfoPanelItem>
          <TopInfoPanelItem hideIcon title={<>Total borrows</>}>
            <FormattedNumber
              value={aggregatedStats.totalDebt.toString()}
              symbol='USD'
              variant={'numberM'}
              visibleDecimals={2}
              compact
            />
          </TopInfoPanelItem>
        </Box>
      </TotalContainer>
    </Box>
  );
};

import { Box, Button, Typography } from '@mui/material';
import { TableHeadProperties } from '../../components/Table';
import { VariableAPYTooltip } from '../../components/VariableAPYTooltip';
import { FormattedReservesAndIncentives, ReserveToken } from '@lendos/types/reserves';
import { TokenIcon } from '../../components/TokenIcon';
import { IsolatedEnabledBadge } from '../../components/IsolatedEnabledBadge';
import { FormattedNumber } from '../../components/FormattedNumber';
import { ReserveSubheader } from '../../components/ReserveSubheader';
import { RewardAPYTooltip } from '../../components/RewardAPYTooltip';
import StarCircle from '../../components/StarCircle';
import { IncentivesCard } from '../../components/IncentivesCard';
import { isFeatureEnabled } from '@lendos/constants/markets';
import { MarketDataType } from '@lendos/types/market';
import { CustomPoints } from '@lendos/types/chain';
import { Link } from '../../components/Link';
import { Routes } from '@lendos/constants/routes';

const styleCustomPoints: Record<
  CustomPoints,
  {
    backgroundColor: {
      light: string;
      dark: string;
    };
    iconColor: string;
  }
> = {
  [CustomPoints.neon]: {
    backgroundColor: {
      light: 'rgba(223, 65, 171, 0.15)',
      dark: 'rgba(223, 65, 171, 0.50);',
    },
    iconColor: '#DF41AB',
  },
};

export const marketHeader: TableHeadProperties[] = [
  {
    key: 'symbol',
    title: 'Asset',
    sortKey: 'symbol',
    mobileHide: true,
  },
  {
    key: 'totalLiquidityUSD',
    title: 'Total supplied',
    sortKey: 'totalLiquidityUSD',
  },
  {
    key: 'supplyAPY',
    title: 'Supply APY',
    sortKey: 'supplyAPY',
  },
  {
    key: 'totalDebtUSD',
    title: 'Total borrowed',
    sortKey: 'totalDebtUSD',
  },
  {
    key: 'variableBorrowAPY',
    title: (
      <VariableAPYTooltip text='Borrow APY, variable' key='APY_list_variable_type' variant='h3' />
    ),
    sortKey: 'variableBorrowAPY',
  },
  {
    key: 'action',
    title: '',
  },
];

export const getMarketsCells = (
  reserve: FormattedReservesAndIncentives<ReserveToken>,
  market: MarketDataType,
) => {
  return {
    symbol: (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3.5 }}>
        <TokenIcon symbol={reserve.iconSymbol} size={26} />
        <Box sx={{ overflow: 'hidden' }}>
          <Typography variant='h3' color={'text.dark'} noWrap>
            {reserve.name}
          </Typography>

          <Box
            sx={{
              p: { xs: '0', xsm: '3.625px 0px' },
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography variant='subtitle' color='text.dark' noWrap>
              {reserve.symbol}
            </Typography>
            {!reserve.isIsolated && (
              <Box style={{ marginLeft: '8px' }}>
                <IsolatedEnabledBadge />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    ),
    totalLiquidityUSD: (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <FormattedNumber compact value={reserve.totalLiquidity} variant='numberS' />
        <ReserveSubheader value={reserve.totalLiquidityUSD} />
      </Box>
    ),
    supplyAPY: (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {reserve.rewardAPY && reserve.rewardAPY > 0 ? (
          <RewardAPYTooltip
            supplyAPY={reserve.supplyAPY}
            rewardAPY={reserve.rewardAPY}
            cont={
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <StarCircle />
                <FormattedNumber
                  compact
                  value={
                    reserve.rewardAPY - Number(reserve.supplyAPY) * 100 > 0
                      ? reserve.rewardAPY / 100
                      : Number(reserve.supplyAPY)
                  }
                  variant='numberS'
                  symbolsColor={'primary.light'}
                  color={'primary.light'}
                  percent
                />
              </Box>
            }
          />
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <IncentivesCard
                value={reserve.supplyAPY}
                incentives={reserve.aIncentivesData ?? []}
                symbol={reserve.symbol}
                variant='numberS'
                symbolsVariant='numberS'
              />
              {!isFeatureEnabled.points(market) && (
                <Box
                  sx={theme => ({
                    display: 'flex',
                    boxShadow: theme.palette.shadow.card,
                    borderRadius: '4px',
                    px: '4px',
                    py: '2px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    bgcolor:
                      theme.palette.mode === 'dark'
                        ? theme.palette.primary.light
                        : theme.palette.background.white,
                  })}
                >
                  <StarCircle />
                  <Typography
                    variant='numberS'
                    sx={theme => ({
                      color:
                        theme.palette.mode === 'dark'
                          ? theme.palette.text.white
                          : theme.palette.primary.light,
                    })}
                  >
                    Points
                  </Typography>
                </Box>
              )}
            </Box>
            {!isFeatureEnabled.customPoints(market) && (
              <Box
                sx={theme => ({
                  display: 'flex',
                  boxShadow: theme.palette.shadow.card,
                  borderRadius: '4px',
                  px: '4px',
                  py: '2px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  backgroundColor:
                    styleCustomPoints[CustomPoints.neon].backgroundColor[theme.palette.mode],
                })}
              >
                <StarCircle color={styleCustomPoints[CustomPoints.neon].iconColor} />
                <Typography variant='subtitle'>Neon points</Typography>
              </Box>
            )}
          </Box>
        )}
      </Box>
    ),
    totalDebtUSD: (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {reserve.borrowingEnabled || Number(reserve.totalDebt) > 0 ? (
          <>
            <FormattedNumber compact value={reserve.totalDebt} variant='numberS' />
            <ReserveSubheader value={reserve.totalDebtUSD} />
          </>
        ) : (
          <Typography variant={'secondary14'} color='text.secondary'>
            —
          </Typography>
        )}
      </Box>
    ),
    variableBorrowAPY: (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <IncentivesCard
              value={Number(reserve.totalVariableDebtUSD) > 0 ? reserve.variableBorrowAPY : '-1'}
              incentives={reserve.vIncentivesData ?? []}
              symbol={reserve.symbol}
              variant='numberS'
              symbolsVariant='numberS'
            />
            {!isFeatureEnabled.points(market) && (
              <Box
                sx={theme => ({
                  display: 'flex',
                  boxShadow: theme.palette.shadow.card,
                  borderRadius: '4px',
                  px: '4px',
                  py: '2px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  bgcolor:
                    theme.palette.mode === 'dark'
                      ? theme.palette.primary.light
                      : theme.palette.background.white,
                })}
              >
                <StarCircle />
                <Typography
                  variant='numberS'
                  sx={theme => ({
                    color:
                      theme.palette.mode === 'dark'
                        ? theme.palette.text.white
                        : theme.palette.primary.light,
                  })}
                >
                  Points
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
        {!reserve.borrowingEnabled &&
          Number(reserve.totalVariableDebt) > 0 &&
          !reserve.isFrozen && <ReserveSubheader value={'Disabled'} />}
      </Box>
    ),
    action: (
      <Button
        sx={{
          width: { xs: '100%', lg: '82px' },
          flex: { xs: 1 },
        }}
        variant='white'
        size={'small'}
        component={Link}
        href={`${Routes.reserveOverview}/?underlyingAsset=${reserve.underlyingAsset}&marketName=${market.market}`}
      >
        Details
      </Button>
    ),
  };
};

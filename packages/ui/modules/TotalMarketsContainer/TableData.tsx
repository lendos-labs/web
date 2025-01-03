import { Avatar, AvatarGroup, Box, Button } from '@mui/material';
import Typography from '@mui/material/Typography';

import { TotalFormatReserveWithMarkets } from '@lendos/types/reserves';

import { Routes } from '@lendos/constants/routes';

import { FormattedNumber } from '../../components/FormattedNumber';
import { IncentivesCard } from '../../components/IncentivesCard';
import { Link } from '../../components/Link';
import { ListColumn } from '../../components/ListColumn';
import { NoData } from '../../components/NoData';
import { ReserveSubheader } from '../../components/ReserveSubheader';
import { TableHeadProperties } from '../../components/Table';
import { TokenIcon } from '../../components/TokenIcon';
import { VariableAPYTooltip } from '../../components/VariableAPYTooltip';
import { ListAPRColumn } from '../DashboardContainer/ListAPRColumn.tsx';

export const listHeaders = [
  {
    key: 'symbol',
    title: 'Asset',
    sortKey: 'symbol',
  },
  {
    key: 'chains',
    title: 'Chains',
    sortKey: 'chains',
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
    title: <VariableAPYTooltip text='Borrow APY, variable' variant='h3' />,
    sortKey: 'variableBorrowAPY',
  },
  {
    key: 'actions',
  },
] as TableHeadProperties[];

export const listHeadersCollapsibleHeader = [
  {
    key: 'symbol',
    title: 'Asset',
    sortKey: 'symbol',
  },
  {
    key: 'marketTitle',
    title: '',
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
      <VariableAPYTooltip
        text='Borrow APY, variable'
        variant='h3'
        wrapperProps={{
          sx: {
            justifyContent: 'center',
          },
        }}
      />
    ),
    sortKey: 'variableBorrowAPY',
  },
  {
    key: 'actions',
  },
] as TableHeadProperties[];

export const getAllTotalAssetsList = ({ reserve }: { reserve: TotalFormatReserveWithMarkets }) => {
  // const marketLogo = networkConfigs[reserve.chainId]?.networkLogoPath ?? ''; TODO - Fix this
  const marketLogo = '/icons/networks/fuel.svg';
  return {
    symbol: (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <TokenIcon symbol={reserve.symbol} fontSize='small' />
        <Box sx={{ pl: 3.5, overflow: 'hidden' }}>
          <Typography variant='h3' color={'text.dark'} noWrap>
            {reserve.name}
          </Typography>

          <Box
            sx={{
              p: { xs: '0', xsm: '3.625px 0px' },
            }}
          >
            <Typography variant='subtitle' color='text.dark' noWrap>
              {reserve.symbol}
            </Typography>
          </Box>
        </Box>
      </Box>
    ),
    chains: (
      <AvatarGroup
        max={5}
        spacing={4}
        sx={{
          border: 'none',
          m: 0,
          '& .MuiAvatar-root': {
            border: 'none',
          },
        }}
      >
        {reserve.markets.map(market => {
          // const marketLogo = networkConfigs[market.chainId]?.networkLogoPath ?? ''; TODO: Fix this
          return (
            <Avatar
              alt='Remy Sharp'
              src={'/icons/networks/fuel.svg'}
              key={market.id}
              sx={{ width: 20, height: 20 }}
            />
          );
        })}
      </AvatarGroup>
    ),
    totalLiquidityUSD: (
      <ListColumn p={0}>
        <FormattedNumber compact value={reserve.totalLiquidity} variant='numberS' />
        <ReserveSubheader value={reserve.totalLiquidityUSD} />
      </ListColumn>
    ),
    supplyAPY: (
      <ListColumn p={0}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Typography variant='numberS' color='text.dark'>
            Up To:
          </Typography>
          <IncentivesCard value={Number(reserve.supplyAPY)} symbol={reserve.symbol} />
        </Box>
      </ListColumn>
    ),
    totalDebtUSD: (
      <ListColumn p={0}>
        {Number(reserve.totalDebt) > 0 ? (
          <>
            <FormattedNumber compact value={reserve.totalDebt} variant='numberS' />{' '}
            <ReserveSubheader value={reserve.totalDebtUSD} />
          </>
        ) : (
          <NoData variant={'secondary14'} color='text.secondary' />
        )}
      </ListColumn>
    ),
    variableBorrowAPY: (
      <ListColumn>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Typography variant='numberS' color='text.dark'>
            From:
          </Typography>
          <IncentivesCard
            value={Number(reserve.totalVariableDebtUSD) > 0 ? reserve.variableBorrowAPY : '-1'}
            symbol={reserve.symbol}
            variant='numberS'
            symbolsVariant='numberS'
          />
        </Box>
      </ListColumn>
    ),
    collapsibleData: reserve.markets.map(data => {
      return {
        symbol: (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <TokenIcon symbol={data.symbol} fontSize='small' />
            <Box sx={{ pl: 3.5, overflow: 'hidden' }}>
              <Typography variant='h3' color={'text.dark'} noWrap>
                {data.name}
              </Typography>

              <Box
                sx={{
                  p: { xs: '0', xsm: '3.625px 0px' },
                }}
              >
                <Typography variant='subtitle' color='text.dark' noWrap>
                  {data.symbol}
                </Typography>
              </Box>
            </Box>
          </Box>
        ),
        marketTitle: (
          <ListColumn>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Avatar alt='Remy Sharp' src={marketLogo} sx={{ width: 20, height: 20 }} />
              <Typography variant='subtitle' color='text.dark' noWrap>
                {reserve.marketTitle}
              </Typography>
            </Box>
          </ListColumn>
        ),
        totalLiquidityUSD: (
          <ListColumn p={0}>
            <FormattedNumber compact value={reserve.totalLiquidity} variant='numberS' />
            <ReserveSubheader value={reserve.totalLiquidityUSD} />
          </ListColumn>
        ),
        supplyAPY: <ListAPRColumn value={Number(reserve.supplyAPY)} symbol={reserve.symbol} />,
        totalDebtUSD: (
          <ListColumn p={0}>
            {Number(reserve.totalDebt) > 0 ? (
              <>
                <FormattedNumber compact value={reserve.totalDebt} variant='numberS' />{' '}
                <ReserveSubheader value={reserve.totalDebtUSD} />
              </>
            ) : (
              <NoData variant={'secondary14'} color='text.secondary' />
            )}
          </ListColumn>
        ),
        variableBorrowAPY: (
          <ListColumn>
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
                  value={
                    Number(reserve.totalVariableDebtUSD) > 0 ? reserve.variableBorrowAPY : '-1'
                  }
                  symbol={reserve.symbol}
                  variant='numberS'
                  symbolsVariant='numberS'
                />
              </Box>
            </Box>
          </ListColumn>
        ),
        actions: (
          <ListColumn minWidth={95} maxWidth={95} align='flex-end'>
            <Button
              variant='white'
              size={'small'}
              component={Link}
              href={`${Routes.reserveOverview}/?underlyingAsset=${data.underlyingAsset}&marketName=${data.market}`}
            >
              Details
            </Button>
          </ListColumn>
        ),
      };
    }),
  };
};

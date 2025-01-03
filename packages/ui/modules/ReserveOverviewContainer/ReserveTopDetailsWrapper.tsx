'use client';

import { Box, Skeleton, Typography } from '@mui/material';

import { FormattedReservesAndIncentives, Reserves } from '@lendos/types/reserves';

import { MarketLogo } from '../../components/MarketLogo';
import { TokenIcon } from '../../components/TokenIcon';
import { TopInfoPanel } from '../../components/TopInfoPanel';
import { TopInfoPanelItem } from '../../components/TopInfoPanelItem';
import { useAccountContext } from '../../providers/AccountProvider';
import { useStateContext } from '../../providers/StateProvider';
import { AddTokenDropdown } from './AddTokenDropdown';
import { BackButton } from './BackButton';
import { ReserveTopDetails } from './ReserveTopDetails';
import { TokenLinkDropdown } from './TokenLinkDropdown';

interface ReserveTopDetailsProps {
  reserve: FormattedReservesAndIncentives;
  loading: boolean;
}

export const ReserveTopDetailsWrapper = ({ reserve, loading }: ReserveTopDetailsProps) => {
  const { currentNetworkData, currentMarketData } = useStateContext();
  const { connected } = useAccountContext();

  const ReserveIcon = () => {
    return (
      <Box mr={3} sx={{ mr: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {loading ? (
          <Skeleton variant='circular' width={40} height={40} />
        ) : (
          <TokenIcon
            sx={{ fontSize: '40px' }}
            symbol={
              reserve.type === Reserves.ASSET
                ? reserve.iconSymbol
                : `${reserve.token0.symbol}_${reserve.token1.symbol}`
            }
          />
        )}
      </Box>
    );
  };

  const ReserveName = () => {
    return loading ? (
      <Skeleton width={60} height={28} />
    ) : (
      <Typography variant='h2' color={'text.dark'}>
        {reserve.name}
      </Typography>
    );
  };

  return (
    <TopInfoPanel
      mode='paper'
      titleComponent={
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              alignSelf: 'center',
              mb: 6,
            }}
          >
            <BackButton />
            <MarketLogo
              size={theme => (!theme.breakpoints.down('sm') ? 18 : 24)}
              sx={{
                mr: 3,
              }}
              logo={currentNetworkData.networkLogoPath}
            />
            <Box sx={{ display: 'inline-flex', alignItems: 'flex-start' }}>
              <Typography
                variant={'h3'}
                sx={theme => ({
                  color: theme.palette.text.dark,
                  mr: 1,
                })}
              >
                {currentMarketData.marketTitle}
              </Typography>
            </Box>
          </Box>
        </Box>
      }
    >
      <Box
        sx={theme => ({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          gap: { sx: 0, lg: 6 },
          [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: 'flex-start',
          },
        })}
      >
        <Box
          sx={theme => ({
            display: 'block',
            [theme.breakpoints.down('sm')]: {
              display: 'none',
            },
          })}
        >
          <TopInfoPanelItem
            title={
              reserve.type === Reserves.ASSET
                ? reserve.symbol
                : `${reserve.token0.symbol}/${reserve.token1.symbol}`
            }
            withoutIconWrapper
            icon={<ReserveIcon />}
            loading={loading}
          >
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
              <ReserveName />
            </Box>
          </TopInfoPanelItem>
        </Box>

        <Box
          sx={theme => ({
            display: 'none',
            [theme.breakpoints.down('sm')]: {
              display: 'flex',
              alignItems: 'center',
              mb: 6,
            },
          })}
        >
          <ReserveIcon />
          <Box>
            {!loading && (
              <Typography sx={{ color: 'text.dark' }} variant='caption'>
                {reserve.type === Reserves.ASSET
                  ? reserve.symbol
                  : `${reserve.token0.symbol}/${reserve.token1.symbol}`}
              </Typography>
            )}
            <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
              <ReserveName />
              {loading ? (
                <Skeleton width={160} height={16} sx={{ ml: 1, background: 'red' }} />
              ) : (
                <Box sx={{ display: 'flex' }}>
                  <TokenLinkDropdown poolReserve={reserve} hideAToken={false} />

                  {connected && <AddTokenDropdown poolReserve={reserve} hideAToken={false} />}
                </Box>
              )}
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: { xs: 'grid', sm: 'flex' },
            flexDirection: { xs: 'column', sm: 'row' },
            gridTemplateColumns: 'repeat(2, 1fr);',
            gap: { xs: '25px 10px', md: '40px', lg: '68px' },
            alignItems: 'center',
          }}
        >
          <ReserveTopDetails reserve={reserve} loading={loading} />
        </Box>
      </Box>
    </TopInfoPanel>
  );
};

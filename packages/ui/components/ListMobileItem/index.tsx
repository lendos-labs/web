import { ReactNode } from 'react';

import { Box, Divider, Skeleton, Typography } from '@mui/material';

import { Routes } from '@lendos/constants/routes';

import { Link } from '../Link';
import { TokenIcon } from '../TokenIcon';

interface ListMobileItemProps {
  children: ReactNode;
  symbol?: string;
  iconSymbol?: string;
  name?: string;
  underlyingAsset?: string;
  loading?: boolean;
  currentMarket?: string;
}

export const ListMobileItem = ({
  children,

  symbol,
  iconSymbol,
  name,
  underlyingAsset,
  loading,
  currentMarket,
}: ListMobileItemProps) => {
  return (
    <Box>
      <Divider sx={{ borderColor: theme => theme.palette.border.grey }} />
      <Box sx={{ px: 4, pt: 4, pb: 6 }}>
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
          {loading ? (
            <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
              <Skeleton variant='circular' width={40} height={40} />
              <Box sx={{ ml: 2 }}>
                <Skeleton width={100} height={24} />
              </Box>
            </Box>
          ) : (
            symbol &&
            underlyingAsset &&
            name &&
            currentMarket &&
            iconSymbol && (
              <Link
                href={`${Routes.reserveOverview}/?underlyingAsset=${underlyingAsset}&marketName=${currentMarket}`}
                sx={{ display: 'inline-flex', alignItems: 'center' }}
              >
                <TokenIcon symbol={iconSymbol} sx={{ fontSize: '40px' }} />
                <Box sx={{ ml: 2 }}>
                  <Typography variant='h4' color='text.primary'>
                    {name}
                  </Typography>
                  <Box display='flex' alignItems='center'>
                    <Typography variant='subheader2' color='text.muted'>
                      {symbol}
                    </Typography>
                  </Box>
                </Box>
              </Link>
            )
          )}
        </Box>
        {children}
      </Box>
    </Box>
  );
};

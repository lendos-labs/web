import { useState } from 'react';

import IosShareIcon from '@mui/icons-material/IosShare';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';

import { FormattedReservesAndIncentives } from '@lendos/types/reserves';

import { TokenIcon } from '../../components/TokenIcon';
import { useStateContext } from '../../providers/StateProvider';

interface TokenLinkDropdownProps {
  poolReserve: FormattedReservesAndIncentives;
  hideAToken?: boolean;
}

export const TokenLinkDropdown = ({ poolReserve, hideAToken }: TokenLinkDropdownProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { currentNetworkData } = useStateContext();

  const showVariableDebtToken =
    poolReserve.borrowingEnabled || Number(poolReserve.totalVariableDebt) > 0;

  const showStableDebtToken =
    poolReserve.stableBorrowRateEnabled || Number(poolReserve.totalStableDebt) > 0;

  const showDebtTokenHeader = showVariableDebtToken || showStableDebtToken;

  return (
    <>
      <Box onClick={e => setAnchorEl(e.currentTarget)}>
        <IconButton color={'primary'}>
          <IosShareIcon
            sx={theme => ({ fontSize: theme.breakpoints.down('sm') ? '16px' : '20px' })}
          />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        keepMounted={true}
        data-cy='addToWaletSelector'
      >
        <Box sx={{ px: 4, pt: 3, pb: 2 }}>
          <Typography variant='secondary12' color='text.secondary'>
            Underlying token
          </Typography>
        </Box>

        <MenuItem
          component='a'
          href={currentNetworkData.explorerLinkBuilder({
            address: poolReserve.underlyingAsset,
          })}
          target='_blank'
          divider
        >
          <TokenIcon symbol={poolReserve.iconSymbol} sx={{ fontSize: '20px' }} />
          <Typography variant='subheader1' sx={{ ml: 3 }} noWrap data-cy='assetName'>
            {poolReserve.symbol}
          </Typography>
        </MenuItem>

        {!hideAToken && (
          <Box>
            <Box sx={{ px: 4, pt: 3, pb: 2 }}>
              <Typography variant='secondary12' color='text.secondary'>
                lendos token
              </Typography>
            </Box>

            <MenuItem
              component='a'
              href={currentNetworkData.explorerLinkBuilder({
                address: poolReserve.aTokenAddress,
              })}
              target='_blank'
              divider={showDebtTokenHeader}
            >
              <TokenIcon symbol={poolReserve.iconSymbol} aToken={true} sx={{ fontSize: '20px' }} />
              <Typography variant='subheader1' sx={{ ml: 3 }} noWrap data-cy={`assetName`}>
                {'a' + poolReserve.symbol}
              </Typography>
            </MenuItem>
          </Box>
        )}

        {showDebtTokenHeader && (
          <Box sx={{ px: 4, pt: 3, pb: 2 }}>
            <Typography variant='secondary12' color='text.secondary'>
              lendos debt token
            </Typography>
          </Box>
        )}
        {showVariableDebtToken && (
          <MenuItem
            component='a'
            href={currentNetworkData.explorerLinkBuilder({
              address: poolReserve.variableDebtTokenAddress,
            })}
            target='_blank'
          >
            <TokenIcon symbol='default' sx={{ fontSize: '20px' }} />
            <Typography variant='subheader1' sx={{ ml: 3 }} noWrap data-cy={`assetName`}>
              {'Variable debt ' + poolReserve.symbol}
            </Typography>
          </MenuItem>
        )}
        {showStableDebtToken && (
          <MenuItem
            component='a'
            href={currentNetworkData.explorerLinkBuilder({
              address: poolReserve.stableDebtTokenAddress,
            })}
            target='_blank'
          >
            <TokenIcon symbol='default' sx={{ fontSize: '20px' }} />
            <Typography variant='subheader1' sx={{ ml: 3 }} noWrap data-cy={`assetName`}>
              {'Stable debt ' + poolReserve.symbol}
            </Typography>
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

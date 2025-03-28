import { useEffect, useState } from 'react';

import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';

import { FormattedReservesAndIncentives } from '@lendos/types/reserves';

import { TokenIcon } from '../../components/TokenIcon';
import { useAccountContext } from '../../providers/AccountProvider';
import { useStateContext } from '../../providers/StateProvider';

interface AddTokenDropdownProps {
  poolReserve: FormattedReservesAndIncentives;
  hideAToken?: boolean;
}

export const AddTokenDropdown = ({ poolReserve, hideAToken }: AddTokenDropdownProps) => {
  const { addToken, switchNetwork, chainId: connectedChainId } = useAccountContext();
  const { currentMarketData } = useStateContext();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [changingNetwork, setChangingNetwork] = useState<boolean>(false);

  useEffect(() => {
    if (changingNetwork && currentMarketData.chain.id === connectedChainId) {
      void (async () => {
        await addToken(poolReserve.underlyingAsset);
      })();

      setChangingNetwork(false);
    }
  }, [
    addToken,
    connectedChainId,
    changingNetwork,
    currentMarketData.chain,
    currentMarketData.chain.id,
    poolReserve.aTokenAddress,
    poolReserve.underlyingAsset,
  ]);

  return (
    <>
      <Box onClick={e => setAnchorEl(e.currentTarget)}>
        <IconButton color={'primary'}>
          <AccountBalanceWalletOutlinedIcon
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
          key='underlying'
          value='underlying'
          divider
          onClick={() => {
            void (async () => {
              if (currentMarketData.chain.id !== connectedChainId) {
                switchNetwork(currentMarketData.chain.id);
                setChangingNetwork(true);
              } else {
                await addToken(poolReserve.underlyingAsset);
              }
              setAnchorEl(null);
            });
          }}
        >
          <TokenIcon symbol={poolReserve.iconSymbol} sx={{ fontSize: '20px' }} />
          <Typography variant='subheader1' sx={{ ml: 3 }} noWrap data-cy={`assetName`}>
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
              key='atoken'
              value='atoken'
              onClick={() => {
                void (async () => {
                  if (currentMarketData.chain.id !== connectedChainId) {
                    switchNetwork(currentMarketData.chain.id);
                    setChangingNetwork(true);
                  } else {
                    await addToken(poolReserve.underlyingAsset);
                  }
                  setAnchorEl(null);
                });
              }}
            >
              <TokenIcon symbol={poolReserve.iconSymbol} sx={{ fontSize: '20px' }} aToken={true} />
              <Typography variant='subheader1' sx={{ ml: 3 }} noWrap data-cy={`assetName`}>
                {`a${poolReserve.symbol}`}
              </Typography>
            </MenuItem>
          </Box>
        )}
      </Menu>
    </>
  );
};

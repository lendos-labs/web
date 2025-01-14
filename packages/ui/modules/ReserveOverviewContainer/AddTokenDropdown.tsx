import { useEffect, useState } from 'react';

import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';

import { FormattedReservesAndIncentives } from '@lendos/types/reserves';

import { Base64Token } from '../../components/Base64Token';
import { TokenIcon } from '../../components/TokenIcon';
import { useAccountContext } from '../../providers/AccountProvider';
import { useStateContext } from '../../providers/StateProvider';

interface AddTokenDropdownProps {
  poolReserve: FormattedReservesAndIncentives;
  hideAToken?: boolean;
}

export const AddTokenDropdown = ({
  poolReserve,

  hideAToken,
}: AddTokenDropdownProps) => {
  const { addToken, switchNetwork, chainId: connectedChainId } = useAccountContext();
  const { currentMarketData } = useStateContext();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [changingNetwork, setChangingNetwork] = useState<boolean>(false);
  const [underlyingBase64, setUnderlyingBase64] = useState('');
  const [, setATokenBase64] = useState('');

  // The switchNetwork function has no return type, so to detect if a user successfully switched networks before adding token to wallet, check the selected vs connected chain id
  useEffect(() => {
    if (changingNetwork && (currentMarketData.chainId as number) === connectedChainId) {
      void (async () => {
        await addToken();
      })();
      //   {
      //   address: poolReserve.underlyingAsset,
      //   decimals: poolReserve.decimals,
      //   symbol: poolReserve.symbol,
      //   image: !/_/.test(poolReserve.iconSymbol) ? underlyingBase64 : undefined,
      // }
      setChangingNetwork(false);
    }
  }, [addToken, connectedChainId, changingNetwork, underlyingBase64, currentMarketData.chainId]);

  return (
    <>
      {/* Load base64 token symbol for adding underlying and aTokens to wallet */}
      {poolReserve.symbol && !poolReserve.symbol.includes('_') && (
        <Base64Token
          symbol={poolReserve.iconSymbol}
          onImageGenerated={!hideAToken ? setATokenBase64 : setUnderlyingBase64}
          aToken={!hideAToken ? true : false}
        />
      )}
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
              if ((currentMarketData.chainId as number) !== connectedChainId) {
                await switchNetwork();
                setChangingNetwork(true);
              } else {
                await addToken();
                // addERC20Token({
                //   address: poolReserve.underlyingAsset,
                //   decimals: poolReserve.decimals,
                //   symbol: poolReserve.symbol,
                //   image: !/_/.test(poolReserve.symbol) ? underlyingBase64 : undefined,
                // });
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
                  if ((currentMarketData.chainId as number) !== connectedChainId) {
                    await switchNetwork();
                    setChangingNetwork(true);
                  } else {
                    await addToken();
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

import { useState } from 'react';
import { Box, Button, MenuItem, MenuList, Popover } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useStateContext } from '../../providers/StateProvider';
import { MarketLogo } from '../MarketLogo';
import { Link } from '../Link';
import { Routes } from '@lendos/constants/routes';

export const NetworkSwitcher = () => {
  const { availableMarkets, availableNetworks, currentMarketData, setCurrentMarket } =
    useStateContext();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        variant='text'
        onClick={e => setAnchorEl(e.currentTarget)}
        sx={{
          p: 0,
          minWidth: 'auto',
        }}
      >
        <KeyboardArrowDownIcon
          sx={{
            fontSize: '24px',
            color: 'text.primary',
          }}
        />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 2, width: '257px' }}>
          <MenuList>
            {availableMarkets.map(m => {
              const logoNetwork = availableNetworks[m.chainId]?.networkLogoPath;
              return (
                <MenuItem
                  key={m.market}
                  sx={{
                    px: 3,
                    py: 3,
                    borderBottom: '1px solid',
                    borderColor: 'border.grey',
                    bgcolor: m.market === currentMarketData.market ? 'action.hover' : 'transparent',
                    '&:hover': { bgcolor: 'action.hover' },
                  }}
                  onClick={() => {
                    setCurrentMarket(m.market);
                    setAnchorEl(null);
                  }}
                >
                  {logoNetwork && (
                    <MarketLogo
                      sx={{
                        width: '20px',
                        height: '20px',
                      }}
                      logo={logoNetwork}
                    />
                  )}
                  {m.marketTitle}
                </MenuItem>
              );
            })}
          </MenuList>

          <Box sx={{ p: 3, pt: 10 }}>
            <Button
              variant='white'
              component={Link}
              href={Routes.total}
              sx={{ width: '100%' }}
              onClick={() => setAnchorEl(null)}
            >
              Total Markets
            </Button>
          </Box>
        </Box>
      </Popover>
    </div>
  );
};

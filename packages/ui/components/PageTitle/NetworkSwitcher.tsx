import { useState } from 'react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Button, MenuItem, MenuList, Popover } from '@mui/material';

import { Routes } from '@lendos/constants/routes';

import { useStateContext } from '../../providers/StateProvider';
import { Link } from '../Link';
import { MarketLogo } from '../MarketLogo';

export const NetworkSwitcher = () => {
  const { availableMarkets, currentMarketData, setCurrentMarket } = useStateContext();

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
            {Object.values(availableMarkets).map(m => {
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
                  {m.chain.networkLogoPath && (
                    <MarketLogo
                      sx={{
                        width: '20px',
                        height: '20px',
                      }}
                      size='20px'
                      logo={m.chain.networkLogoPath}
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

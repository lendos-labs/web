import { useState } from 'react';

import { usePathname } from 'next/navigation';

import { Button, ListItemIcon, ListItemText, SvgIcon } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { NavigationWithSubmenu } from '@lendos/types/menu';

import { Link } from '../../../components/Link';
import { useStateContext } from '../../../providers/StateProvider';
import { earnIcons } from './constants';

export function MoreMenu({ title, subMenu }: Readonly<NavigationWithSubmenu>) {
  const pathname = usePathname();
  const { currentMarketData } = useStateContext();
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  return (
    <>
      <Button
        aria-label='more'
        id='earns-button'
        aria-controls={anchorEl ? 'more-menu' : undefined}
        aria-expanded={anchorEl ? 'true' : undefined}
        aria-haspopup='true'
        onClick={e => setAnchorEl(e.currentTarget)}
        sx={theme => ({
          color: '#F1F1F3',
          p: '10px',
          position: 'relative',
          height: '100%',
          borderLeft: `1px solid`,
          borderRight: `1px solid`,
          borderRadius: 0,
          borderColor: subMenu.some(i => i.link(currentMarketData.market) === pathname)
            ? theme => theme.palette.border.white
            : 'transparent',

          background: subMenu.some(i => i.link(currentMarketData.market) === pathname)
            ? theme.palette.gradients.menuHover
            : 'transparent',

          '&:hover': {
            background: theme.palette.gradients.menuHover,
            transition: 'all 0.25s ease',
          },
        })}
      >
        {title}
      </Button>

      <Menu
        id='earns-menu'
        MenuListProps={{
          'aria-labelledby': 'more-button',
        }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        keepMounted={true}
      >
        {subMenu
          .filter(item => !item.isVisible || item.isVisible(currentMarketData))
          .map(item => (
            <MenuItem
              component={Link}
              href={item.link(currentMarketData.market)}
              key={item.link(currentMarketData.market)}
              onClick={() => setAnchorEl(null)}
              sx={{
                borderBottom: '1px solid',
                borderColor: 'border.grey',

                '&:last-child': {
                  borderBottom: 'none',
                },
              }}
            >
              <ListItemIcon>
                <SvgIcon sx={{ fontSize: '20px', color: 'text.dark' }}>
                  {earnIcons[item.dataCy ?? '']}
                </SvgIcon>
              </ListItemIcon>
              <ListItemText>{item.title}</ListItemText>
            </MenuItem>
          ))}
      </Menu>
    </>
  );
}

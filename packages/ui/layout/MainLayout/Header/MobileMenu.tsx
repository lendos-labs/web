import { ReactNode } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SvgIcon,
  Typography,
} from '@mui/material';

import { earnsNavigation } from '@lendos/constants/routes';

import { Link } from '../../../components/Link';
import { DarkModeSwitcher } from './DarkModeSwitcher';
import { DrawerWrapper } from './DrawerWrapper';
import { MobileCloseButton } from './MobileCloseButton';
import { NavItems } from './NavItems';
import { earnIcons } from './constants';

interface MobileMenuProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  headerHeight: number;
}

const MenuItemsWrapper = ({ children, title }: { children: ReactNode; title: ReactNode }) => (
  <Box sx={{ mb: 6, '&:last-of-type': { mb: 0, '.MuiDivider-root': { display: 'none' } } }}>
    <Box sx={{ px: 2 }}>
      <Typography variant='h3' sx={{ color: 'text.primary', px: 4, py: 2 }}>
        {title}
      </Typography>

      {children}
    </Box>

    <Divider sx={{ borderColor: '#F2F3F729', mt: 6 }} />
  </Box>
);

export const MobileMenu = ({ open, setOpen, headerHeight }: MobileMenuProps) => {
  return (
    <>
      {open ? (
        <MobileCloseButton setOpen={setOpen} />
      ) : (
        <Button
          id='settings-button-mobile'
          variant='text'
          sx={{ p: '7px 8px', minWidth: 'unset' }}
          onClick={() => setOpen(true)}
        >
          <SvgIcon sx={{ color: '#F1F1F3' }} fontSize='small'>
            <MenuIcon />
          </SvgIcon>
        </Button>
      )}

      <DrawerWrapper open={open} setOpen={setOpen} headerHeight={headerHeight}>
        <MenuItemsWrapper title='Menu'>
          <NavItems setOpen={setOpen} />
        </MenuItemsWrapper>
        <MenuItemsWrapper title='Earn'>
          <List>
            {earnsNavigation.map((item, index) => (
              <ListItem component={Link} href={item.link} sx={{ color: '#F1F1F3' }} key={index}>
                <ListItemIcon sx={{ minWidth: 'unset', mr: 3 }}>
                  <SvgIcon sx={{ fontSize: '20px', color: 'text.dark' }}>
                    {earnIcons[item.link]}
                  </SvgIcon>
                </ListItemIcon>
                <ListItemText>
                  <Typography variant='buttonL' color='text.dark'>
                    {item.title}
                  </Typography>
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </MenuItemsWrapper>
        <MenuItemsWrapper title='Global settings'>
          <List>
            <DarkModeSwitcher />
          </List>
        </MenuItemsWrapper>
      </DrawerWrapper>
    </>
  );
};

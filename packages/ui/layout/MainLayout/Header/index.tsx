'use client';

import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { HideOnScroll } from './HideOnScroll';
import { Routes } from '@lendos/constants/routes';
import Image from 'next/image';
import { Link } from '../../../components/Link';

const SWITCH_VISITED_KEY = 'switchVisited';
const headerHeight = 48;

export const Header = () => {
  const { breakpoints, palette } = useTheme();
  const md = useMediaQuery(breakpoints.down('md'));
  const sm = useMediaQuery(breakpoints.down('sm'));

  const [walletWidgetOpen, setWalletWidgetOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [visitedSwitch, setVisitedSwitch] = useState<boolean>(() => {
    return typeof window === 'undefined' ? true : Boolean(localStorage.getItem(SWITCH_VISITED_KEY));
  });

  // TODO state
  // const [mobileDrawerOpen, setMobileDrawerOpen] = useRootStore(state => [
  //   state.mobileDrawerOpen,
  //   state.setMobileDrawerOpen,
  // ]);

  // const { openSwitch } = useModalContext();

  // const { currentMarketData } = useProtocolDataContext();

  // useEffect(() => {
  //   if (mobileDrawerOpen && !md) {
  //     setMobileDrawerOpen(false);
  //   }
  //   if (walletWidgetOpen) {
  //     setWalletWidgetOpen(false);
  //   }
  // }, [md]);

  // const toggleWalletWigit = (state: boolean) => {
  //   if (md) setMobileDrawerOpen(state);
  //   setWalletWidgetOpen(state);
  // };

  // const toggleMobileMenu = (state: boolean) => {
  //   if (md) setMobileDrawerOpen(state);
  //   setMobileMenuOpen(state);
  // };

  // const handleSwitchClick = () => {
  //   localStorage.setItem(SWITCH_VISITED_KEY, 'true');
  //   setVisitedSwitch(true);
  //   openSwitch();
  // };

  return (
    <HideOnScroll>
      <Box
        component='header'
        sx={theme => ({
          height: headerHeight,
          position: 'sticky',
          top: 0,
          transition: theme.transitions.create('top'),
          zIndex: theme.zIndex.appBar,
          bgcolor: theme.palette.background.header,
          padding: {
            xs: mobileMenuOpen || walletWidgetOpen ? '0 20px' : '0 8px 0 20px',
            xsm: '0 20px',
          },
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'space-between',
          justifyContent: 'space-between',
          width: '100%',
        })}
      >
        <Box display='flex' alignItems='center'>
          <Box
            component={Link}
            href={Routes.dashboard}
            aria-label='Go to homepage'
            sx={{
              lineHeight: 0,
              mr: 3,
              transition: '0.3s ease all',
              '&:hover': { opacity: 0.7 },
            }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Image src='./lendosLogo.svg' alt='lendOS' width={72} height={20} />
          </Box>
        </Box>
      </Box>
    </HideOnScroll>
  );
};

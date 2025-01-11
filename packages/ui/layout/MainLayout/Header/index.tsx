'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { ArrowsRightLeftIcon } from '@heroicons/react/16/solid';
import { Badge, Box, Button, SvgIcon, styled, useMediaQuery, useTheme } from '@mui/material';
import { getCookie, setCookie } from 'cookies-next';

import { isFeatureEnabled } from '@lendos/constants/markets';
import { Routes } from '@lendos/constants/routes';

import { Link } from '../../../components/Link';
import { useModalContext } from '../../../providers/ModalProvider';
import { useStateContext } from '../../../providers/StateProvider';
import { HideOnScroll } from './HideOnScroll';
import { MobileMenu } from './MobileMenu';
import { NavItems } from './NavItems';
import { SettingsMenu } from './SettingsMenu';
import { WalletWidget } from './WalletWidget';

const SWITCH_VISITED_KEY = 'switchVisited';
const headerHeight = 48;

export const Header = () => {
  const { breakpoints, palette } = useTheme();
  const md = useMediaQuery(breakpoints.down('md'));
  const sm = useMediaQuery(breakpoints.down('sm'));

  const [walletWidgetOpen, setWalletWidgetOpen] = useState<boolean>(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [visitedSwitch, setVisitedSwitch] = useState<boolean>(() => {
    return Boolean(getCookie(SWITCH_VISITED_KEY));
  });

  const { openSwitch } = useModalContext();

  const { currentMarketData } = useStateContext();

  useEffect(() => {
    if (mobileDrawerOpen && !md) {
      setMobileDrawerOpen(false);
    }
    if (walletWidgetOpen) {
      setWalletWidgetOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- call for first render
  }, [md]);

  const toggleWalletWigit = (state: boolean) => {
    if (md) {
      setMobileDrawerOpen(state);
    }
    setWalletWidgetOpen(state);
  };

  const toggleMobileMenu = (state: boolean) => {
    if (md) {
      setMobileDrawerOpen(state);
    }
    setMobileMenuOpen(state);
  };

  const handleSwitchClick = () => {
    void setCookie(SWITCH_VISITED_KEY, 'true');
    setVisitedSwitch(true);
    openSwitch();
  };

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
            <Image
              src='/lendosLogo.svg'
              alt='lendOS'
              width={72}
              height={20}
              // TODO add this if nedded
              // sx={{
              //   ...(palette.mode === 'dark' && {
              //     mixBlendMode: 'plus-lighter',
              //   }),
              // }}
            />
          </Box>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, height: '100%' }}>
          <NavItems />
        </Box>
        <Box display='flex' alignItems='center' gap={3}>
          {isFeatureEnabled.borrowBoost(currentMarketData) && (
            <Button
              component={Link}
              href={Routes.borrowBoost}
              variant='white'
              sx={{
                gap: 2,
                alignItems: 'center',
                width: { xs: '28px', md: '173px' },
                minWidth: 0,
                height: { xs: '28px', md: '36px' },
              }}
              aria-label='Switch tool'
            >
              <Image src='/rocket.png' alt='rocket' width={md ? 20 : 16} height={md ? 20 : 16} />
              {!md && 'Borrow Boost'}
            </Button>
          )}
          {isFeatureEnabled.borrowBoost(currentMarketData) && (
            <StyledBadge invisible={visitedSwitch} variant='dot' badgeContent='' color='secondary'>
              <Button
                onClick={handleSwitchClick}
                id='swap-tokens'
                variant={palette.mode === 'dark' ? 'white' : 'switch'}
                sx={{
                  gap: 2,
                  alignItems: 'center',
                  width: { xs: '28px', md: '173px' },
                  minWidth: 0,
                  height: { xs: '28px', md: '36px' },
                }}
                aria-label='Switch tool'
              >
                {!md && 'Swap tokens'}
                <SvgIcon sx={{ fontSize: { xs: 16, md: 20 } }}>
                  <ArrowsRightLeftIcon />
                </SvgIcon>
              </Button>
            </StyledBadge>
          )}
          {!mobileMenuOpen && (
            <Box display='flex' alignItems='center' gap={sm ? 2 : 7}>
              <WalletWidget
                open={walletWidgetOpen}
                setOpen={toggleWalletWigit}
                headerHeight={headerHeight}
              />
            </Box>
          )}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <SettingsMenu />
          </Box>
          {!walletWidgetOpen && (
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <MobileMenu
                open={mobileMenuOpen}
                setOpen={toggleMobileMenu}
                headerHeight={headerHeight}
              />
            </Box>
          )}
        </Box>
      </Box>
    </HideOnScroll>
  );
};

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    top: '2px',
    right: '2px',
    borderRadius: '20px',
    width: '10px',
    height: '10px',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.main,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

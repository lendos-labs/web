'use client';

import { usePathname } from 'next/navigation';

import { Button, List, ListItem, Typography, useMediaQuery, useTheme } from '@mui/material';

import { navigation } from '@lendos/constants/routes';

import { Link } from '../../../components/Link';
import { useStateContext } from '../../../providers/StateProvider';
import { MoreMenu } from './MoreMenu';

interface NavItemsProps {
  setOpen?: (value: boolean) => void;
}

export const NavItems = ({ setOpen }: NavItemsProps) => {
  const { currentMarketData } = useStateContext();

  const pathname = usePathname();

  const { breakpoints } = useTheme();
  const md = useMediaQuery(breakpoints.down('md'));

  const handleClick = (isMd: boolean) => {
    if (isMd && setOpen) {
      setOpen(false);
    }
  };

  return (
    <List
      sx={{
        display: 'flex',
        alignItems: { xs: 'flex-start', md: 'center' },
        flexDirection: { xs: 'column', md: 'row' },
        height: '100%',
      }}
      disablePadding
    >
      {navigation
        .filter(item => !item.isVisible || item.isVisible(currentMarketData))
        .filter(item => !md || item.isMobile)
        .map(item => (
          <ListItem
            sx={{
              width: { xs: '100%', md: 'unset' },
              height: '100%',
            }}
            data-cy={item.dataCy}
            disablePadding
            key={item.title}
          >
            {'link' in item ? (
              <>
                {md ? (
                  <Typography
                    component={Link}
                    href={item.link}
                    variant='buttonL'
                    color={'text.dark'}
                    sx={{ width: '100%', p: 4, opacity: pathname === item.link ? 1 : 0.4 }}
                    onClick={() => handleClick(true)}
                  >
                    {item.title}
                  </Typography>
                ) : (
                  <Button
                    component={Link}
                    onClick={() => handleClick(false)}
                    href={item.link}
                    sx={theme => ({
                      color: '#F1F1F3',
                      p: '10px',
                      position: 'relative',
                      height: '100%',
                      borderLeft: `1px solid`,
                      borderRight: `1px solid`,
                      borderColor:
                        pathname === item.link
                          ? theme => theme.palette.border.white
                          : 'transparent',
                      borderRadius: 0,
                      background:
                        pathname === item.link ? theme.palette.gradients.menuHover : 'transparent',

                      '&:hover': {
                        background: theme.palette.gradients.menuHover,
                        transition: 'all 0.25s ease',
                      },
                    })}
                  >
                    {item.title}
                  </Button>
                )}
              </>
            ) : (
              <MoreMenu {...item} />
            )}
          </ListItem>
        ))}
    </List>
  );
};

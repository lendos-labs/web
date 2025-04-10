import { useState } from 'react';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import OpenInNewOffIcon from '@mui/icons-material/OpenInNewOff';
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Skeleton,
  SvgIcon,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { CompactMode } from '../../../components/CompactableTypography';
import { Link } from '../../../components/Link';
import { UserDisplay } from '../../../components/UserDisplay';
import { useAccountContext } from '../../../providers/AccountProvider';
import { useStateContext } from '../../../providers/StateProvider';
import { DrawerWrapper } from './DrawerWrapper';
import { MobileCloseButton } from './MobileCloseButton';

interface WalletWidgetProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  headerHeight: number;
}

export const WalletWidget = ({ open, setOpen, headerHeight }: WalletWidgetProps) => {
  const { account, connected, loading, connect, disconnect } = useAccountContext();
  const { currentMarketData } = useStateContext();
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const { breakpoints, palette } = useTheme();
  const xsm = useMediaQuery(breakpoints.down('xsm'));
  const md = useMediaQuery(breakpoints.down('md'));

  const handleDisconnect = () => {
    if (connected) {
      disconnect();
      setOpen(false);
    }
  };

  const handleSwitchWallet = () => {
    connect();
    setOpen(false);
  };

  const Content = ({ component = ListItem }: { component?: typeof MenuItem | typeof ListItem }) => (
    <>
      <Typography
        variant='subheader2'
        sx={{
          display: { xs: 'block', md: 'none' },
          color: '#A5A8B6',
          px: 4,
          py: 2,
        }}
      >
        Account
      </Typography>
      <Box component={component} disabled>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <UserDisplay
            titleProps={{
              typography: 'h4',
              addressCompactMode: CompactMode.MD,
            }}
          />
        </Box>
      </Box>
      {!md && (
        <Box sx={{ display: 'flex', flexDirection: 'row', padding: '0 16px 10px', gap: 4 }}>
          <Button variant='white' size='small' onClick={handleSwitchWallet}>
            Switch wallet
          </Button>
          <Button
            variant='white'
            size='small'
            onClick={handleDisconnect}
            data-cy={`disconnect-wallet`}
          >
            Disconnect
          </Button>
        </Box>
      )}
      <Divider
        sx={{
          mt: { xs: 4, md: 0 },
          mb: { xs: 6, md: 0 },
          borderColor: { xs: '#FFFFFF1F', md: 'divider' },
        }}
      />

      <Box component={component} disabled>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 3,
            }}
          >
            <Typography variant='h3'>Network</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                bgcolor: currentMarketData.chain.testnet ? '#7157ff' : '#65c970',
                width: 12,
                height: 12,
                mr: 2,
                boxShadow: '0px 2px 1px rgba(0, 0, 0, 0.05), 0px 0px 1px rgba(0, 0, 0, 0.25)',
                borderRadius: '50%',
              }}
            />
            <Typography variant='h3'>{currentMarketData.chain.name}</Typography>
          </Box>
        </Box>
      </Box>
      <Divider
        sx={{
          mt: { xs: 10, md: 0 },
          mb: { xs: 4, md: 0 },
          borderColor: { xs: '#FFFFFF1F', md: 'divider' },
        }}
      />

      <Box
        component={component}
        sx={{ color: 'text.dark', cursor: 'pointer' }}
        onClick={() => {
          void (async () => {
            await navigator.clipboard.writeText(account ?? '');
            setOpen(false);
          })();
        }}
      >
        <ListItemIcon
          sx={{
            color: {
              xs: 'text.dark',
              md: 'text.dark',
              minWidth: 'unset',
              marginRight: 12,
            },
          }}
        >
          <SvgIcon fontSize='small'>
            <ContentCopyIcon />
          </SvgIcon>
        </ListItemIcon>
        <ListItemText>
          <Typography variant='buttonS'>Copy address</Typography>
        </ListItemText>
      </Box>

      <Link href={currentMarketData.chain.explorerLinkBuilder({ address: account ?? '' })}>
        <Box component={component} sx={{ color: 'text.dark' }} onClick={() => setOpen(false)}>
          <ListItemIcon
            sx={{
              color: {
                xs: 'text.dark',
                md: 'text.dark',
                minWidth: 'unset',
                marginRight: 12,
              },
            }}
          >
            <SvgIcon fontSize='small'>
              <OpenInNewOffIcon />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText>
            <Typography variant='buttonS'>View on Explorer</Typography>
          </ListItemText>
        </Box>
      </Link>
      {md && (
        <>
          <Divider sx={{ my: { xs: 7, md: 0 }, borderColor: { xs: '#FFFFFF1F', md: 'divider' } }} />
          <Box sx={{ padding: '16px 16px 10px' }}>
            <Button
              sx={{
                marginBottom: '16px',
                background: '#383D51',
                color: '#F1F1F3',
              }}
              fullWidth
              size='large'
              variant={palette.mode === 'dark' ? 'outlined' : 'text'}
              onClick={handleSwitchWallet}
            >
              Switch wallet
            </Button>
            <Button
              sx={{
                background: '#383D51',
                color: '#F1F1F3',
              }}
              fullWidth
              size='large'
              variant={palette.mode === 'dark' ? 'outlined' : 'text'}
              onClick={handleDisconnect}
            >
              Disconnect
            </Button>
          </Box>
        </>
      )}
    </>
  );

  if (md && connected && open) {
    return <MobileCloseButton setOpen={setOpen} />;
  }

  return (
    <>
      {loading ? (
        <Skeleton height={36} sx={{ width: { sx: '110px', md: '173px' } }} />
      ) : (
        <Button
          variant={'white'}
          aria-label='wallet'
          id='wallet-button'
          aria-controls={open ? 'wallet-button' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup='true'
          onClick={event => {
            if (!connected) {
              connect();
            } else {
              setOpen(true);
              setAnchorEl(event.currentTarget);
            }
          }}
          sx={{
            p: connected ? '5px 8px' : undefined,
            minWidth: xsm ? 'unset' : undefined,
            width: { sx: '110px', md: '173px' },
            fontWeight: 600,
          }}
        >
          {connected ? <UserDisplay titleProps={{ variant: 'buttonM' }} /> : 'Connect wallet'}
        </Button>
      )}
      {md ? (
        <DrawerWrapper open={open} setOpen={setOpen} headerHeight={headerHeight}>
          <List sx={{ px: 2, '.MuiListItem-root.Mui-disabled': { opacity: 1 } }}>
            <Content />
          </List>
        </DrawerWrapper>
      ) : (
        <Menu
          id='wallet-menu'
          MenuListProps={{
            'aria-labelledby': 'wallet-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={() => setOpen(false)}
          keepMounted={true}
        >
          <MenuList disablePadding sx={{ '.MuiMenuItem-root.Mui-disabled': { opacity: 1 } }}>
            <Content component={MenuItem} />
          </MenuList>
        </Menu>
      )}
    </>
  );
};

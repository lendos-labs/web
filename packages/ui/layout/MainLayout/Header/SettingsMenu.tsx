import { useState } from 'react';

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Button, Menu, MenuItem, SvgIcon, Typography } from '@mui/material';

import { DarkModeSwitcher } from './DarkModeSwitcher';

export function SettingsMenu() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  return (
    <>
      <Button
        aria-label='settings'
        id='settings-button'
        aria-controls={settingsOpen ? 'settings-menu' : undefined}
        aria-expanded={settingsOpen ? 'true' : undefined}
        aria-haspopup='true'
        onClick={e => {
          setAnchorEl(e.currentTarget);
          setSettingsOpen(true);
        }}
        sx={{ p: '7px 8px', minWidth: 'unset' }}
        variant='white'
      >
        <SvgIcon sx={{ color: 'text.dark' }} fontSize='small'>
          <SettingsOutlinedIcon />
        </SvgIcon>
      </Button>

      <Menu
        id='settings-menu'
        MenuListProps={{
          'aria-labelledby': 'settings-button',
        }}
        anchorEl={anchorEl}
        open={settingsOpen}
        onClose={() => {
          setAnchorEl(null);
          setSettingsOpen(false);
        }}
        sx={{ '.MuiMenuItem-root.Mui-disabled': { opacity: 1 } }}
        keepMounted={true}
      >
        <MenuItem disabled sx={{ mb: '4px' }}>
          <Typography variant='subheader2' color='text.secondary'>
            Global settings
          </Typography>
        </MenuItem>

        <DarkModeSwitcher component={MenuItem} />
      </Menu>
    </>
  );
}

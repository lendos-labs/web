import {
  Box,
  FormControlLabel,
  ListItem,
  ListItemText,
  MenuItem,
  Switch,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext } from '../../MuiLayout';

interface DarkModeSwitcherProps {
  component?: typeof MenuItem | typeof ListItem;
}

export const DarkModeSwitcher = ({ component = ListItem }: DarkModeSwitcherProps) => {
  const theme = useTheme();
  const { breakpoints } = useTheme();
  const md = useMediaQuery(breakpoints.down('md'));
  const colorMode = useContext(ColorModeContext);

  return (
    <Box
      component={component}
      onClick={colorMode.toggleColorMode}
      sx={{
        color: 'text.primary',
        py: { xs: 1.5, md: 2 },
      }}
    >
      <ListItemText>
        {md ? <Typography variant='buttonL'>Dark mode</Typography> : <>Dark mode</>}
      </ListItemText>
      <FormControlLabel
        sx={{ mr: 0 }}
        value='darkmode'
        control={<Switch disableRipple checked={theme.palette.mode === 'dark'} />}
        label={theme.palette.mode === 'dark' ? 'On' : 'Off'}
        labelPlacement='start'
      />
    </Box>
  );
};

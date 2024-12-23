'use client';

import { useMediaQuery } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';
import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { getDesignTokens, getThemedComponents } from '../../theme/theme';
import { getCookie } from 'cookies-next';

export const ColorModeContext = createContext({
  toggleColorMode: () => {
    //
  },
});

type Mode = 'light' | 'dark';

export const MuiLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<Mode>(prefersDarkMode ? 'dark' : 'light');

  const colorMode = useMemo(() => {
    return {
      toggleColorMode: () => {
        setMode(prevMode => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          document.cookie = `colorMode=${newMode};path=/`;
          return newMode;
        });
      },
    };
  }, []);

  const theme = useMemo(() => {
    const themeCreate = createTheme(getDesignTokens(mode));
    return deepmerge(themeCreate, getThemedComponents(themeCreate));
  }, [mode]);

  useEffect(() => {
    const cookieMode = getCookie('colorMode') as Mode | undefined;
    const initialMode = cookieMode ?? (prefersDarkMode ? 'dark' : 'light');

    setMode(initialMode);
  }, [prefersDarkMode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

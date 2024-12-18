'use client';

import { ThemeProvider } from '@mui/material';
import { ReactNode } from 'react';

import { theme } from 'theme/theme';

export const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

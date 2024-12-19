'use client';

import { ThemeProvider } from '@mui/material';
import React, { ReactNode } from 'react';
import { theme } from 'theme/theme.js';

export const MuiLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment -- TODO fix it */
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

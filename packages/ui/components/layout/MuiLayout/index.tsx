
import { ThemeProvider } from '@mui/material';
import { ReactNode } from 'react';
import { theme } from '../../../src/theme/theme';

export const MuiLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

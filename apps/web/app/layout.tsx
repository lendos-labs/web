import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { cookieToInitialState } from 'wagmi';
import { aldrich, montserrat } from '@lendos/ui/fonts';
import { wagmiConfig } from '../src/config/connectors';
import '../src/globals.css';
import { Providers } from '../src/providers.tsx';
import { ChildrenProps } from '../src/types/common';
import { Box } from '@mui/material';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

async function RootLayout({ children }: ChildrenProps) {
  const head = await headers();
  const wagmiInitialState = cookieToInitialState(wagmiConfig, head.get('cookie'));

  return (
    <html lang='en'>
      <Box
        component='body'
        className={`${aldrich.variable} ${montserrat.variable} font-sans`}
        display='flex'
        flexDirection='column'
        minHeight={'100dvh'}
      >
        <AppRouterCacheProvider>
          <Providers initialState={wagmiInitialState}>{children}</Providers>
        </AppRouterCacheProvider>
      </Box>
    </html>
  );
}

export default RootLayout;

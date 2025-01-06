import type { Metadata } from 'next';
import { headers } from 'next/headers';

import { Box } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { cookieToInitialState } from 'wagmi';

import { aldrich, montserrat } from '@lendos/ui/fonts';

import { wagmiConfig } from '../src/config/connectors.ts';
import { Providers } from '../src/providers.tsx';
import { ChildrenProps } from '../src/types/common.ts';

export const metadata: Metadata = {
  title: 'lendOS',
  description:
    'lendOS is a lending and borrowing infrastructure on Fuel, Neon EVM and Hemi to enable capital efficiency and provide Solana users with EVM-based native lending protocol.',
  icons: {
    icon: '/favicon.svg',
  },
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

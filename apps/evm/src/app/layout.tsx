import type { Metadata } from 'next';
import { cookies, headers } from 'next/headers';

import { Box } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

import { aldrich, montserrat } from '@lendos/ui/fonts';

import { CookieKey } from '@lendos/constants/cookie';

import { marketsData } from '../config/supported-markets';
import { Providers } from '../providers';
import { ChildrenProps } from '../types/common';

export const metadata: Metadata = {
  title: 'lendOS',
  description:
    'lendOS is a lending and borrowing infrastructure on Fuel, Neon EVM and Hemi to enable capital efficiency and provide Solana users with EVM-based native lending protocol.',
  icons: {
    icon: '/favicon.svg',
  },
};

async function RootLayout({
  children,
}: ChildrenProps & {
  params: unknown;
}) {
  const head = await headers();
  const cookieStore = await cookies();

  const pathname = head.get('x-pathname');

  const markets = Object.values(marketsData);

  const marketFromPath = markets.find(i => i.market === pathname?.split('/')[1]);
  const selectedMarket =
    marketFromPath?.market ??
    cookieStore.get(CookieKey.SELECTED_MARKET)?.value ??
    markets[0]?.market;

  const showZeroAssets = cookieStore.get(CookieKey.SHOW_ZERO_ASSETS)?.value;
  const showZeroLps = cookieStore.get(CookieKey.SHOW_ZERO_LPS)?.value;

  return (
    <html lang='en' suppressHydrationWarning>
      <Box
        component='body'
        className={`${aldrich.variable} ${montserrat.variable} font-sans`}
        display='flex'
        flexDirection='column'
        minHeight={'100dvh'}
        suppressHydrationWarning
      >
        <AppRouterCacheProvider>
          <Providers
            appState={{
              selectedMarket: selectedMarket ?? '',
              [CookieKey.SHOW_ZERO_ASSETS]: showZeroAssets === 'true' ? true : false,
              [CookieKey.SHOW_ZERO_LPS]: showZeroLps === 'true' ? true : false,
            }}
          >
            {children}
          </Providers>
        </AppRouterCacheProvider>
      </Box>
    </html>
  );
}

export default RootLayout;

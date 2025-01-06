'use client';

import { ReactNode } from 'react';

import { usePathname } from 'next/navigation';

import { EarnLayout } from '@lendos/ui/layout/EarnLayout';
import { useStateContext } from '@lendos/ui/providers/StateProvider';

import { Routes } from '@lendos/constants/routes';

export default function AppLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { currentMarketData } = useStateContext();
  const loading = false;
  const data = {
    totalLiquidity: BigInt(0),
    totalDebt: BigInt(0),
  };
  const pathname = usePathname();

  return (
    <EarnLayout
      loading={loading}
      data={data}
      showTab={pathname !== `/${currentMarketData.market}${Routes.strategies}`}
    >
      {children}
    </EarnLayout>
  );
}

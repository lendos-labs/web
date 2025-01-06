'use client';

import { ReactNode } from 'react';

import { usePathname } from 'next/navigation';

import { EarnLayout } from '@lendos/ui/layout/EarnLayout';

import { Routes } from '@lendos/constants/routes';

export default function AppLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const loading = false;
  const data = {
    totalLiquidity: BigInt(0),
    totalDebt: BigInt(0),
  };
  const pathname = usePathname() as Routes;

  return (
    <EarnLayout loading={loading} data={data} showTab={pathname !== Routes.strategies}>
      {children}
    </EarnLayout>
  );
}

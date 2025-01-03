import { EarnLayout } from '@lendos/ui/layout/EarnLayout';
import { ReactNode } from 'react';
import { headers } from 'next/headers';

export default async function AppLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const loading = false;
  const data = {
    totalLiquidity: BigInt(0),
    totalDebt: BigInt(0),
  };
  const headersList = await headers();
  const activePath = headersList.get('referer');
  const path = activePath?.split('/').pop();

  return (
    <EarnLayout loading={loading} data={data} showTab={path !== 'strategies'}>
      {children}
    </EarnLayout>
  );
}

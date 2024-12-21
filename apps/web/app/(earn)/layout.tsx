import { EarnLayout } from '@lendos/ui/layout/EarnLayout';
import { ReactNode } from 'react';

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
  return (
    <EarnLayout loading={loading} data={data}>
      {children}
    </EarnLayout>
  );
}

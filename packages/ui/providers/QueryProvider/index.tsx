import { PropsWithChildren } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@lendos/constants/queryClient';

function QueryProvider({ children }: Readonly<PropsWithChildren>) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default QueryProvider;

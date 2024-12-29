import { createContext, useContext } from 'react';

export interface BalanceContextType {
  loading: boolean;
  hasEmptyWallet: boolean;
  walletBalances: Record<string, { amount: string; amountUSD: string }>;
}

export const BalanceContext = createContext<BalanceContextType>({} as BalanceContextType);

export const useBalanceContext = () => {
  const context = useContext(BalanceContext);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- check is hook call inside provider
  if (!context) {
    throw new Error('useBalanceContext must be used within a useBalanceContext');
  }

  return context;
};

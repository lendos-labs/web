import { createContext, useContext } from 'react';
import { ExtendedFormattedUser } from '@lendos/types/user';

export interface AccountContextType {
  account: string | null;
  accountSummary: {
    data: ExtendedFormattedUser | undefined;
    loading: boolean;
    error: unknown;
  };
  connected: boolean;
  loading: boolean;
  connect: () => void;
  disconnect: () => void;
}

export const AccountContext = createContext<AccountContextType>({} as AccountContextType);

export const useAccountContext = () => {
  const context = useContext(AccountContext);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- check is hook call inside provider
  if (!context) {
    throw new Error('useAccountContext must be used within a AccountContext');
  }

  return context;
};

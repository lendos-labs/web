import { Dispatch, SetStateAction, createContext, useContext } from 'react';

import { Address } from '@lendos/constants/common';

export interface AccountContextType {
  account: Address | null;
  chainId: number;
  connected: boolean;
  loading: boolean;
  switchNetworkError: Error | undefined;
  setSwitchNetworkError: Dispatch<SetStateAction<Error | undefined>>;
  addToken: () => Promise<void>;
  switchNetwork: () => Promise<void>;
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

import React, { ReactNode } from 'react';

// import { useQuery } from '@tanstack/react-query';
// import { useQueryClient } from '@tanstack/react-query';
import { Address, parseUnits } from 'viem';
import { useAccount, useSendTransaction } from 'wagmi';

import { useStateContext } from '@lendos/ui/providers/StateProvider';
import { TransactionContext } from '@lendos/ui/providers/TransactionProvider';

import { TransactionBuilder } from './services/transaction-builder';

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const { address } = useAccount();
  const { currentMarketData } = useStateContext();
  // const queryClient = useQueryClient();

  // useQuery({
  //   queryFn: () => approvedAmountService.getPoolApprovedAmount(marketData, user, token),
  //   // queryKey: queryKeysFactory.poolApprovedAmount(user, token, marketData),
  // });

  const { sendTransactionAsync } = useSendTransaction();

  const txBuilder = new TransactionBuilder(currentMarketData);

  const supply = async (reserve: Address, amount: string, decimals: number) => {
    const txData = txBuilder.prepareSupply(reserve, parseUnits(amount, decimals), address ?? '0x');
    const gas = await txBuilder.estimateGas(txData);
    const txHash = await sendTransactionAsync({ ...txData, gas });
    // queryClient.invalidateQueries({ queryKey: queryKeysFactory.pool });
    return txHash;
  };
  return (
    <TransactionContext.Provider
      value={{
        supply,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

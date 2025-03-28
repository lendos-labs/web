import { useQueryClient } from '@tanstack/react-query';
import { sendTransaction, waitForTransactionReceipt } from '@wagmi/core';
import { Address } from 'viem';
import { useAccount } from 'wagmi';

import { useStateContext } from '@lendos/ui/providers/StateProvider';

import { queryKeysFactory } from '@lendos/constants/queries';

import { wagmiConfigCore } from '../config/connectors';
import { TransactionBuilder } from '../services/transaction-builder';
import { EvmMarketDataType } from '../types/common';

export const useWithdraw = () => {
  const { address } = useAccount();

  const queryClient = useQueryClient();
  const { currentMarketData } = useStateContext();

  const txBuilder = new TransactionBuilder(currentMarketData as EvmMarketDataType);

  const withdraw = async (reserve: string, amount: string, decimals: number) => {
    const txData = txBuilder.prepareWithdraw(reserve as Address, amount, address ?? '0x', decimals);
    const gas = await txBuilder.estimateGas(txData);

    const hash = await sendTransaction(wagmiConfigCore, {
      ...txData,
      gas,
    });

    await waitForTransactionReceipt(wagmiConfigCore, {
      hash,
    });
    await queryClient.invalidateQueries({ queryKey: queryKeysFactory.pool });

    return hash as string;
  };

  return {
    action: withdraw,
  };
};

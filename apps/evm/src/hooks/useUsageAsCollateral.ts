import { estimateFeesPerGas, sendTransaction, waitForTransactionReceipt } from '@wagmi/core';
import { Address } from 'viem';
import { useAccount } from 'wagmi';

import { useStateContext } from '@lendos/ui/providers/StateProvider';

import { queryKeysFactory } from '@lendos/constants/queries';
import { queryClient } from '@lendos/constants/queryClient';

import { wagmiConfigCore } from '../config/connectors.ts';
import { TransactionBuilder } from '../services/transaction-builder';
import { EvmMarketDataType } from '../types/common';

export const useUsageAsCollateral = () => {
  const { address } = useAccount();

  const { currentMarketData } = useStateContext();
  const chainId = currentMarketData.chain.id as number;

  const txBuilder = new TransactionBuilder(currentMarketData as EvmMarketDataType);

  const setUsageAsCollateral = async (reserve: Address, usageAsCollateral: boolean) => {
    if (!address) {
      return '';
    }

    const txData = txBuilder.prepareSetUsageAsCollateral(reserve, usageAsCollateral, address);

    const result = await estimateFeesPerGas(wagmiConfigCore, {
      chainId,
    });

    const gas = await txBuilder.estimateGas({ ...txData, chainId });

    const hash = await sendTransaction(wagmiConfigCore, {
      ...txData,
      gas,
      maxFeePerGas: result.maxFeePerGas,
      maxPriorityFeePerGas: result.maxPriorityFeePerGas,
      chainId,
    });

    await waitForTransactionReceipt(wagmiConfigCore, {
      hash,
    });

    await queryClient.invalidateQueries({ queryKey: queryKeysFactory.pool });

    return hash as string;
  };

  return {
    action: setUsageAsCollateral,
  };
};

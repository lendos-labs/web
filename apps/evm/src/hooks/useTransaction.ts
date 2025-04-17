import { useQueryClient } from '@tanstack/react-query';
import {
  EstimateGasParameters,
  estimateFeesPerGas,
  sendTransaction,
  waitForTransactionReceipt,
} from '@wagmi/core';
import { Address } from 'viem';
import { useAccount } from 'wagmi';

import { useStateContext } from '@lendos/ui/providers/StateProvider';

import { queryKeysFactory } from '@lendos/constants/queries';

import { wagmiConfigCore } from '../config/connectors';
import { TransactionBuilder } from '../services/transaction-builder';
import { EvmMarketDataType } from '../types/common';
import { getAllowance } from './usePoolApprovedAmount';

export const useTransaction = () => {
  const { address } = useAccount();
  const queryClient = useQueryClient();
  const { currentMarketData } = useStateContext();
  const chainId = currentMarketData.chain.id as number;

  const txBuilder = new TransactionBuilder(currentMarketData as EvmMarketDataType);

  const action = async (txData: EstimateGasParameters, reserve: Address) => {
    if (!address) {
      return '';
    }

    const approvedAmount = await getAllowance(
      reserve,
      address,
      currentMarketData as EvmMarketDataType,
    );

    const result = await estimateFeesPerGas(wagmiConfigCore, {
      chainId,
    });

    const txDataApproval = txBuilder.prepareApproval(approvedAmount);

    const gasApproval = await txBuilder.estimateGas({
      ...txDataApproval,
      chainId,
    });

    const hashApproval = await sendTransaction(wagmiConfigCore, {
      ...txDataApproval,
      gas: gasApproval,
      maxFeePerGas: result.maxFeePerGas,
      maxPriorityFeePerGas: result.maxPriorityFeePerGas,
      chainId,
    });

    await waitForTransactionReceipt(wagmiConfigCore, {
      hash: hashApproval,
    });

    const gas = await txBuilder.estimateGas(txData);

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
    action,
  };
};

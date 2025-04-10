import { estimateFeesPerGas, sendTransaction, waitForTransactionReceipt } from '@wagmi/core';
import { Address } from 'viem';
import { useAccount } from 'wagmi';

import { useStateContext } from '@lendos/ui/providers/StateProvider';

import { queryKeysFactory } from '@lendos/constants/queries';
import { queryClient } from '@lendos/constants/queryClient';

import { wagmiConfigCore } from '../config/connectors.ts';
import { TransactionBuilder } from '../services/transaction-builder';
import { EvmMarketDataType } from '../types/common';
import { getAllowance } from './usePoolApprovedAmount';

export const useWithdraw = () => {
  const { address } = useAccount();

  const { currentMarketData } = useStateContext();
  const chainId = currentMarketData.chain.id as number;

  const txBuilder = new TransactionBuilder(currentMarketData as EvmMarketDataType);

  const withdraw = async (reserve: Address, amount: string, decimals: number) => {
    if (!address) {
      return '';
    }
    
    const approvedAmount = await getAllowance(
      reserve,
      address,
      currentMarketData as EvmMarketDataType,
    );

    const txData = txBuilder.prepareWithdraw(reserve, amount, address, decimals);
    const txDataApproval = txBuilder.prepareApproval(approvedAmount);
    // if(wallet === 'solana') {
    //
    // }
    const gasApproval = await txBuilder.estimateGas({
      ...txDataApproval,
      chainId,
    });
    const result = await estimateFeesPerGas(wagmiConfigCore, {
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
    action: withdraw,
  };
};

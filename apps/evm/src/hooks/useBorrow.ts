import { useQueryClient } from '@tanstack/react-query';
import { estimateFeesPerGas, sendTransaction, waitForTransactionReceipt } from '@wagmi/core';
import { Address, parseUnits } from 'viem';
import { useAccount } from 'wagmi';

import { useStateContext } from '@lendos/ui/providers/StateProvider';

import { InterestRate } from '@lendos/types/reserves';

import { queryKeysFactory } from '@lendos/constants/queries';

import { wagmiConfigCore } from '../config/connectors';
import { TransactionBuilder } from '../services/transaction-builder';
import { EvmMarketDataType } from '../types/common';
import { getAllowance } from './usePoolApprovedAmount.ts';

export const useBorrow = () => {
  const { address, chainId: _chainId } = useAccount();
  const queryClient = useQueryClient();
  const { currentMarketData } = useStateContext();
  const chainId = _chainId ?? 0;

  const txBuilder = new TransactionBuilder(currentMarketData as EvmMarketDataType);

  const borrow = async (
    reserve: Address,
    amount: string,
    interestRateMode: InterestRate,
    decimals: number,
  ) => {
    if (!address) {
      return '';
    }

    const approvedAmount = await getAllowance(
      reserve,
      address,
      currentMarketData as EvmMarketDataType,
    );

    const txData = txBuilder.prepareBorrow(
      reserve,
      parseUnits(amount, decimals),
      interestRateMode,
      address,
    );
    const txDataApproval = txBuilder.prepareApproval(approvedAmount);
    const result = await estimateFeesPerGas(wagmiConfigCore, {
      chainId,
    });

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
    action: borrow,
  };
};

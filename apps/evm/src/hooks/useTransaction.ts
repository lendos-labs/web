import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import {
  EstimateGasParameters,
  estimateFeesPerGas,
  sendTransaction,
  waitForTransactionReceipt,
} from '@wagmi/core';
import { Address } from 'viem';
import { useAccount } from 'wagmi';

import { useModalContext } from '@lendos/ui/providers/ModalProvider';
import { useStateContext } from '@lendos/ui/providers/StateProvider';

import { API_ETH_MOCK_ADDRESS } from '@lendos/constants/addresses';
import { checkRequiresApproval } from '@lendos/constants/modalsUtils';
import { queryKeysFactory } from '@lendos/constants/queries';

import { wagmiConfigCore } from '../config/connectors';
import { TransactionBuilder } from '../services/transaction-builder';
import { EvmMarketDataType } from '../types/common';
import { usePoolApprovedAmount } from './usePoolApprovedAmount';

export const useTransaction = () => {
  const { address } = useAccount();
  const { args, setLoadingTxns } = useModalContext();
  const queryClient = useQueryClient();
  const { currentMarketData } = useStateContext();
  const chainId = currentMarketData.chain.id as number;

  const txBuilder = new TransactionBuilder(currentMarketData as EvmMarketDataType);

  const {
    data: approvedAmount,
    refetch: fetchApprovedAmount,
    isRefetching: fetchingApprovedAmount,
    isFetchedAfterMount,
  } = usePoolApprovedAmount(
    args.unWrapped ? API_ETH_MOCK_ADDRESS : (args.underlyingAsset as Address),
  );

  useEffect(() => {
    setLoadingTxns(fetchingApprovedAmount);
  }, [fetchingApprovedAmount, setLoadingTxns]);

  useEffect(() => {
    if (!isFetchedAfterMount) {
      void fetchApprovedAmount();
    }
  }, [fetchApprovedAmount, isFetchedAfterMount]);

  const action = async (txData: EstimateGasParameters, amount: string) => {
    if (!address) {
      return '';
    }

    const requiresApproval =
      Number(amount) !== 0 &&
      checkRequiresApproval({
        approvedAmount: approvedAmount?.amount ?? 0,
        amount: amount,
      });

    const result = await estimateFeesPerGas(wagmiConfigCore, {
      chainId,
    });

    if (requiresApproval && approvedAmount) {
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
    }

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

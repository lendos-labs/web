import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { estimateFeesPerGas, sendTransaction, waitForTransactionReceipt } from '@wagmi/core';
import { Address, parseUnits } from 'viem';
import { useAccount } from 'wagmi';

import { useModalContext } from '@lendos/ui/providers/ModalProvider';
import { useStateContext } from '@lendos/ui/providers/StateProvider';

import { queryKeysFactory } from '@lendos/constants/queries';

import { wagmiConfigCore } from '../config/connectors';
import { TransactionBuilder } from '../services/transaction-builder';
import { EvmMarketDataType } from '../types/common';
import { useApprovalTx } from './useApprovalTx';
import { usePoolApprovedAmount } from './usePoolApprovedAmount';

export const useSupply = () => {
  const { address } = useAccount();
  const { args, setLoadingTxns } = useModalContext();
  const queryClient = useQueryClient();
  const { currentMarketData } = useStateContext();

  const txBuilder = new TransactionBuilder(currentMarketData as EvmMarketDataType);

  const {
    data: approvedAmount,
    refetch: fetchApprovedAmount,
    isRefetching: fetchingApprovedAmount,
    isFetchedAfterMount,
  } = usePoolApprovedAmount(args.underlyingAsset as Address);

  useEffect(() => {
    setLoadingTxns(fetchingApprovedAmount);
  }, [fetchingApprovedAmount, setLoadingTxns]);

  const { approval } = useApprovalTx({
    approvedAmount,
    onApprovalTxConfirmed: async () => {
      await fetchApprovedAmount();
    },
  });

  useEffect(() => {
    if (!isFetchedAfterMount) {
      void fetchApprovedAmount();
    }
  }, [fetchApprovedAmount, isFetchedAfterMount]);

  const supply = async (reserve: string, amount: string, decimals: number) => {
    const txData = txBuilder.prepareSupply(
      reserve as Address,
      parseUnits(amount, decimals),
      address ?? '0x',
    );
    const gas = await txBuilder.estimateGas(txData);
    const result = await estimateFeesPerGas(wagmiConfigCore, {
      chainId: currentMarketData.chain.id,
    });

    const hash = await sendTransaction(wagmiConfigCore, {
      ...txData,
      gas,
      maxFeePerGas: result.maxFeePerGas,
      maxPriorityFeePerGas: result.maxPriorityFeePerGas,
      chainId: currentMarketData.chain.id,
    });
    // Execution reverted with reason: Panic(17).
    //
    //   Estimate Gas Arguments:
    //   from:  0x4E66D91d5195E94717Ba849BBC9C23C87315d78d
    // to:    0x2666543d3822342CB6f2d135A1f98B89676F4d2B
    // data:  0x80500d2000000000000000000000000064916311cf63f208069e5ef6ca4b2a4dc1987e8a0000000000000000000000000000000000000000000000008ac7230489e800000000000000000000000000004e66d91d5195e94717ba849bbc9c23c87315d78d
    //
    // Details: execution reverted: Panic(17)
    // Version: 2.20.1
    await waitForTransactionReceipt(wagmiConfigCore, {
      hash,
    });

    await queryClient.invalidateQueries({ queryKey: queryKeysFactory.pool });

    return hash as string;
  };

  return {
    action: supply,
    approvedAmount: approvedAmount,
    approval,
  };
};

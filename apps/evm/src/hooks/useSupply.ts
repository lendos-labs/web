import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { sendTransaction, waitForTransactionReceipt } from '@wagmi/core';
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
    action: supply,
    approvedAmount: approvedAmount,
    approval,
  };
};

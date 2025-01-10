import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Address, parseUnits } from 'viem';
import { useAccount, useSendTransaction } from 'wagmi';

import { useModalContext } from '@lendos/ui/providers/ModalProvider';
import { useStateContext } from '@lendos/ui/providers/StateProvider';

import { queryKeysFactory } from '@lendos/constants/queries';

import { TransactionBuilder } from '../services/transaction-builder';
import { useApprovalTx } from './useApprovalTx';
import { usePoolApprovedAmount } from './usePoolApprovedAmount';

export const useSupply = () => {
  const { address } = useAccount();
  const { args, setLoadingTxns } = useModalContext();
  const queryClient = useQueryClient();
  const { currentMarketData } = useStateContext();
  const { sendTransactionAsync } = useSendTransaction();

  const txBuilder = new TransactionBuilder(currentMarketData);

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

  const supply = async (reserve: Address, amount: string, decimals: number) => {
    const txData = txBuilder.prepareSupply(reserve, parseUnits(amount, decimals), address ?? '0x');
    const gas = await txBuilder.estimateGas(txData);
    const txHash = await sendTransactionAsync({ ...txData, gas });
    void queryClient.invalidateQueries({ queryKey: queryKeysFactory.pool });
    return txHash;
  };

  return {
    action: supply,
    approvedAmount: approvedAmount,
    approval,
  };
};

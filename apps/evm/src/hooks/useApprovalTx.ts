import { estimateFeesPerGas } from '@wagmi/core';
import { useSendTransaction } from 'wagmi';

import { useModalContext } from '@lendos/ui/providers/ModalProvider';
import { useStateContext } from '@lendos/ui/providers/StateProvider';

import { TxAction } from '@lendos/types/error';

import { getErrorTextFromError } from '@lendos/constants/errorMapping';

import { wagmiConfigCore } from '../config/connectors.ts';
import { TransactionBuilder } from '../services/transaction-builder';
import { EvmApproveData, EvmMarketDataType } from '../types/common';

export const useApprovalTx = ({
  approvedAmount,
  onApprovalTxConfirmed,
}: {
  approvedAmount: EvmApproveData | undefined;
  onApprovalTxConfirmed?: () => Promise<void>;
}) => {
  const { currentMarketData } = useStateContext();
  const { sendTransactionAsync } = useSendTransaction();
  const { approvalTxState, setApprovalTxState, setTxError } = useModalContext();
  const txBuilder = new TransactionBuilder(currentMarketData as EvmMarketDataType);

  const approval = async () => {
    if (approvedAmount) {
      try {
        const txData = txBuilder.prepareApproval(approvedAmount);
        setApprovalTxState({ ...approvalTxState, loading: true });
        const gas = await txBuilder.estimateGas(txData);
        const result = await estimateFeesPerGas(wagmiConfigCore, {
          chainId: currentMarketData.chain.id,
        });
        const txHash = await sendTransactionAsync({
          ...txData,
          gas,
          maxFeePerGas: result.maxFeePerGas,
          maxPriorityFeePerGas: result.maxPriorityFeePerGas,
          chainId: currentMarketData.chain.id,
        });
        setApprovalTxState({
          txHash,
          loading: false,
          success: true,
        });
        setTxError(undefined);
        if (onApprovalTxConfirmed) {
          await onApprovalTxConfirmed();
        }
      } catch (error) {
        const parsedError = getErrorTextFromError(error as Error, TxAction.GAS_ESTIMATION, false);
        setTxError(parsedError);
        setApprovalTxState({
          txHash: undefined,
          loading: false,
        });
      }
    }
  };

  return {
    approval,
  };
};

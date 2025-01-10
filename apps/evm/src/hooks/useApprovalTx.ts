import { useSendTransaction } from 'wagmi';

import { useModalContext } from '@lendos/ui/providers/ModalProvider';
import { useStateContext } from '@lendos/ui/providers/StateProvider';

import { ApproveData } from '@lendos/types/erc20';
import { TxAction } from '@lendos/types/error';

import { getErrorTextFromError } from '@lendos/constants/errorMapping';

import { TransactionBuilder } from '../services/transaction-builder';

export const useApprovalTx = ({
  approvedAmount,
  onApprovalTxConfirmed,
}: {
  approvedAmount: ApproveData | undefined;
  onApprovalTxConfirmed?: () => Promise<void>;
}) => {
  const { currentMarketData } = useStateContext();
  const { sendTransactionAsync } = useSendTransaction();
  const { approvalTxState, setApprovalTxState, setTxError } = useModalContext();
  const txBuilder = new TransactionBuilder(currentMarketData);

  const approval = async () => {
    if (approvedAmount) {
      try {
        const txData = txBuilder.prepareApproval(approvedAmount);
        setApprovalTxState({ ...approvalTxState, loading: true });
        const gas = await txBuilder.estimateGas(txData);
        const txHash = await sendTransactionAsync({ ...txData, gas });
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
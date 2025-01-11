import { TxAction } from '@lendos/types/error';

import { getErrorTextFromError } from '@lendos/constants/errorMapping';

import { useModalContext } from '../../providers/ModalProvider';
import { useTransactionContext } from '../../providers/TransactionProvider';
import { TxActionsWrapper } from '../TxActionsWrapper';
import { checkRequiresApproval } from '../utils';

export interface SupplyActionProps {
  amountToSupply: string;
  isWrongNetwork: boolean;
  customGasPrice?: string;
  poolAddress: string;
  symbol: string;
  blocked: boolean;
  decimals: number;
}

export const SupplyActions = ({
  amountToSupply,
  poolAddress,
  isWrongNetwork,
  symbol,
  blocked,
  decimals,
}: SupplyActionProps) => {
  const { supply } = useTransactionContext();

  const { action: supplyAction, approvedAmount, approval } = supply;

  const {
    mainTxState,
    loadingTxns,
    approvalTxState,
    setApprovalTxState,
    setMainTxState,
    setTxError,
  } = useModalContext();

  const requiresApproval =
    Number(amountToSupply) !== 0 &&
    checkRequiresApproval({
      approvedAmount: approvedAmount?.amount ?? 0,
      amount: amountToSupply,
    });

  if (requiresApproval && approvalTxState.success) {
    setApprovalTxState({});
  }

  const action = async () => {
    try {
      setMainTxState({ ...mainTxState, loading: true });

      const supplyTxHash = await supplyAction(poolAddress, amountToSupply, decimals);

      setMainTxState({
        txHash: supplyTxHash,
        loading: false,
        success: true,
      });
    } catch (error) {
      const parsedError = getErrorTextFromError(error as Error, TxAction.GAS_ESTIMATION, false);
      setTxError(parsedError);
      setMainTxState({
        txHash: undefined,
        loading: false,
      });
    }
  };

  return (
    <TxActionsWrapper
      blocked={blocked}
      // TODO fix it
      isWrongNetwork={isWrongNetwork}
      requiresAmount
      amount={amountToSupply}
      symbol={symbol}
      preparingTransactions={loadingTxns || !approvedAmount}
      actionText={`Supply ${symbol}`}
      actionInProgressText={`Supplying ${symbol}`}
      handleApproval={approval}
      handleAction={action}
      requiresApproval={requiresApproval}
    />
  );
};

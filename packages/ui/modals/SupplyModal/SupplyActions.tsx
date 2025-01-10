import { useState } from 'react';

import { Address } from '@lendos/types/user';

import { useModalContext } from '../../providers/ModalProvider';
import { useStateContext } from '../../providers/StateProvider';
import { useTransactionContext } from '../../providers/TransactionProvider';
import { TxActionsWrapper } from '../TxActionsWrapper';

export interface SupplyActionProps {
  amountToSupply: string;
  isWrongNetwork: boolean;
  customGasPrice?: string;
  poolAddress: Address;
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
  const { currentMarketData } = useStateContext();

  // const [
  //   tryPermit,
  //   supply,
  //   supplyWithPermit,
  //   walletApprovalMethodPreference,
  //   estimateGasLimit,
  //   addTransaction,
  //   currentMarketData,
  // ] = useRootStore(state => [
  //   state.tryPermit,
  //   state.supply,
  //   state.supplyWithPermit,
  //   state.walletApprovalMethodPreference,
  //   state.estimateGasLimit,
  //   state.addTransaction,
  //   state.currentMarketData,
  // ]);

  const {
    mainTxState,
    loadingTxns,
    setLoadingTxns,
    setApprovalTxState,
    setMainTxState,
    setTxError,
  } = useModalContext();

  const [signatureParams, setSignatureParams] = useState();

 

  // const {
  //   data: approvedAmount,
  //   refetch: fetchApprovedAmount,
  //   isRefetching: fetchingApprovedAmount,
  //   isFetchedAfterMount,
  // } = usePoolApprovedAmount(currentMarketData, poolAddress);

  // setLoadingTxns(fetchingApprovedAmount);

  // const requiresApproval =
  //   Number(amountToSupply) !== 0 &&
  //   checkRequiresApproval({
  //     approvedAmount: approvedAmount?.amount || '0',
  //     amount: amountToSupply,
  //     signedAmount: signatureParams ? signatureParams.amount : '0',
  //   });

  // if (requiresApproval && approvalTxState?.success) {
  //   // There was a successful approval tx, but the approval amount is not enough.
  //   // Clear the state to prompt for another approval.
  //   setApprovalTxState({});
  // }

  // const { approval } = useApprovalTx({
  //   usePermit,
  //   approvedAmount,
  //   requiresApproval,
  //   assetAddress: poolAddress,
  //   symbol,
  //   decimals,
  //   signatureAmount: amountToSupply,
  //   onApprovalTxConfirmed: fetchApprovedAmount,
  //   onSignTxCompleted: signedParams => setSignatureParams(signedParams),
  // });

  // useEffect(() => {
  //   if (!isFetchedAfterMount) {
  //     fetchApprovedAmount();
  //   }
  // }, [fetchApprovedAmount, isFetchedAfterMount]);

  const action = async () => {
    try {
      setMainTxState({ ...mainTxState, loading: true });

      const supplyTxHash = await supply(poolAddress, amountToSupply, decimals);

      setMainTxState({
        txHash: supplyTxHash,
        loading: false,
        success: true,
      });

      // TODO what is it
      // addTransaction(response.hash, {
      //   action,
      //   txState: 'success',
      //   asset: poolAddress,
      //   amount: amountToSupply,
      //   assetName: symbol,
      // });
    } catch (error) {
      // const parsedError = getErrorTextFromError(error, TxAction.GAS_ESTIMATION, false);
      // setTxError(parsedError);
      // setMainTxState({
      //   txHash: undefined,
      //   loading: false,
      // });
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

import { useEffect } from 'react';

import { BoxProps } from '@mui/material';

import { TxAction } from '@lendos/types/error';
import { FormattedReservesAndIncentives, InterestRate } from '@lendos/types/reserves';

import { getErrorTextFromError } from '@lendos/constants/errorMapping';

import { useModalContext } from '../../providers/ModalProvider';
import { useTransactionContext } from '../../providers/TransactionProvider';
import { TxActionsWrapper } from '../TxActionsWrapper';

export interface BorrowActionsProps extends BoxProps {
  poolReserve: FormattedReservesAndIncentives;
  amountToBorrow: string;
  poolAddress: string;
  interestRateMode: InterestRate;
  isWrongNetwork: boolean;
  symbol: string;
  blocked: boolean;
}

export const BorrowActions = ({
  poolReserve,
  symbol,
  amountToBorrow,
  poolAddress,
  interestRateMode,
  isWrongNetwork,
  blocked,
}: BorrowActionsProps) => {
  const { borrow } = useTransactionContext();
  const { action: borrowAction } = borrow;
  const { approvalTxState, mainTxState, loadingTxns, setMainTxState, setTxError, setGasLimit } =
    useModalContext();

  const action = async () => {
    try {
      setMainTxState({ ...mainTxState, loading: true });

      const borrowTxHash = await borrowAction(
        poolAddress,
        amountToBorrow,
        interestRateMode,
        poolReserve.decimals,
      );

      setMainTxState({
        txHash: borrowTxHash,
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

  useEffect(() => {
    // change gas limit to 6000000
    //
    // let borrowGasLimit = 0;
    // borrowGasLimit = Number(gasLimitRecommendations[ProtocolAction.borrow].recommended);
    // if (requiresApproval && !approvalTxState.success) {
    //   borrowGasLimit += Number(APPROVE_DELEGATION_GAS_LIMIT);
    // }
    setGasLimit('6000000');
  }, [approvalTxState, setGasLimit]);

  return (
    <TxActionsWrapper
      blocked={blocked}
      requiresAmount={true}
      amount={amountToBorrow}
      isWrongNetwork={isWrongNetwork}
      handleAction={action}
      actionText={<>Borrow {symbol}</>}
      actionInProgressText={<>Borrowing {symbol}</>}
      preparingTransactions={loadingTxns}
    />
  );
};

import { BoxProps } from '@mui/material';
import { Address } from 'viem';

import { TxAction } from '@lendos/types/error';
import { FormattedReservesAndIncentives, InterestRate } from '@lendos/types/reserves';

import { getErrorTextFromError } from '@lendos/constants/errorMapping';

import { useModalContext } from '../../providers/ModalProvider';
import { useTransactionContext } from '../../providers/TransactionProvider';
import { TxActionsWrapper } from '../TxActionsWrapper';

export interface RepayActionProps extends BoxProps {
  amountToRepay: string;
  poolReserve: FormattedReservesAndIncentives;
  isWrongNetwork: boolean;
  customGasPrice?: string;
  poolAddress: string;
  symbol: string;
  debtType: InterestRate;
  blocked?: boolean;
}

export const RepayActions = ({
  amountToRepay,
  poolReserve,
  poolAddress,
  isWrongNetwork,
  symbol,
  blocked,
  debtType,
  ...props
}: RepayActionProps) => {
  const { repay } = useTransactionContext();
  const { action: repayAction } = repay;

  const { mainTxState, loadingTxns, setMainTxState, setTxError } = useModalContext();

  const action = async () => {
    try {
      setMainTxState({ ...mainTxState, loading: true });

      const hash = await repayAction(
        poolAddress as Address,
        amountToRepay,
        debtType,
        poolReserve.decimals,
      );

      setMainTxState({
        txHash: hash,
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
      preparingTransactions={loadingTxns}
      symbol={poolReserve.symbol}
      requiresAmount
      amount={amountToRepay}
      isWrongNetwork={isWrongNetwork}
      {...props}
      handleAction={action}
      actionText={<>Repay {symbol}</>}
      actionInProgressText={<>Repaying {symbol}</>}
    />
  );
};

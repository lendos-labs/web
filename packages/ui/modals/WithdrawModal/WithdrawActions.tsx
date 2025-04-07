import { TxAction } from '@lendos/types/error';
import { FormattedReservesAndIncentives } from '@lendos/types/reserves';

import { getErrorTextFromError } from '@lendos/constants/errorMapping';

import { useModalContext } from '../../providers/ModalProvider';
import { useTransactionContext } from '../../providers/TransactionProvider';
import { TxActionsWrapper } from '../TxActionsWrapper';

export interface WithdrawActionsProps {
  poolReserve: FormattedReservesAndIncentives;
  amountToWithdraw: string;
  poolAddress: string;
  isWrongNetwork: boolean;
  symbol: string;
  blocked: boolean;
}

export const WithdrawActions = ({
  poolReserve,
  amountToWithdraw,
  poolAddress,
  isWrongNetwork,
  symbol,
  blocked,
}: WithdrawActionsProps) => {
  const { withdraw } = useTransactionContext();
  const { action: withdrawAction } = withdraw;
  const { mainTxState, loadingTxns, setMainTxState, setTxError } = useModalContext();

  const action = async () => {
    try {
      setMainTxState({ ...mainTxState, loading: true });

      const supplyTxHash = await withdrawAction(
        poolAddress,
        amountToWithdraw,
        poolReserve.decimals,
      );

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

  // const { action, loadingTxns, mainTxState, approvalTxState, approval, requiresApproval } =
  //   useTransactionHandler({
  //     tryPermit: false,
  //     handleGetTxns: async () =>
  //       withdraw({
  //         reserve: poolAddress,
  //         amount: amountToWithdraw,
  //         aTokenAddress: poolReserve.aTokenAddress,
  //       }),
  //     skip: !amountToWithdraw || parseFloat(amountToWithdraw) === 0 || blocked,
  //     deps: [amountToWithdraw, poolAddress],
  //     eventTxInfo: {
  //       amount: amountToWithdraw,
  //       assetName: poolReserve.name,
  //       asset: poolReserve.underlyingAsset,
  //     },
  //     protocolAction: ProtocolAction.withdraw,
  //   });

  return (
    <TxActionsWrapper
      blocked={blocked}
      preparingTransactions={loadingTxns}
      amount={amountToWithdraw}
      isWrongNetwork={isWrongNetwork}
      requiresAmount
      actionInProgressText={`Withdrawing ${symbol}`}
      actionText={`Withdraw ${symbol}`}
      handleAction={action}
      // handleApproval={() => approval([{ amount: amountToWithdraw, underlyingAsset: poolAddress }])}
      // requiresApproval={requiresApproval}
    />
  );
};

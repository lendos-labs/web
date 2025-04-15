import { Address } from 'viem';

import { TxAction } from '@lendos/types/error';
import { FormattedReservesAndIncentives } from '@lendos/types/reserves';

import { getErrorTextFromError } from '@lendos/constants/errorMapping';

import { useModalContext } from '../../providers/ModalProvider';
import { useTransactionContext } from '../../providers/TransactionProvider';
import { TxActionsWrapper } from '../TxActionsWrapper';

export interface CollateralChangeActionsProps {
  poolReserve: FormattedReservesAndIncentives;
  isWrongNetwork: boolean;
  usageAsCollateral: boolean;
  blocked: boolean;
  symbol: string;
}

export const CollateralChangeActions = ({
  poolReserve,
  isWrongNetwork,
  usageAsCollateral,
  blocked,
  symbol,
}: CollateralChangeActionsProps) => {
  const { setUsageAsCollateral } = useTransactionContext();
  const { action: setUsageAsCollateralAction } = setUsageAsCollateral;
  const { mainTxState, loadingTxns, setMainTxState, setTxError } = useModalContext();

  const action = async () => {
    try {
      setMainTxState({ ...mainTxState, loading: true });

      const setUsageAsCollateralTxHash = await setUsageAsCollateralAction(
        poolReserve.underlyingAsset as Address,
        usageAsCollateral,
      );

      setMainTxState({
        txHash: setUsageAsCollateralTxHash,
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
      isWrongNetwork={isWrongNetwork}
      actionText={
        usageAsCollateral ? <>Enable {symbol} as collateral</> : <>Disable {symbol} as collateral</>
      }
      actionInProgressText={<>Pending...</>}
      handleAction={action}
    />
  );
};

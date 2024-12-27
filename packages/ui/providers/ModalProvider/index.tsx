import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { InterestRate } from '@lendos/types/reserves';

export enum ModalType {
  Supply,
  Withdraw,
  Borrow,
  Repay,
  CollateralChange,
  RateSwitch,
  // Stake,
  // Unstake,
  // StakeCooldown,
  // StakeRewardClaim,
  ClaimRewards,
  // Emode,
  // Faucet,
  // Swap,
  DebtSwitch,
  // GovDelegation,
  // GovVote,
  // V3Migration,
  // RevokeGovDelegation,
  // StakeRewardsClaimRestake,
  Switch,
  // StakingMigrate,
}

export interface ModalArgsType {
  underlyingAsset?: string;
  currentRateMode?: InterestRate;
  chainId?: number;
  isFrozen?: boolean;
}

export interface TxStateType {
  txHash?: string;
  loading?: boolean;
  success?: boolean;
}

export interface ModalContextType<T extends ModalArgsType> {
  openSwitch: (underlyingAsset?: string, chainId?: number) => void;
  openBorrow: (underlyingAsset: string) => void;
  openSupply: (underlyingAsset: string) => void;
  openWithdraw: (underlyingAsset: string) => void;
  openRepay: (underlyingAsset: string, currentRateMode: InterestRate, isFrozen: boolean) => void;
  openRateSwitch: (underlyingAsset: string, currentRateMode: InterestRate) => void;
  openCollateralChange: (underlyingAsset: string) => void;
  openDebtSwitch: (underlyingAsset: string, currentRateMode: InterestRate) => void;
  close: () => void;
  type?: ModalType;
  args: T;
  mainTxState: TxStateType;
  approvalTxState: TxStateType;
  setApprovalTxState: (data: TxStateType) => void;
  setMainTxState: (data: TxStateType) => void;
  gasLimit: string;
  setGasLimit: (limit: string) => void;
  loadingTxns: boolean;
  setLoadingTxns: (loading: boolean) => void;
  txError: string | undefined;
  setTxError: (error: string) => void;
  openClaimRewards: () => void;
}

export const ModalContext = createContext<ModalContextType<ModalArgsType>>(
  {} as ModalContextType<ModalArgsType>,
);

export const ModalContextProvider = ({ children }: { children: ReactNode }) => {
  const [type, setType] = useState<ModalType>();

  const [args, setArgs] = useState<ModalArgsType>({});
  const [approvalTxState, setApprovalTxState] = useState<TxStateType>({});
  const [mainTxState, setMainTxState] = useState<TxStateType>({});
  const [gasLimit, setGasLimit] = useState<string>('');
  const [loadingTxns, setLoadingTxns] = useState(false);
  const [txError, setTxError] = useState<string>('');

  return (
    <ModalContext.Provider
      value={useMemo(
        () => ({
          openSupply: underlyingAsset => {
            setType(ModalType.Supply);
            setArgs({ underlyingAsset });
          },
          openBorrow: underlyingAsset => {
            setType(ModalType.Borrow);
            setArgs({ underlyingAsset });
          },
          openRateSwitch: (underlyingAsset, currentRateMode) => {
            setType(ModalType.RateSwitch);
            setArgs({ underlyingAsset, currentRateMode });
          },

          openRepay: (underlyingAsset, currentRateMode, isFrozen) => {
            setType(ModalType.Repay);
            setArgs({ underlyingAsset, currentRateMode, isFrozen });
          },
          openWithdraw: underlyingAsset => {
            setType(ModalType.Withdraw);
            setArgs({ underlyingAsset });
          },
          openCollateralChange: underlyingAsset => {
            setType(ModalType.CollateralChange);
            setArgs({ underlyingAsset });
          },
          openSwitch: (underlyingAsset, chainId) => {
            setType(ModalType.Switch);
            setArgs({ underlyingAsset, chainId });
          },
          openClaimRewards: () => {
            setType(ModalType.ClaimRewards);
          },
          openDebtSwitch: (underlyingAsset, currentRateMode) => {
            setType(ModalType.DebtSwitch);
            setArgs({ underlyingAsset, currentRateMode });
          },
          close: () => {
            setType(undefined);
            setArgs({});
            setMainTxState({});
            setApprovalTxState({});
            setGasLimit('');
            setTxError('');
          },
          type,
          args,
          approvalTxState,
          mainTxState,
          setApprovalTxState,
          setMainTxState,
          gasLimit,
          setGasLimit,
          loadingTxns,
          setLoadingTxns,
          txError,
          setTxError,
        }),
        [type, args, approvalTxState, mainTxState, gasLimit, loadingTxns, txError],
      )}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- check is hook call inside provider
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }

  return context;
};

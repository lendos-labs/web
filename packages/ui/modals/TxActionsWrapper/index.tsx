import { ReactNode } from 'react';

import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { Box, Button, CircularProgress, SvgIcon } from '@mui/material';

import { TxAction, useModalContext } from '../../providers/ModalProvider';
import { ApprovalTooltip } from './ApprovalTooltip';

interface TxActionsWrapperProps {
  actionInProgressText: ReactNode;
  actionText: ReactNode;
  amount?: string;
  handleApproval?: () => Promise<void>;
  handleAction: () => Promise<void>;
  isWrongNetwork: boolean;
  preparingTransactions: boolean;
  requiresAmount?: boolean;
  requiresApproval: boolean;
  symbol?: string;
  blocked?: boolean;
  errorParams?: {
    loading: boolean;
    disabled: boolean;
    content: ReactNode;
    handleClick: () => Promise<void>;
  };
}

export const TxActionsWrapper = ({
  actionInProgressText,
  actionText,
  amount,
  handleApproval,
  handleAction,
  isWrongNetwork,

  preparingTransactions,
  requiresAmount,
  requiresApproval,
  symbol,
  blocked,
  errorParams,
}: TxActionsWrapperProps) => {
  const { txError, mainTxState, approvalTxState } = useModalContext();

  const hasApprovalError =
    requiresApproval && txError?.txAction === TxAction.APPROVAL && txError.actionBlocked;
  const isAmountMissing = requiresAmount && Number(amount) === 0;

  function getMainParams() {
    if (blocked) {
      return { disabled: true, content: actionText };
    }
    if (
      (txError?.txAction === TxAction.GAS_ESTIMATION ||
        txError?.txAction === TxAction.MAIN_ACTION) &&
      txError.actionBlocked
    ) {
      if (errorParams) {
        return errorParams;
      }
      return { loading: false, disabled: true, content: actionText };
    }
    if (isWrongNetwork) {
      return { disabled: true, content: 'Wrong Network' };
    }

    if (isAmountMissing) {
      return { disabled: true, content: 'Enter an amount' };
    }
    if (preparingTransactions) {
      return { disabled: true, loading: true };
    }

    if (mainTxState.loading) {
      return { loading: true, disabled: true, content: actionInProgressText };
    }
    if (requiresApproval && !approvalTxState.success) {
      return { disabled: true, content: actionText };
    }
    return { content: actionText, handleClick: handleAction };
  }

  function getApprovalParams() {
    if (
      !requiresApproval ||
      isWrongNetwork ||
      isAmountMissing ||
      preparingTransactions ||
      hasApprovalError
    ) {
      return null;
    }
    if (approvalTxState.loading) {
      return { loading: true, disabled: true, content: `Approving ${symbol}...` };
    }
    if (approvalTxState.success) {
      return {
        disabled: true,
        content: (
          <>
            Approve Confirmed
            <SvgIcon sx={{ fontSize: 20, ml: 2 }}>
              <CheckCircleOutlinedIcon />
            </SvgIcon>
          </>
        ),
      };
    }

    return {
      content: (
        <ApprovalTooltip
          variant='buttonL'
          iconSize={20}
          iconMargin={2}
          color='text.white'
          iconColor='text.white'
          text={`Approve ${symbol} to continue`}
        />
      ),
      handleClick: handleApproval,
    };
  }

  const { content, disabled, loading, handleClick } = getMainParams();
  const approvalParams = getApprovalParams();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', mt: 12 }}>
      {approvalParams && (
        <Button
          variant='contained'
          disabled={Boolean(approvalParams.disabled) || Boolean(blocked)}
          onClick={() => {
            void (async () => {
              if (approvalParams.handleClick) {
                await approvalParams.handleClick();
              }
            })();
          }}
          size='large'
          sx={{ minHeight: '44px' }}
          data-cy='approvalButton'
        >
          {approvalParams.loading && (
            <CircularProgress color='inherit' size='16px' sx={{ mr: 2 }} />
          )}
          {approvalParams.content}
        </Button>
      )}
      <Button
        variant='contained'
        disabled={Boolean(disabled) || Boolean(blocked)}
        onClick={() => {
          void (async () => {
            if (handleClick) {
              await handleClick();
            }
          })();
        }}
        size='large'
        sx={{ minHeight: '44px', ...(approvalParams ? { mt: 2 } : {}) }}
        data-cy='actionButton'
      >
        {loading && <CircularProgress color='inherit' size='16px' sx={{ mr: 2 }} />}
        {content}
      </Button>
    </Box>
  );
};

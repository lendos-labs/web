import { ReactNode } from 'react';

import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import { Box, Button, Typography } from '@mui/material';

import { FormattedReservesAndIncentives, InterestRate } from '@lendos/types/reserves';

import { useAccountContext } from '../../providers/AccountProvider';
import { BaseSuccessView } from '../BaseSuccessView';
import { FormattedNumber } from '../FormattedNumber';
import { TokenIcon } from '../TokenIcon';

export interface SuccessTxViewProps {
  txHash?: string;
  action?: ReactNode;
  amount?: string;
  symbol?: string;
  collateral?: boolean;
  rate?: InterestRate;
  poolReserve?: FormattedReservesAndIncentives;
  customAction?: ReactNode;
  customText?: ReactNode;
  aToken?: boolean;
}

export const TxSuccessView = ({
  txHash,
  action,
  amount,
  symbol,
  collateral,
  rate,
  poolReserve,
  customAction,
  customText,
  aToken,
}: SuccessTxViewProps) => {
  const { addToken } = useAccountContext();

  return (
    <BaseSuccessView txHash={txHash}>
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        {action && amount && symbol && (
          <Box>
            You {action} <FormattedNumber value={Number(amount)} compact variant='secondary14' />{' '}
            {symbol}
          </Box>
        )}

        {customAction && (
          <Typography>
            {customText}
            {customAction}
          </Typography>
        )}

        {!action && !amount && symbol && (
          <Typography>
            Your {symbol} {!collateral ? 'now' : 'is not'} used as collateral
          </Typography>
        )}

        {rate && (
          <Typography>
            <>You switched to {rate === InterestRate.Variable ? 'variable' : 'stable'} rate</>
          </Typography>
        )}

        {poolReserve && symbol && (
          <Box
            sx={theme => ({
              border: `1px solid ${theme.palette.background.surface}`,
              background: theme.palette.background.surface2,
              boxShadow: theme.palette.shadow.card,
              borderRadius: '4px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              mt: '24px',
            })}
          >
            <TokenIcon
              symbol={poolReserve.iconSymbol}
              aToken={Boolean(aToken)}
              sx={{ fontSize: '32px', mt: '12px', mb: '8px' }}
            />
            <Typography variant='subtitle' sx={{ mx: '24px' }}>
              <>Add {aToken ? 'aToken ' : 'token '} to wallet to track your balance.</>
            </Typography>
            <Button
              onClick={() => {
                void addToken(poolReserve.aTokenAddress);
              }}
              variant={'white'}
              size='small'
              sx={{ mt: '8px', mb: '12px' }}
            >
              <AccountBalanceWalletOutlinedIcon sx={{ width: '20px', height: '20px' }} />
              <Typography variant='buttonS' ml='4px'>
                Add to wallet
              </Typography>
            </Button>
          </Box>
        )}
      </Box>
    </BaseSuccessView>
  );
};

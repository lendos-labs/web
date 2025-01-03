import { ReactNode } from 'react';

import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import { Box, Button, Typography } from '@mui/material';

import { InterestRate } from '@lendos/types/reserves';

import { useAccountContext } from '../../providers/AccountProvider';
import { BaseSuccessView } from '../BaseSuccessView';
import { FormattedNumber } from '../FormattedNumber';

export interface SuccessTxViewProps {
  txHash?: string;
  action?: ReactNode;
  amount?: string;
  symbol?: string;
  collateral?: boolean;
  rate?: InterestRate;
  // TODO add addToken
  // addToken?: ERC20TokenType;
  customAction?: ReactNode;
  customText?: ReactNode;
}

export const TxSuccessView = ({
  txHash,
  action,
  amount,
  symbol,
  collateral,
  rate,
  // addToken,
  customAction,
  customText,
}: SuccessTxViewProps) => {
  const { addToken } = useAccountContext();
  // const [base64, setBase64] = useState('');

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
          <Typography>
            <>
              You {action} <FormattedNumber value={Number(amount)} compact variant='secondary14' />{' '}
              {symbol}
            </>
          </Typography>
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

        {symbol && (
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
            {/* <TokenIcon
              symbol={addToken.symbol}
              aToken={addToken && addToken.aToken ? true : false}
              sx={{ fontSize: '32px', mt: '12px', mb: '8px' }}
            />
            <Typography variant='subtitle' sx={{ mx: '24px' }}>
              <>
                Add {addToken && addToken.aToken ? 'aToken ' : 'token '} to wallet to track your
                balance.
              </>
            </Typography> */}
            <Button
              onClick={() => {
                void addToken();
              }}
              variant={'white'}
              size='small'
              sx={{ mt: '8px', mb: '12px' }}
            >
              {/* {addToken.symbol && !/_/.test(addToken.symbol) && (
                <Base64Token
                  symbol={addToken.symbol}
                  onImageGenerated={setBase64}
                  aToken={addToken.aToken}
                />
              )} */}
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

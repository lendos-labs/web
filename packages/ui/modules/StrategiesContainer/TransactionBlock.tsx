import { Dispatch, SetStateAction } from 'react';

import { USD_DECIMALS } from '@aave/math-utils';
import { Box, Button, Paper, Slider, Typography } from '@mui/material';
import { BigNumber } from 'bignumber.js';

import { roundToTokenDecimals } from '@lendos/constants/round';

import { AssetInput } from '../../components/AssetInput';
import { useBalanceContext } from '../../providers/BalanceProvider';
import { useReservesContext } from '../../providers/ReservesProvider';
import { StategyHeader } from './StategyHeader.tsx';
import { Pair } from './types.ts';

export const TransactionBlock = ({
  margin,
  pair,
  maxLeverage,
  leverage,
  markPrice,
  setMargin,
  setLeverage,
}: {
  margin: string;
  pair: Pair;
  maxLeverage: number;
  leverage: number;
  markPrice: number;
  setMargin: Dispatch<SetStateAction<string>>;
  setLeverage: Dispatch<SetStateAction<number>>;
}) => {
  const { walletBalances } = useBalanceContext();
  const { baseCurrencyData } = useReservesContext();

  const address = pair.borrow.underlyingAsset;

  const token = {
    ...pair.borrow,
    address,
    balance: walletBalances[address]?.amount ?? '0',
  };

  const amountInUsd = new BigNumber(margin)
    .multipliedBy(token.formattedPriceInMarketReferenceCurrency)
    .multipliedBy(baseCurrencyData.marketReferenceCurrencyPriceInUsd)
    .shiftedBy(-USD_DECIMALS);

  return (
    <Paper
      sx={{
        padding: theme => theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <StategyHeader pair={pair} />
      <AssetInput
        sx={{ width: '100%', mt: 4, mb: 6 }}
        value={margin}
        onChange={value => {
          if (value === '-1') {
            setMargin(token.balance);
          } else {
            const decimalTruncatedValue = roundToTokenDecimals(value, token.decimals);
            setMargin(decimalTruncatedValue);
          }
        }}
        usdValue={amountInUsd.toString(10)}
        symbol={token.symbol}
        assets={[
          {
            balance: token.balance,
            symbol: token.symbol,
            iconSymbol: token.iconSymbol,
          },
        ]}
        isMaxSelected={margin === token.balance}
        // disabled={supplyTxState.loading}
        disabled={false}
        maxValue={token.balance}
        balanceText='Balance'
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          pb: '6px',
        }}
      >
        <Typography variant='h3' color=''>
          Leverage
        </Typography>
        <Typography variant='numberS'>{leverage}x</Typography>
      </Box>
      <Slider
        aria-label='Leverage'
        defaultValue={leverage}
        onChange={(_, val) => setLeverage(val as number)}
        max={maxLeverage}
      />
      <Box
        sx={theme => ({
          display: 'flex',
          justifyContent: 'space-between',
          mt: 6,
          borderTop: '1px solid',
          pt: 4,
          borderColor: theme.palette.border.grey,
        })}
      >
        <Typography variant='h3'>Slippage Tolerance</Typography>
        <Box sx={{ display: 'flex' }}>
          <Typography variant='description' sx={{ fontFamily: 'Aldrich' }}>
            0.2%
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          mt: 2,
          justifyContent: 'space-between',
        }}
      >
        <Typography variant='h3'>Mark Price</Typography>
        <Typography variant='description' sx={{ fontFamily: 'Aldrich' }}>
          {markPrice.toFixed(2)}
        </Typography>
      </Box>
      <Button variant='contained' size='medium' sx={{ width: '100%', mt: 8 }}>
        Submit Loop
      </Button>
    </Paper>
  );
};

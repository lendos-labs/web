'use client';

import { Box } from '@mui/material';
import { TransactionBlock } from './TransactionBlock';
import { GeneralInfo } from './GeneralInfo';
import { useState } from 'react';
import { Pair } from './types.ts';
import Grid from '@mui/material/Grid2';

export const DetailStrategy = ({ pair }: { pair: Pair }) => {
  const maxLeverage = Number(1 / (1 - Number(pair.lend.formattedBaseLTVasCollateral)));

  const [leverage, setLeverage] = useState<number>(1);
  const [margin, setMargin] = useState('');

  const debtRatio = 1 - 1 / leverage;

  const supplyAPY = Number(pair.lend.supplyAPY) * 100;
  const borrowAPY = Number(pair.borrow.variableBorrowAPY) * 100;

  const roe = (supplyAPY - borrowAPY * debtRatio) * leverage;

  const borrowed = Number(margin || '1') * (leverage - 1);

  const markPrice = Number(pair.lend.priceInUSD) / Number(pair.borrow.priceInUSD);

  const lent = (Number(margin || '1') * leverage) / markPrice;

  const liquidationPrice =
    borrowed / (lent * (Number(pair.lend.reserveLiquidationThreshold) / 10000));

  const liquidationBuffer = ((markPrice - liquidationPrice) / markPrice) * 100;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        rowSpacing={{ xs: 2, md: '34px' }}
        columnSpacing={{ xs: 2, md: 5 }}
        columns={{ xs: 1, sm: 8, md: 12 }}
      >
        <Grid size={{ xs: 2, sm: 4, md: 4 }}>
          <TransactionBlock
            pair={pair}
            maxLeverage={maxLeverage}
            margin={margin}
            leverage={leverage}
            setMargin={setMargin}
            setLeverage={setLeverage}
            markPrice={markPrice}
          />
        </Grid>
        <Grid size={{ xs: 2, sm: 4, md: 4 }}>
          <GeneralInfo
            leverage={leverage}
            margin={margin}
            pair={pair}
            liquidationPrice={liquidationPrice}
            markPrice={markPrice}
            liquidationBuffer={liquidationBuffer}
            roe={roe}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

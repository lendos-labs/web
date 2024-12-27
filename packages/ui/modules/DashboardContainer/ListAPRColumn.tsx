import { ReserveIncentiveResponse } from '@aave/math-utils/dist/esm/formatters/incentive/calculate-reserve-incentives';
import { Box } from '@mui/material';
import { ReactNode } from 'react';

import { IncentivesCard } from '../../components/IncentivesCard';

interface ListAPRColumnProps {
  value: number;
  incentives?: ReserveIncentiveResponse[];
  symbol: string;
  tooltip?: ReactNode;
  children?: ReactNode;
}

export const ListAPRColumn = ({
  value,
  incentives,
  symbol,
  tooltip,
  children,
}: ListAPRColumnProps) => {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <IncentivesCard value={value} incentives={incentives} symbol={symbol} />
        {tooltip}
      </Box>
      {children}
    </>
  );
};

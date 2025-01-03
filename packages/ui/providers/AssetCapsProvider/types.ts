import { ReactNode } from 'react';

import { SxProps, Theme } from '@mui/material';

import { FormattedReservesAndIncentives } from '@lendos/types/reserves';

export interface WarningDisplayProps {
  supplyCap?: AssetCapData;
  borrowCap?: AssetCapData;
  debtCeiling?: AssetCapData;
  icon?: boolean;
  sx?: SxProps<Theme>;
}

export interface AssetCapData {
  percentUsed: number;
  isMaxed: boolean;
}

export type AssetCapHookData = AssetCapData & {
  determineWarningDisplay: (props: WarningDisplayProps) => ReactNode | null;
  displayMaxedTooltip: (props: WarningDisplayProps) => ReactNode | null;
};

export interface AssetCapUsageData {
  reserve: FormattedReservesAndIncentives;
  supplyCap: AssetCapHookData;
  borrowCap: AssetCapHookData;
  debtCeiling: AssetCapHookData;
}

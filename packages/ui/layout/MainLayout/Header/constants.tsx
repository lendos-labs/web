import { ReactNode } from 'react';

import { MonetizationOnOutlined, ShowChart } from '@mui/icons-material';

import { Routes } from '@lendos/constants/routes';

export const earnIcons: Record<string, ReactNode> = {
  [Routes.markets]: <MonetizationOnOutlined />,
  [Routes.dexLp]: <ShowChart />,
  // TODO add icon
  [Routes.strategies]: <ShowChart />,
};

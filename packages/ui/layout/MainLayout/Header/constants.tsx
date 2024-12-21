import { Routes } from '@lendos/constants/routes';
import { MonetizationOnOutlined, ShowChart } from '@mui/icons-material';
import { ReactNode } from 'react';

export const earnIcons: Record<string, ReactNode> = {
  [Routes.markets]: <MonetizationOnOutlined />,
  [Routes.dexLp]: <ShowChart />,
  // TODO add icon
  [Routes.strategies]: <ShowChart />,
};

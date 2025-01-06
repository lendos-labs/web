import { ReactNode } from 'react';

import { MonetizationOnOutlined, ShowChart } from '@mui/icons-material';

export const earnIcons: Record<string, ReactNode> = {
  menuMarkets: <MonetizationOnOutlined />,
  menuDexLp: <ShowChart />,
  // TODO add icon
  menuStrategies: <ShowChart />,
};

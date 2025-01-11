import { ReactNode } from 'react';

import { Address } from 'viem';

import { ApproveData } from '@lendos/types/erc20';
import { MarketDataType } from '@lendos/types/market';

export type ChildrenProps = Readonly<{
  children: ReactNode;
}>;

export type EvmMarketDataType = MarketDataType<Address>;

export type EvmApproveData = ApproveData<Address>;

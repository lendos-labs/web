import { Abi } from 'viem';

import { uniswapV2PairAbi } from '../abi/uniswap-v2-pair';

export const lpTokens: Record<string, { name: string; abi: Abi }> = {
  'SushiSwap LP Token': {
    name: 'SushiSwap',
    abi: uniswapV2PairAbi,
  },
};

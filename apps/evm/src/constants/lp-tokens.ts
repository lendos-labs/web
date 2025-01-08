import { uniswapV2PairAbi } from '../abi/uniswap-v2-pair';

export const lpTokens: Record<string, { name: string; abi: typeof uniswapV2PairAbi }> = {
  'SushiSwap LP Token': {
    name: 'SushiSwap',
    abi: uniswapV2PairAbi,
  },
};

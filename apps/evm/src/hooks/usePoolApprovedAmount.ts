import { useQuery } from '@tanstack/react-query';
import { readContract } from '@wagmi/core';
import { Address, erc20Abi, formatUnits } from 'viem';
import { useAccount } from 'wagmi';

import { useStateContext } from '@lendos/ui/providers/StateProvider';

import { ApproveData } from '@lendos/types/erc20';
import { MarketDataType } from '@lendos/types/market';

import { API_ETH_MOCK_ADDRESS, MAX_UINT_AMOUNT } from '@lendos/constants/addresses';
import { queryKeysFactory } from '@lendos/constants/queries';

import { wagmiConfigCore } from '../config/connectors';

const getAllowanceAmount = async (token: Address, user: Address, spender: Address) => {
  if (token.toLowerCase() === API_ETH_MOCK_ADDRESS.toLowerCase()) {
    return -1;
  }
  const allowance = await readContract(wagmiConfigCore, {
    abi: erc20Abi,
    address: token,
    functionName: 'allowance',
    args: [user, spender],
  });

  if (allowance.toString() === MAX_UINT_AMOUNT) {
    return -1;
  }

  let decimals: number;
  if (token.toLowerCase() === API_ETH_MOCK_ADDRESS.toLowerCase()) {
    decimals = 18;
  } else {
    decimals = await readContract(wagmiConfigCore, {
      abi: erc20Abi,
      address: token,
      functionName: 'decimals',
    });
  }

  return Number(formatUnits(allowance, decimals));
};

const getAllowance = async (
  token: Address,
  user: Address,
  market: MarketDataType,
): Promise<ApproveData> => {
  const spender =
    token.toLowerCase() === API_ETH_MOCK_ADDRESS.toLowerCase()
      ? market.addresses.WETH_GATEWAY
      : market.addresses.LENDING_POOL;

  const amount = await getAllowanceAmount(token, user, spender as Address);

  return { amount, spender, user, token };
};

export const usePoolApprovedAmount = (token: Address) => {
  const { currentMarketData } = useStateContext();
  const { address } = useAccount();
  return useQuery({
    queryFn: () => {
      return getAllowance(token, address ?? '0x', currentMarketData);
    },
    queryKey: queryKeysFactory.poolApprovedAmount(address ?? '0x', token, currentMarketData),
    enabled: Boolean(address),
  });
};

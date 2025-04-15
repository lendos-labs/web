import { Address, parseUnits } from 'viem';
import { useAccount } from 'wagmi';

import { useStateContext } from '@lendos/ui/providers/StateProvider';

import { TransactionBuilder } from '../services/transaction-builder';
import { EvmMarketDataType } from '../types/common';
import { useTransaction } from './useTransaction.ts';

export const useSupply = () => {
  const { address } = useAccount();
  const { currentMarketData } = useStateContext();
  const { action } = useTransaction();

  const txBuilder = new TransactionBuilder(currentMarketData as EvmMarketDataType);

  const supply = async (reserve: Address, amount: string, decimals: number) => {
    if (!address) {
      return '';
    }
    const txData = txBuilder.prepareSupply(reserve, parseUnits(amount, decimals), address);
    return await action(txData, amount);
  };

  return {
    action: supply,
  };
};

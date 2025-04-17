import { Address, parseUnits } from 'viem';
import { useAccount } from 'wagmi';

import { useStateContext } from '@lendos/ui/providers/StateProvider';

import { InterestRate } from '@lendos/types/reserves';

import { TransactionBuilder } from '../services/transaction-builder';
import { EvmMarketDataType } from '../types/common';
import { useTransaction } from './useTransaction.ts';

export const useRepay = () => {
  const { address } = useAccount();
  const { currentMarketData } = useStateContext();
  const { action } = useTransaction();

  const txBuilder = new TransactionBuilder(currentMarketData as EvmMarketDataType);

  const repay = async (
    reserve: Address,
    amount: string,
    interestRateMode: InterestRate,
    decimals: number,
  ) => {
    if (!address) {
      return '' as string;
    }

    const txData = txBuilder.prepareRepay(
      reserve,
      parseUnits(amount, decimals),
      interestRateMode,
      address,
    );
    return await action(txData, reserve);
  };

  return {
    action: repay,
  };
};

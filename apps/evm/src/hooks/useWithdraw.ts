import { estimateFeesPerGas, sendTransaction, waitForTransactionReceipt } from '@wagmi/core';
import { Address } from 'viem';
import { useAccount } from 'wagmi';

import { useModalContext } from '@lendos/ui/providers/ModalProvider';
import { useReservesContext } from '@lendos/ui/providers/ReservesProvider';
import { useStateContext } from '@lendos/ui/providers/StateProvider';

import { API_ETH_MOCK_ADDRESS } from '@lendos/constants/addresses';
import { queryKeysFactory } from '@lendos/constants/queries';
import { queryClient } from '@lendos/constants/queryClient';

import { wagmiConfigCore } from '../config/connectors.ts';
import { TransactionBuilder } from '../services/transaction-builder';
import { EvmApproveData, EvmMarketDataType } from '../types/common';
import { usePoolApprovedAmount } from './usePoolApprovedAmount';

export const useWithdraw = () => {
  const { address } = useAccount();
  const { reserves } = useReservesContext();
  const { args } = useModalContext();

  const assetAddress = (reserves.find(r => r.underlyingAsset === args.underlyingAsset)
    ?.underlyingAsset ?? '0x') as Address;

  const { data: _approvedAmount } = usePoolApprovedAmount(
    args.unWrapped ? API_ETH_MOCK_ADDRESS : assetAddress,
  );

  const { currentMarketData } = useStateContext();

  const txBuilder = new TransactionBuilder(currentMarketData as EvmMarketDataType);

  const withdraw = async (reserve: string, amount: string, decimals: number) => {
    const txData = txBuilder.prepareWithdraw(reserve as Address, amount, address ?? '0x', decimals);
    const approvedAmount = _approvedAmount ?? ({} as EvmApproveData);
    const txDataApproval = txBuilder.prepareApproval(approvedAmount);
    // if(wallet === 'solana') {
    //
    // }
    const gasApproval = await txBuilder.estimateGas({
      ...txDataApproval,
      chainId: currentMarketData.chain.id,
    });
    const result = await estimateFeesPerGas(wagmiConfigCore, {
      chainId: currentMarketData.chain.id,
    });

    const hashApproval = await sendTransaction(wagmiConfigCore, {
      ...txDataApproval,
      gas: gasApproval,
      maxFeePerGas: result.maxFeePerGas,
      maxPriorityFeePerGas: result.maxPriorityFeePerGas,
      chainId: currentMarketData.chain.id,
    });

    await waitForTransactionReceipt(wagmiConfigCore, {
      hash: hashApproval,
    });

    const gas = await txBuilder.estimateGas({ ...txData, chainId: currentMarketData.chain.id });

    const hash = await sendTransaction(wagmiConfigCore, {
      ...txData,
      gas,
      maxFeePerGas: result.maxFeePerGas,
      maxPriorityFeePerGas: result.maxPriorityFeePerGas,
      chainId: currentMarketData.chain.id,
    });

    await waitForTransactionReceipt(wagmiConfigCore, {
      hash,
    });

    await queryClient.invalidateQueries({ queryKey: queryKeysFactory.pool });

    return hash as string;
  };

  return {
    action: withdraw,
  };
};

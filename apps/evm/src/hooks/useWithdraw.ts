import { estimateFeesPerGas, sendTransaction, waitForTransactionReceipt } from '@wagmi/core';
import { Address } from 'viem';
import { useAccount } from 'wagmi';

import { useModalContext } from '@lendos/ui/providers/ModalProvider';
import { useReservesContext } from '@lendos/ui/providers/ReservesProvider';
import { useStateContext } from '@lendos/ui/providers/StateProvider';

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

  const { data: _approvedAmount } = usePoolApprovedAmount(assetAddress);

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
    console.log(1);
    const gas = await txBuilder.estimateGas({ ...txData, chainId: currentMarketData.chain.id });
    // Execution reverted with reason: Panic(17).
    //
    //   Estimate Gas Arguments:
    //   from:  0x4E66D91d5195E94717Ba849BBC9C23C87315d78d
    // to:    0x2666543d3822342CB6f2d135A1f98B89676F4d2B
    // data:  0x80500d2000000000000000000000000064916311cf63f208069e5ef6ca4b2a4dc1987e8a0000000000000000000000000000000000000000000000008ac7230489e800000000000000000000000000004e66d91d5195e94717ba849bbc9c23c87315d78d
    //
    // Details: execution reverted: Panic(17)
    // Version: 2.20.1

    console.log({ gas });
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

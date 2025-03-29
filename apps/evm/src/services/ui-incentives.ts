import { readContract } from '@wagmi/core';
import { Address } from 'viem';

import {
  IncentiveData,
  IncentiveDataHumanized,
  RewardInfo,
  UserIncentiveData,
  UserIncentiveDataHumanized,
  UserRewardInfo,
} from '@lendos/types/ui-incentives';

import { uiIncentivesV3 } from '../abi/ui-incentives-v3.ts';
import { wagmiConfigCore } from '../config/connectors.ts';
import { EvmMarketDataType } from '../types/common.ts';

class UiIncentivesService {
  async getReservesIncentivesDataHumanized(marketData: EvmMarketDataType) {
    const response = await readContract(wagmiConfigCore, {
      abi: uiIncentivesV3,
      address: marketData.addresses.UI_INCENTIVE_DATA_PROVIDER,
      functionName: 'getReservesIncentivesData',
      args: [marketData.addresses.LENDING_POOL_ADDRESS_PROVIDER],
      chainId: marketData.chain.id,
    });

    return response.map(r => ({
      id: `${marketData.chain.id}-${r.underlyingAsset}-${marketData.addresses.LENDING_POOL_ADDRESS_PROVIDER}`.toLowerCase(),
      underlyingAsset: r.underlyingAsset.toLowerCase(),
      aIncentiveData: this._formatIncentiveData(r.aIncentiveData as IncentiveData),
      vIncentiveData: this._formatIncentiveData(r.vIncentiveData as IncentiveData),
      sIncentiveData: this._formatIncentiveData(r.sIncentiveData as IncentiveData),
    }));
  }

  async getUserReservesIncentivesData(marketData: EvmMarketDataType, user: string) {
    const response = await readContract(wagmiConfigCore, {
      abi: uiIncentivesV3,
      address: marketData.addresses.UI_INCENTIVE_DATA_PROVIDER,
      functionName: 'getUserReservesIncentivesData',
      args: [marketData.addresses.LENDING_POOL_ADDRESS_PROVIDER, user as Address],
      chainId: marketData.chain.id,
    });

    return response.map(r => ({
      id: `${marketData.chain.id}-${user}-${r.underlyingAsset}-${marketData.addresses.LENDING_POOL_ADDRESS_PROVIDER}`.toLowerCase(),
      underlyingAsset: r.underlyingAsset.toLowerCase(),
      aTokenIncentivesUserData: this._formatUserIncentiveData(
        r.aTokenIncentivesUserData as UserIncentiveData,
      ),
      vTokenIncentivesUserData: this._formatUserIncentiveData(
        r.vTokenIncentivesUserData as UserIncentiveData,
      ),
      sTokenIncentivesUserData: this._formatUserIncentiveData(
        r.sTokenIncentivesUserData as UserIncentiveData,
      ),
    }));
  }

  private _formatIncentiveData(data: IncentiveData): IncentiveDataHumanized {
    return {
      tokenAddress: data.tokenAddress,
      incentiveControllerAddress: data.incentiveControllerAddress,
      rewardsTokenInformation: data.rewardsTokenInformation.map((rawRewardInfo: RewardInfo) => ({
        precision: rawRewardInfo.precision,
        rewardTokenAddress: rawRewardInfo.rewardTokenAddress,
        rewardTokenDecimals: rawRewardInfo.rewardTokenDecimals,
        emissionPerSecond: rawRewardInfo.emissionPerSecond.toString(),
        incentivesLastUpdateTimestamp: Number(
          rawRewardInfo.incentivesLastUpdateTimestamp.toString(),
        ),
        tokenIncentivesIndex: rawRewardInfo.tokenIncentivesIndex.toString(),
        emissionEndTimestamp: Number(rawRewardInfo.emissionEndTimestamp.toString()),
        rewardTokenSymbol: rawRewardInfo.rewardTokenSymbol,
        rewardOracleAddress: rawRewardInfo.rewardOracleAddress,
        rewardPriceFeed: rawRewardInfo.rewardPriceFeed.toString(),
        priceFeedDecimals: rawRewardInfo.priceFeedDecimals,
      })),
    };
  }

  private _formatUserIncentiveData(data: UserIncentiveData): UserIncentiveDataHumanized {
    return {
      tokenAddress: data.tokenAddress,
      incentiveControllerAddress: data.incentiveControllerAddress,
      userRewardsInformation: data.userRewardsInformation.map(
        (userRewardInformation: UserRewardInfo) => ({
          rewardTokenAddress: userRewardInformation.rewardTokenAddress,
          rewardTokenDecimals: userRewardInformation.rewardTokenDecimals,
          tokenIncentivesUserIndex: userRewardInformation.tokenIncentivesUserIndex.toString(),
          userUnclaimedRewards: userRewardInformation.userUnclaimedRewards.toString(),
          rewardTokenSymbol: userRewardInformation.rewardTokenSymbol,
          rewardOracleAddress: userRewardInformation.rewardOracleAddress,
          rewardPriceFeed: userRewardInformation.rewardPriceFeed.toString(),
          priceFeedDecimals: userRewardInformation.priceFeedDecimals,
        }),
      ),
    };
  }
}

export const uiIncentivesService = new UiIncentivesService();

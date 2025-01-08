import { readContract } from '@wagmi/core';

import { MarketDataType } from '@lendos/types/market';
import {
  IncentiveData,
  IncentiveDataHumanized,
  ReservesIncentiveData,
  RewardInfo,
  UserIncentiveData,
  UserIncentiveDataHumanized,
  UserReservesIncentivesData,
  UserRewardInfo,
} from '@lendos/types/ui-incentives';

import { uiIncentivesV3 } from '../abi/ui-incentives-v3.ts';
import { wagmiConfig } from '../config/connectors.ts';

export class UiIncentivesService {
  private readonly market: MarketDataType;

  constructor(market: MarketDataType) {
    this.market = market;
  }

  async getReservesIncentivesDataHumanized() {
    const response = await readContract(wagmiConfig, {
      abi: uiIncentivesV3,
      address: this.market.addresses.UI_POOL_DATA_PROVIDER,
      functionName: 'getReservesIncentivesData',
      args: [this.market.addresses.LENDING_POOL_ADDRESS_PROVIDER],
    });

    return (response as ReservesIncentiveData[]).map(r => ({
      id: `${this.market.chain.id}-${r.underlyingAsset}-${this.market.addresses.LENDING_POOL_ADDRESS_PROVIDER}`.toLowerCase(),
      underlyingAsset: r.underlyingAsset.toLowerCase(),
      aIncentiveData: this._formatIncentiveData(r.aIncentiveData),
      vIncentiveData: this._formatIncentiveData(r.vIncentiveData),
      sIncentiveData: this._formatIncentiveData(r.sIncentiveData),
    }));
  }

  async getUserReservesIncentivesData(user: string) {
    const response = await readContract(wagmiConfig, {
      abi: uiIncentivesV3,
      address: this.market.addresses.UI_POOL_DATA_PROVIDER,
      functionName: 'getUserReservesIncentivesData',
      args: [this.market.addresses.LENDING_POOL_ADDRESS_PROVIDER, user],
    });

    return (response as UserReservesIncentivesData[]).map(r => ({
      id: `${this.market.chain.id}-${user}-${r.underlyingAsset}-${this.market.addresses.LENDING_POOL_ADDRESS_PROVIDER}`.toLowerCase(),
      underlyingAsset: r.underlyingAsset.toLowerCase(),
      aTokenIncentivesUserData: this._formatUserIncentiveData(r.aTokenIncentivesUserData),
      vTokenIncentivesUserData: this._formatUserIncentiveData(r.vTokenIncentivesUserData),
      sTokenIncentivesUserData: this._formatUserIncentiveData(r.sTokenIncentivesUserData),
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
        incentivesLastUpdateTimestamp: rawRewardInfo.incentivesLastUpdateTimestamp.toNumber(),
        tokenIncentivesIndex: rawRewardInfo.tokenIncentivesIndex.toString(),
        emissionEndTimestamp: rawRewardInfo.emissionEndTimestamp.toNumber(),
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

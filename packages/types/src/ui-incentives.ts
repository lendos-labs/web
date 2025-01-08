import BigNumber from 'bignumber.js';

export interface RewardInfo {
  rewardTokenSymbol: string;
  rewardTokenAddress: string;
  rewardOracleAddress: string;
  emissionPerSecond: BigNumber;
  incentivesLastUpdateTimestamp: BigNumber;
  tokenIncentivesIndex: BigNumber;
  emissionEndTimestamp: BigNumber;
  rewardPriceFeed: BigNumber;
  rewardTokenDecimals: number;
  precision: number;
  priceFeedDecimals: number;
}

export interface IncentiveData {
  tokenAddress: string;
  incentiveControllerAddress: string;
  rewardsTokenInformation: RewardInfo[];
}

export interface ReservesIncentiveData {
  underlyingAsset: string;
  aIncentiveData: IncentiveData;
  vIncentiveData: IncentiveData;
  sIncentiveData: IncentiveData;
}

export interface RewardInfoHumanized {
  rewardTokenSymbol: string;
  rewardTokenAddress: string;
  rewardOracleAddress: string;
  emissionPerSecond: string;
  incentivesLastUpdateTimestamp: number;
  tokenIncentivesIndex: string;
  emissionEndTimestamp: number;
  rewardPriceFeed: string;
  rewardTokenDecimals: number;
  precision: number;
  priceFeedDecimals: number;
}

export interface UserRewardInfo {
  rewardTokenSymbol: string;
  rewardOracleAddress: string;
  rewardTokenAddress: string;
  userUnclaimedRewards: BigNumber;
  tokenIncentivesUserIndex: BigNumber;
  rewardPriceFeed: BigNumber;
  priceFeedDecimals: number;
  rewardTokenDecimals: number;
}

export interface UserIncentiveData {
  tokenAddress: string;
  incentiveControllerAddress: string;
  userRewardsInformation: UserRewardInfo[];
}

export interface UserReservesIncentivesData {
  underlyingAsset: string;
  aTokenIncentivesUserData: UserIncentiveData;
  vTokenIncentivesUserData: UserIncentiveData;
  sTokenIncentivesUserData: UserIncentiveData;
}

export interface IncentiveDataHumanized {
  tokenAddress: string;
  incentiveControllerAddress: string;
  rewardsTokenInformation: RewardInfoHumanized[];
}

export interface UserRewardInfoHumanized {
  rewardTokenSymbol: string;
  rewardOracleAddress: string;
  rewardTokenAddress: string;
  userUnclaimedRewards: string;
  tokenIncentivesUserIndex: string;
  rewardPriceFeed: string;
  priceFeedDecimals: number;
  rewardTokenDecimals: number;
}

export interface UserIncentiveDataHumanized {
  tokenAddress: string;
  incentiveControllerAddress: string;
  userRewardsInformation: UserRewardInfoHumanized[];
}

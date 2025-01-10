import { Address as UserAddress } from 'viem';

import {
  FormattedReservesAndIncentives,
  ReserveData,
  ReserveLpToken,
  ReserveToken,
} from './reserves';
import { UserIncentiveDataHumanized } from './ui-incentives';

export interface FormatReserveResponse extends ReserveData {
  formattedBaseLTVasCollateral: string;
  formattedReserveLiquidationThreshold: string;
  formattedReserveLiquidationBonus: string;
  formattedEModeLtv: string;
  formattedEModeLiquidationBonus: string;
  formattedEModeLiquidationThreshold: string;
  formattedAvailableLiquidity: string;
  totalDebt: string;
  totalVariableDebt: string;
  totalStableDebt: string;
  totalLiquidity: string;
  borrowUsageRatio: string;
  supplyUsageRatio: string;
  supplyAPY: string;
  variableBorrowAPY: string;
  stableBorrowAPY: string;
  unborrowedLiquidity: string;
  supplyAPR: string;
  variableBorrowAPR: string;
  stableBorrowAPR: string;
  isIsolated: boolean;
  isolationModeTotalDebtUSD: string;
  availableDebtCeilingUSD: string;
  debtCeilingUSD: string;
}

export interface FormatReserveUSDResponse extends FormatReserveResponse {
  totalLiquidityUSD: string;
  availableLiquidityUSD: string;
  totalDebtUSD: string;
  totalVariableDebtUSD: string;
  totalStableDebtUSD: string;
  borrowCapUSD: string;
  supplyCapUSD: string;
  unbackedUSD: string;
  priceInMarketReferenceCurrency: string;
  formattedPriceInMarketReferenceCurrency: string;
  priceInUSD: string;
}

export declare type UserIncentiveDict = Record<string, UserIncentive>;

export interface UserIncentive {
  incentiveControllerAddress: string;
  rewardTokenSymbol: string;
  rewardPriceFeed: string;
  rewardTokenDecimals: number;
  claimableRewards: bigint;
  assets: string[];
}

export interface UserReserveDataHumanized {
  id: string;
  underlyingAsset: string;
  scaledATokenBalance: string;
  usageAsCollateralEnabledOnUser: boolean;
  stableBorrowRate: string;
  scaledVariableDebt: string;
  principalStableDebt: string;
  stableBorrowLastUpdateTimestamp: number;
}

export interface UserReservesDataHumanized {
  userReserves: UserReserveDataHumanized[];
  userEmodeCategoryId: number;
}

export interface FormattedUserReserves<T = ReserveLpToken | ReserveToken> {
  id?: string;
  principalStableDebt: string;
  scaledATokenBalance: string;
  scaledVariableDebt: string;
  stableBorrowAPR: string;
  stableBorrowAPY: string;
  stableBorrowLastUpdateTimestamp: number;
  stableBorrowRate: string;
  stableBorrows: string;
  stableBorrowsMarketReferenceCurrency: string;
  stableBorrowsUSD: string;
  totalBorrows: string;
  totalBorrowsMarketReferenceCurrency: string;
  totalBorrowsUSD: string;
  underlyingAsset: Address;
  underlyingBalance: string;
  underlyingBalanceMarketReferenceCurrency: string;
  underlyingBalanceUSD: string;
  usageAsCollateralEnabledOnUser: boolean;
  variableBorrows: string;
  variableBorrowsMarketReferenceCurrency: string;
  variableBorrowsUSD: string;
  reserve: FormattedReservesAndIncentives<T>;
}

export interface UserSummaryAndIncentives<T = ReserveLpToken | ReserveToken> {
  calculatedUserIncentives: UserIncentiveDict;
  availableBorrowsMarketReferenceCurrency: string;
  availableBorrowsUSD: string;
  currentLiquidationThreshold: string;
  currentLoanToValue: string;
  healthFactor: string;
  isInIsolationMode: boolean;
  isolatedReserve?: FormatReserveUSDResponse;
  netWorthUSD: string;
  totalBorrowsMarketReferenceCurrency: string;
  totalBorrowsUSD: string;
  totalCollateralMarketReferenceCurrency: string;
  totalCollateralUSD: string;
  totalLiquidityMarketReferenceCurrency: string;
  totalLiquidityUSD: string;
  userReservesData: FormattedUserReserves<T>[];
}

export type ExtendedFormattedUser<T = ReserveLpToken | ReserveToken> =
  UserSummaryAndIncentives<T> & {
    earnedAPY: number;
    debtAPY: number;
    netAPY: number;
    isInEmode: boolean;
    userEmodeCategoryId: number;
  };

export type UserReserveData = [
  {
    underlyingAsset: Address;
    scaledATokenBalance: bigint;
    usageAsCollateralEnabledOnUser: boolean;
    stableBorrowRate: bigint;
    scaledVariableDebt: bigint;
    principalStableDebt: bigint;
    stableBorrowLastUpdateTimestamp: bigint;
  }[],
  number,
];

export type Address = UserAddress;

export interface UserYield {
  earnedAPY: number;
  debtAPY: number;
  netAPY: number;
}

export interface CombinedReserveData<T extends FormatReserveUSDResponse = FormatReserveUSDResponse>
  extends UserReserveData {
  reserve: T;
}

export interface ComputedUserReserve<T extends FormatReserveUSDResponse = FormatReserveUSDResponse>
  extends CombinedReserveData<T> {
  underlyingBalance: string;
  underlyingBalanceMarketReferenceCurrency: string;
  underlyingBalanceUSD: string;
  variableBorrows: string;
  variableBorrowsMarketReferenceCurrency: string;
  variableBorrowsUSD: string;
  stableBorrows: string;
  stableBorrowsMarketReferenceCurrency: string;
  stableBorrowsUSD: string;
  totalBorrows: string;
  totalBorrowsMarketReferenceCurrency: string;
  totalBorrowsUSD: string;
  stableBorrowAPY: string;
  stableBorrowAPR: string;
}

export interface FormatUserSummaryResponse<
  T extends FormatReserveUSDResponse = FormatReserveUSDResponse,
> {
  userReservesData: ComputedUserReserve<T>[];
  totalLiquidityMarketReferenceCurrency: string;
  totalLiquidityUSD: string;
  totalCollateralMarketReferenceCurrency: string;
  totalCollateralUSD: string;
  totalBorrowsMarketReferenceCurrency: string;
  totalBorrowsUSD: string;
  netWorthUSD: string;
  availableBorrowsMarketReferenceCurrency: string;
  availableBorrowsUSD: string;
  currentLoanToValue: string;
  currentLiquidationThreshold: string;
  healthFactor: string;
  isInIsolationMode: boolean;
  isolatedReserve?: FormatReserveUSDResponse;
}

export interface UserReservesIncentivesDataHumanized {
  id: string;
  underlyingAsset: string;
  aTokenIncentivesUserData: UserIncentiveDataHumanized;
  vTokenIncentivesUserData: UserIncentiveDataHumanized;
  sTokenIncentivesUserData: UserIncentiveDataHumanized;
}

export interface FormatUserSummaryAndIncentivesResponse<
  T extends FormatReserveUSDResponse = FormatReserveUSDResponse,
> extends FormatUserSummaryResponse<T> {
  calculatedUserIncentives: UserIncentiveDict;
}

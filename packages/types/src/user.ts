import { UserReserveDataHumanized } from '@aave/contract-helpers';
import { BigNumber } from 'bignumber.js';
import {
  FormattedReservesAndIncentives,
  ReserveData,
  ReserveLpToken,
  ReserveToken,
} from './reserves';

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

export declare type UserIncentiveDict = Record<string, UserIncentiveData>;

export interface UserIncentiveData {
  incentiveControllerAddress: string;
  rewardTokenSymbol: string;
  rewardPriceFeed: string;
  rewardTokenDecimals: number;
  claimableRewards: BigNumber;
  assets: string[];
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
  underlyingAsset: string;
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

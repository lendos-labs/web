import { ReserveDataHumanized as ReserveDataHumanizedType } from '@aave/contract-helpers';
import { ExtendedFormattedUser } from './user.js';

export interface ReserveIncentiveResponse {
  incentiveAPR: string;
  rewardTokenAddress: string;
  rewardTokenSymbol: string;
}

export interface IconMapInterface {
  iconSymbol: string;
  name?: string;
  symbol?: string;
}

export enum InterestRate {
  None = 'None',
  Stable = 'Stable',
  Variable = 'Variable',
}

export enum Reserves {
  ASSET = 'asset',
  LP = 'lp',
}

export enum EXPOSURE {
  SINGLE = 'single',
  MULTI = 'multi',
}

export interface LpToken {
  address: string;
  symbol: string;
}

export interface ReserveLpToken {
  type: Reserves.LP;
  token0: LpToken;
  token1: LpToken;
  dex: {
    name: string;
    APY: number;
    totalSupply: string;
    reserve0: string;
    reserve1: string;
  };
  exposure: EXPOSURE;
}

export interface ReserveToken {
  type: Reserves.ASSET;
}

export type ReserveDataHumanized<T = ReserveLpToken | ReserveToken> = ReserveDataHumanizedType & T;

export interface ReservesDataHumanized {
  reservesData: ReserveDataHumanized[];
  baseCurrencyData: PoolBaseCurrencyHumanized;
}

export interface FormattedReserveAndIncentive {
  totalDebt: string;
  totalStableDebt: string;
  totalVariableDebt: string;
  totalLiquidity: string;
  borrowUsageRatio: string;
  supplyUsageRatio: string;
  formattedReserveLiquidationBonus: string;
  formattedEModeLiquidationBonus: string;
  formattedEModeLiquidationThreshold: string;
  formattedEModeLtv: string;
  supplyAPY: string;
  variableBorrowAPY: string;
  stableBorrowAPY: string;
  formattedAvailableLiquidity: string;
  unborrowedLiquidity: string;
  formattedBaseLTVasCollateral: string;
  supplyAPR: string;
  variableBorrowAPR: string;
  stableBorrowAPR: string;
  formattedReserveLiquidationThreshold: string;
  debtCeilingUSD: string;
  isolationModeTotalDebtUSD: string;
  availableDebtCeilingUSD: string;
  isIsolated: boolean;
  totalLiquidityUSD: string;
  availableLiquidityUSD: string;
  totalDebtUSD: string;
  totalVariableDebtUSD: string;
  totalStableDebtUSD: string;
  formattedPriceInMarketReferenceCurrency: string;
  priceInUSD: string;
  borrowCapUSD: string;
  supplyCapUSD: string;
  unbackedUSD: string;
  aIncentivesData?: ReserveIncentiveResponse[];
  vIncentivesData?: ReserveIncentiveResponse[];
  sIncentivesData?: ReserveIncentiveResponse[];
}

export type FormattedReservesAndIncentives<T = ReserveLpToken | ReserveToken> =
  FormattedReserveAndIncentive &
    IconMapInterface & {
      isWrappedBaseAsset: boolean;
      rewardAPY?: number;
    } & ReserveDataHumanized<T>;

export interface ReserveData {
  id: string;
  symbol: string;
  name: string;
  decimals: number;
  underlyingAsset: string;
  usageAsCollateralEnabled: boolean;
  reserveFactor: string;
  baseLTVasCollateral: string;
  averageStableRate: string;
  stableDebtLastUpdateTimestamp: number;
  liquidityIndex: string;
  reserveLiquidationThreshold: string;
  reserveLiquidationBonus: string;
  variableBorrowIndex: string;
  variableBorrowRate: string;
  availableLiquidity: string;
  stableBorrowRate: string;
  liquidityRate: string;
  totalPrincipalStableDebt: string;
  totalScaledVariableDebt: string;
  lastUpdateTimestamp: number;
  eModeCategoryId: number;
  borrowCap: string;
  supplyCap: string;
  debtCeiling: string;
  debtCeilingDecimals: number;
  isolationModeTotalDebt: string;
  eModeLtv: number;
  eModeLiquidationThreshold: number;
  eModeLiquidationBonus: number;
  unbacked: string;
}

export interface BorrowAssetsItem {
  id: string;
  symbol: string;
  name: string;
  iconSymbol: string;
  underlyingAsset: string;
  stableBorrowRate: number | string;
  variableBorrowRate: number | string;
  availableBorrows: number | string;
  availableBorrowsInUSD: number | string;
  stableBorrowRateEnabled?: boolean;
  isFreezed?: boolean;
  aIncentivesData?: ReserveIncentiveResponse[];
  vIncentivesData?: ReserveIncentiveResponse[];
  sIncentivesData?: ReserveIncentiveResponse[];
  borrowCap: string;
  borrowableInIsolation: boolean;
  totalBorrows: string;
  totalLiquidityUSD: string;
  borrowingEnabled: boolean;
  isActive: boolean;
  eModeCategoryId: number;
}

export interface SupplyAssetsItem {
  underlyingAsset: string;
  symbol: string;
  iconSymbol: string;
  name: string;
  walletBalance: string;
  walletBalanceUSD: string;
  availableToDeposit: string;
  availableToDepositUSD: string;
  supplyAPY: number | string;
  aIncentivesData?: ReserveIncentiveResponse[];
  isFreezed?: boolean;
  isIsolated: boolean;
  totalLiquidity: string;
  supplyCap: string;
  isActive?: boolean;
  usageAsCollateralEnabledOnUser: boolean;
  detailsAddress: string;
}

type DashboardReserveData<T> = ExtendedFormattedUser['userReservesData'][0] &
  FormattedReservesAndIncentives<T> &
  BorrowAssetsItem &
  SupplyAssetsItem;

export type DashboardReserve<T = ReserveToken | ReserveLpToken> = DashboardReserveData<T> & {
  // Additions
  borrowRateMode: InterestRate; // for the borrow positions list
  // Overrides
  reserve: FormattedReservesAndIncentives;
};

export interface EmodeCategory {
  id: number;
  ltv: number;
  liquidationThreshold: number;
  liquidationBonus: number;
  priceSource: string;
  label: string;
  assets: string[];
}

export interface PoolBaseCurrencyHumanized {
  marketReferenceCurrencyDecimals: number;
  marketReferenceCurrencyPriceInUsd: string;
  networkBaseTokenPriceInUsd: string;
  networkBaseTokenPriceDecimals: number;
}

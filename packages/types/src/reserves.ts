import { ReserveDataHumanized as ReserveDataHumanizedType } from '@aave/contract-helpers';

import { IncentiveDataHumanized } from './ui-incentives';
import { FormatReserveUSDResponse } from './user';

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

export interface TotalFormatReserve extends FormatReserveUSDResponse {
  market: string;
  marketTitle: string;
  chainId: number;
  iconSymbol?: string;
}

export interface TotalFormatReserveWithMarkets extends TotalFormatReserve {
  markets: TotalFormatReserve[];
}

export type ReservesData = [
  {
    underlyingAsset: string;
    name: string;
    symbol: string;
    decimals: bigint;
    baseLTVasCollateral: bigint;
    reserveLiquidationThreshold: bigint;
    reserveLiquidationBonus: bigint;
    reserveFactor: bigint;
    usageAsCollateralEnabled: boolean;
    borrowingEnabled: boolean;
    stableBorrowRateEnabled: boolean;
    isActive: boolean;
    isFrozen: boolean;
    liquidityIndex: bigint;
    variableBorrowIndex: bigint;
    liquidityRate: bigint;
    variableBorrowRate: bigint;
    stableBorrowRate: bigint;
    lastUpdateTimestamp: number;
    aTokenAddress: string;
    stableDebtTokenAddress: string;
    variableDebtTokenAddress: string;
    interestRateStrategyAddress: string;
    availableLiquidity: bigint;
    totalPrincipalStableDebt: bigint;
    averageStableRate: bigint;
    stableDebtLastUpdateTimestamp: bigint;
    totalScaledVariableDebt: bigint;
    priceInMarketReferenceCurrency: bigint;
    priceOracle: string;
    variableRateSlope1: bigint;
    variableRateSlope2: bigint;
    stableRateSlope1: bigint;
    stableRateSlope2: bigint;
    baseStableBorrowRate: bigint;
    baseVariableBorrowRate: bigint;
    optimalUsageRatio: bigint;
    isPaused: boolean;
    isSiloedBorrowing: boolean;
    accruedToTreasury: bigint;
    unbacked: bigint;
    isolationModeTotalDebt: bigint;
    debtCeiling: bigint;
    debtCeilingDecimals: bigint;
    eModeCategoryId: number;
    borrowCap: bigint;
    supplyCap: bigint;
    eModeLtv: number;
    eModeLiquidationThreshold: number;
    eModeLiquidationBonus: number;
    eModePriceSource: string;
    eModeLabel: string;
    borrowableInIsolation: boolean;
    flashLoanEnabled: boolean;
  }[],
  {
    marketReferenceCurrencyUnit: bigint;
    marketReferenceCurrencyPriceInUsd: bigint;
    networkBaseTokenPriceInUsd: bigint;
    networkBaseTokenPriceDecimals: number;
  },
];

export interface ReservesIncentiveDataHumanized {
  id: string;
  underlyingAsset: string;
  aIncentiveData: IncentiveDataHumanized;
  vIncentiveData: IncentiveDataHumanized;
  sIncentiveData: IncentiveDataHumanized;
}

import {
  PoolBaseCurrencyHumanized,
  ReserveDataHumanized as ReserveDataHumanizedType,
} from '@aave/contract-helpers';

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

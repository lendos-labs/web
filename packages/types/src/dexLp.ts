import { FormattedReservesAndIncentives, ReserveLpToken } from './reserves.js';
import { FormattedUserReserves } from './user.js';

export enum PoolCategories {
  ALL_POOLS = 'All Pools',
  UNDER_COLLATERAL = 'Under Collateral',
}

export interface PoolData {
  token0: string;
  token1: string;
  data: FormattedReservesAndIncentives<ReserveLpToken>[];
}

export interface UserPoolData {
  token0: string;
  token1: string;
  collateral: number;
  data: FormattedUserReserves<ReserveLpToken>[];
}

export enum Filters {
  TYPE = 'type',
  TOKEN = 'token',
  SEARCH = 'search',
}

export enum ESupportedTimeRanges {
  OneMonth = '1m',
  SixMonths = '6m',
  OneYear = '1y',
}

export const reserveRateTimeRangeOptions = [
  ESupportedTimeRanges.OneMonth,
  ESupportedTimeRanges.SixMonths,
  ESupportedTimeRanges.OneYear,
];

export type ReserveRateTimeRange = (typeof reserveRateTimeRangeOptions)[number];

export interface FormattedReserveHistoryItem {
  date: number;
  liquidityRate: number;
  utilizationRate: number;
  stableBorrowRate: number;
  variableBorrowRate: number;
}
export type Field = keyof FormattedReserveHistoryItem;

export interface Fields {
  name: Field;
  color: string;
  text: string;
}

export enum ApyGraphContainerKey {
  'supply',
  'borrow',
}

import { FormattedReservesAndIncentives, ReserveToken } from '@lendos/types/reserves';

export interface AvailablePair {
  lend: string;
  borrow: string;
}

export interface Pair {
  lend: FormattedReservesAndIncentives<ReserveToken>;
  borrow: FormattedReservesAndIncentives<ReserveToken>;
  name: string;
}

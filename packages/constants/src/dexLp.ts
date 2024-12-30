import { Filters, PoolCategories } from '@lendos/types/dexLp';
import { EXPOSURE } from '@lendos/types/reserves';

export const poolCategories = [
  {
    type: PoolCategories.ALL_POOLS,
  },
  {
    type: PoolCategories.UNDER_COLLATERAL,
  },
];

export const filtersInitValue = {
  [PoolCategories.ALL_POOLS]: { [Filters.TOKEN]: '', [Filters.TYPE]: '', [Filters.SEARCH]: '' },
  [PoolCategories.UNDER_COLLATERAL]: {
    [Filters.TOKEN]: '',
    [Filters.TYPE]: '',
    [Filters.SEARCH]: '',
  },
};

export const poolTypes: EXPOSURE[] = [EXPOSURE.SINGLE, EXPOSURE.MULTI];

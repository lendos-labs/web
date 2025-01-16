import { Reserves } from '@lendos/types/reserves';

import { CookieKey } from '@lendos/constants/cookie';

import { TableHeadProperties } from '../../../components/Table';

export const supplyAssetsHead: TableHeadProperties[] = [
  {
    key: 'symbol',
    title: 'Assets',
    sortKey: 'symbol',
    mobileHide: true,
  },
  {
    key: 'walletBalance',
    title: 'Wallet balance',
    sortKey: 'walletBalance',
  },
  {
    key: 'supplyAPY',
    title: 'APY',
    sortKey: 'supplyAPY',
  },
  {
    key: 'usageAsCollateralEnabledOnUser',
    title: 'Can be collateral',
  },
  {
    key: 'action',
    title: '',
  },
];

export const dexLpSupplyAssetsHead: TableHeadProperties[] = [
  {
    key: 'symbol',
    title: 'Pool',
    mobileHide: true,
  },
  {
    key: 'walletBalance',
    title: 'Collateral value',
    sortKey: 'walletBalance',
  },

  {
    key: 'dex',
    title: 'DEX',
  },
  {
    key: 'action',
    title: '',
  },
];

export const supplyAssetsDataByType: Record<
  Reserves,
  {
    showZeroStorageName: CookieKey.SHOW_ZERO_ASSETS | CookieKey.SHOW_ZERO_LPS;
    collapseStorageName:
      | CookieKey.SUPPLY_ASSET_DASHBOARD_COLLAPSE
      | CookieKey.SUPPLY_LP_DASHBOARD_COLLAPSE;
    title: string;
    header: TableHeadProperties[];
  }
> = {
  [Reserves.ASSET]: {
    showZeroStorageName: CookieKey.SHOW_ZERO_ASSETS,
    collapseStorageName: CookieKey.SUPPLY_ASSET_DASHBOARD_COLLAPSE,
    header: supplyAssetsHead,
    title: 'Assets to supply',
  },
  [Reserves.LP]: {
    showZeroStorageName: CookieKey.SHOW_ZERO_LPS,
    collapseStorageName: CookieKey.SUPPLY_LP_DASHBOARD_COLLAPSE,
    header: dexLpSupplyAssetsHead,
    title: 'LP tokens to supply',
  },
};

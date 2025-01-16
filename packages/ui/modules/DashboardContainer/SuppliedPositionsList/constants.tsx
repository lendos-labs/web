import { Reserves } from '@lendos/types/reserves';

import { CookieKey } from '@lendos/constants/cookie';

import { TableHeadProperties } from '../../../components/Table';
import { CollateralSwitchTooltip } from '../../../components/infoTooltips/CollateralSwitchTooltip';

const suppliedPositionsHead: TableHeadProperties[] = [
  {
    key: 'symbol',
    title: 'Assets',
    sortKey: 'symbol',
    mobileHide: true,
  },
  {
    key: 'underlyingBalance',
    title: 'Balance',
    sortKey: 'underlyingBalance',
  },
  {
    key: 'supplyAPY',
    title: 'APY',
    sortKey: 'supplyAPY',
  },
  {
    key: 'usageAsCollateralEnabledOnUser',
    title: <CollateralSwitchTooltip text='Collateral' variant='h3' />,
  },
  {
    key: 'action',
    title: '',
  },
];

const lpHead = [
  {
    key: 'symbol',
    title: 'Pool',
    mobileHide: true,
  },
  {
    key: 'underlyingBalanceUSD',
    title: 'Value',
    sortKey: 'underlyingBalanceUSD',
  },
  {
    key: 'dexName',
    title: 'DEX',
    sortKey: 'dexName',
  },
  {
    key: 'action',
    title: '',
  },
];

export const suppliedAssetsDataByType: Record<
  Reserves,
  {
    collapseStorageName:
      | CookieKey.SUPPLIED_ASSET_DASHBOARD_COLLAPSE
      | CookieKey.SUPPLIED_LP_DASHBOARD_COLLAPSE;
    title: string;
    header: TableHeadProperties[];
  }
> = {
  [Reserves.ASSET]: {
    collapseStorageName: CookieKey.SUPPLIED_ASSET_DASHBOARD_COLLAPSE,
    title: 'Your supplies',
    header: suppliedPositionsHead,
  },
  [Reserves.LP]: {
    collapseStorageName: CookieKey.SUPPLIED_LP_DASHBOARD_COLLAPSE,
    title: 'LP tokens under collateral',
    header: lpHead,
  },
};

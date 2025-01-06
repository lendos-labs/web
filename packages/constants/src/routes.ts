import { Navigation, NavigationWithSubmenu } from '@lendos/types/menu';

import { isFeatureEnabled } from './markets';

export enum Routes {
  dashboard = '/',
  markets = '/markets',
  dexLp = '/dex-lp',
  total = '/total',
  staking = '/staking',
  points = '/points',
  governance = '/governance',
  faucet = '/faucet',
  strategies = '/strategies',
  declaration = '/declaration-and-disclaimers',
  reserveOverview = '/reserve-overview',
  proposal = '/governance/v3/proposal',
  history = '/history',
  borrowBoost = '/borrow-boost',
}

export const earnsNavigation: Navigation[] = [
  {
    link: (market?: string) => `/${market}${Routes.markets}`,
    title: 'Markets',
    dataCy: 'menuMarkets',
  },
  {
    link: (market?: string) => `/${market}${Routes.dexLp}`,
    title: 'DEX LP',
    dataCy: 'menuDexLp',
    isVisible: data => isFeatureEnabled.dexLp(data),
  },
  {
    link: (market?: string) => `/${market}${Routes.strategies}`,
    title: 'Strategies',
    dataCy: 'menuStrategies',
    isVisible: data => isFeatureEnabled.strategies(data),
  },
];

export const navigation: (Navigation | NavigationWithSubmenu)[] = [
  {
    link: (market?: string) => `/${market}${Routes.dashboard}`,
    title: 'Dashboard',
    dataCy: 'menuDashboard',
    isMobile: true,
  },
  {
    title: 'Earn',
    dataCy: 'menuEarn',
    subMenu: earnsNavigation,
    isMobile: false,
  },
  {
    link: () => Routes.points,
    title: 'Points',
    dataCy: 'menuPoints',
    isVisible: data => isFeatureEnabled.points(data),
    isMobile: true,
  },
  {
    link: () => Routes.governance,
    title: 'Governance',
    dataCy: 'menuGovernance',
    isMobile: true,
  },
];

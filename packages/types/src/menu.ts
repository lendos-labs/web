import { MarketDataType } from './market.js';

export interface Navigation {
  link: string;
  title: string;
  isVisible?: (data: MarketDataType) => boolean | undefined;
  dataCy?: string;
  isMobile?: boolean;
}

export interface NavigationWithSubmenu {
  title: string;
  isVisible?: (data: MarketDataType) => boolean | undefined;
  dataCy?: string;
  subMenu: Navigation[];
  isMobile?: boolean;
}

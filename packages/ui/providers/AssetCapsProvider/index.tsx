'use client';

import { valueToBigNumber } from '@aave/math-utils';
import { FormattedReservesAndIncentives } from '@lendos/types/reserves';
import { createContext, ReactNode, useContext } from 'react';
import { AssetCapUsageData } from './types';
import { SupplyCapWarning } from './SupplyCapWarning';
import { SupplyCapMaxedTooltip } from './SupplyCapMaxedTooltip';
import { BorrowCapWarning } from './BorrowCapWarning';
import { BorrowCapMaxedTooltip } from './BorrowCapMaxedTooltip';
import { DebtCeilingWarning } from './DebtCeilingWarning';
import { DebtCeilingMaxedTooltip } from './DebtCeilingMaxedTooltip';

const getAssetCapData = (asset: FormattedReservesAndIncentives): AssetCapUsageData => {
  const { supplyCapUsage, supplyCapReached } = getSupplyCapData(asset);
  const { borrowCapUsage, borrowCapReached } = getBorrowCapData(asset);
  const { debtCeilingUsage, debtCeilingReached } = getDebtCeilingData(asset);
  /*
    Aggregated Data
  */
  const assetCapUsageData: AssetCapUsageData = {
    reserve: asset,
    supplyCap: {
      percentUsed: supplyCapUsage,
      isMaxed: supplyCapReached,
      determineWarningDisplay: ({ supplyCap, icon, ...rest }) =>
        supplyCap ? <SupplyCapWarning supplyCap={supplyCap} icon={icon} {...rest} /> : null,
      displayMaxedTooltip: ({ supplyCap }) =>
        supplyCap ? <SupplyCapMaxedTooltip supplyCap={supplyCap} /> : null,
    },
    borrowCap: {
      percentUsed: borrowCapUsage,
      isMaxed: borrowCapReached,
      // percentUsed: 98.5,
      // isMaxed: false,
      determineWarningDisplay: ({ borrowCap, icon, ...rest }) =>
        borrowCap ? <BorrowCapWarning borrowCap={borrowCap} icon={icon} {...rest} /> : null,
      displayMaxedTooltip: ({ borrowCap }) =>
        borrowCap ? <BorrowCapMaxedTooltip borrowCap={borrowCap} /> : null,
    },
    debtCeiling: {
      percentUsed: debtCeilingUsage,
      isMaxed: debtCeilingReached,
      // percentUsed: 99.994,
      // isMaxed: true,
      determineWarningDisplay: ({ debtCeiling, icon, ...rest }) =>
        debtCeiling ? <DebtCeilingWarning debtCeiling={debtCeiling} icon={icon} {...rest} /> : null,
      displayMaxedTooltip: ({ debtCeiling }) =>
        debtCeiling ? <DebtCeilingMaxedTooltip debtCeiling={debtCeiling} /> : null,
    },
  };

  return assetCapUsageData;
};

/*
  Asset Caps Context
*/
const AssetCapsContext = createContext({} as AssetCapUsageData);

/*
  Asset Caps Provider Component
*/
export const AssetCapsProvider = ({
  children,
  asset,
}: {
  children: ReactNode;
  asset: FormattedReservesAndIncentives;
}) => {
  const providerValue = getAssetCapData(asset);

  return <AssetCapsContext.Provider value={providerValue}>{children}</AssetCapsContext.Provider>;
};

/*
  useAssetCaspsContext hook
*/
export const useAssetCaps = () => {
  const context = useContext(AssetCapsContext);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- check is hook call inside provider
  if (!context) {
    throw new Error(
      'useAssetCaps() can only be used inside of <AssetCapsProvider />, ' +
        'please declare it at a higher level.',
    );
  }

  return context;
};

/**
 * Calculates supply cap usage and % of totalLiquidity / supplyCap.
 * @param asset FormattedReservesAndIncentives
 * @returns { supplyCapUsage: number, supplyCapReached: boolean }
 */
export const getSupplyCapData = (asset: FormattedReservesAndIncentives) => {
  let supplyCapUsage: number = Number(asset.totalLiquidity)
    ? valueToBigNumber(asset.totalLiquidity).dividedBy(asset.supplyCap).toNumber() * 100
    : 0;
  supplyCapUsage = supplyCapUsage === Infinity ? 0 : supplyCapUsage;
  const supplyCapReached = supplyCapUsage >= 99.99;
  return { supplyCapUsage, supplyCapReached };
};

/**
 * Calculates borrow cap usage and % of totalDebt / borrowCap.
 * @param asset FormattedReservesAndIncentives
 * @returns { borrowCapUsage: number, borrowCapReached: boolean }
 */
export const getBorrowCapData = (asset: FormattedReservesAndIncentives) => {
  let borrowCapUsage: number = Number(asset.totalDebt)
    ? valueToBigNumber(asset.totalDebt).dividedBy(asset.borrowCap).toNumber() * 100
    : 0;
  borrowCapUsage = borrowCapUsage === Infinity ? 0 : borrowCapUsage;
  const borrowCapReached = borrowCapUsage >= 99.99;
  return { borrowCapUsage, borrowCapReached };
};

/**
 * Calculates debt ceiling usage and % of isolationModeTotalDebt / debtCeiling.
 * @param asset
 * @returns {debtCeilingUsage: number, debtCeilingReached: boolean}
 */
export const getDebtCeilingData = (asset: FormattedReservesAndIncentives) => {
  let debtCeilingUsage: number = Number(asset.isolationModeTotalDebt)
    ? valueToBigNumber(asset.isolationModeTotalDebt).dividedBy(asset.debtCeiling).toNumber() * 100
    : 0;
  debtCeilingUsage = debtCeilingUsage === Infinity ? 0 : debtCeilingUsage;
  const debtCeilingReached = debtCeilingUsage >= 99.99;
  return { debtCeilingUsage, debtCeilingReached };
};

import { ReserveDataHumanized, UserReserveDataHumanized } from '@aave/contract-helpers';
import { formatReservesAndIncentives as _formatReservesAndIncentives } from '@aave/math-utils';
import { formatUserSummaryAndIncentives as _formatUserSummaryAndIncentives } from '@aave/math-utils/dist/esm/formatters/user';
import dayjs from 'dayjs';
import memoize from 'micro-memoize';

import { NetworkConfig } from '@lendos/types/chain';
import {
  FormattedReservesAndIncentives,
  PoolBaseCurrencyHumanized,
  ReservesData,
  ReservesDataHumanized,
  ReservesIncentiveDataHumanized,
} from '@lendos/types/reserves';
import {
  UserReserveData,
  UserReservesDataHumanized,
  UserReservesIncentivesDataHumanized,
} from '@lendos/types/user';

import { Address } from './common';
import {
  selectBaseCurrencyData,
  selectReserves,
  selectUserEModeCategory,
  selectUserReservesData,
} from './selectors';
import { reserveSortFn } from './sort';

export const formatUserReserves = (
  data: UserReserveData,
  chainId: number,
  user: Address,
  lendingPoolAddressProvider: Address,
): {
  userReserves: UserReserveDataHumanized[];
  userEmodeCategoryId: number;
} => {
  const { 0: userReservesRaw, 1: userEmodeCategoryId } = data;

  const userReserves: UserReserveDataHumanized[] = userReservesRaw.map(userReserveRaw => ({
    id: `${chainId}-${user}-${userReserveRaw.underlyingAsset}-${lendingPoolAddressProvider}`.toLowerCase(),
    underlyingAsset: userReserveRaw.underlyingAsset.toLowerCase(),
    scaledATokenBalance: userReserveRaw.scaledATokenBalance.toString(),
    usageAsCollateralEnabledOnUser: userReserveRaw.usageAsCollateralEnabledOnUser,
    stableBorrowRate: userReserveRaw.stableBorrowRate.toString(),
    scaledVariableDebt: userReserveRaw.scaledVariableDebt.toString(),
    principalStableDebt: userReserveRaw.principalStableDebt.toString(),
    stableBorrowLastUpdateTimestamp: Number(
      userReserveRaw.stableBorrowLastUpdateTimestamp.toString(),
    ),
  }));

  return {
    userReserves,
    userEmodeCategoryId,
  };
};

export const formatReserves = (
  data: ReservesData,
  chainId: number,
  lendingPoolAddressProvider: Address,
): {
  reservesData: ReserveDataHumanized[];
  baseCurrencyData: PoolBaseCurrencyHumanized;
} => {
  const { 0: reservesRaw, 1: poolBaseCurrencyRaw } = data;

  const reservesData = reservesRaw.map(reserveRaw => ({
    id: `${chainId}-${reserveRaw.underlyingAsset}-${lendingPoolAddressProvider}`.toLowerCase(),
    underlyingAsset: reserveRaw.underlyingAsset.toLowerCase(),
    name: reserveRaw.name,
    symbol: reserveRaw.symbol,
    decimals: Number(reserveRaw.decimals.toString()),
    baseLTVasCollateral: reserveRaw.baseLTVasCollateral.toString(),
    reserveLiquidationThreshold: reserveRaw.reserveLiquidationThreshold.toString(),
    reserveLiquidationBonus: reserveRaw.reserveLiquidationBonus.toString(),
    reserveFactor: reserveRaw.reserveFactor.toString(),
    usageAsCollateralEnabled: reserveRaw.usageAsCollateralEnabled,
    borrowingEnabled: reserveRaw.borrowingEnabled,
    stableBorrowRateEnabled: reserveRaw.stableBorrowRateEnabled,
    isActive: reserveRaw.isActive,
    isFrozen: reserveRaw.isFrozen,
    liquidityIndex: reserveRaw.liquidityIndex.toString(),
    variableBorrowIndex: reserveRaw.variableBorrowIndex.toString(),
    liquidityRate: reserveRaw.liquidityRate.toString(),
    variableBorrowRate: reserveRaw.variableBorrowRate.toString(),
    stableBorrowRate: reserveRaw.stableBorrowRate.toString(),
    lastUpdateTimestamp: reserveRaw.lastUpdateTimestamp,
    aTokenAddress: reserveRaw.aTokenAddress.toString(),
    stableDebtTokenAddress: reserveRaw.stableDebtTokenAddress.toString(),
    variableDebtTokenAddress: reserveRaw.variableDebtTokenAddress.toString(),
    interestRateStrategyAddress: reserveRaw.interestRateStrategyAddress.toString(),
    availableLiquidity: reserveRaw.availableLiquidity.toString(),
    totalPrincipalStableDebt: reserveRaw.totalPrincipalStableDebt.toString(),
    averageStableRate: reserveRaw.averageStableRate.toString(),
    stableDebtLastUpdateTimestamp: Number(reserveRaw.stableDebtLastUpdateTimestamp.toString()),
    totalScaledVariableDebt: reserveRaw.totalScaledVariableDebt.toString(),
    priceInMarketReferenceCurrency: reserveRaw.priceInMarketReferenceCurrency.toString(),
    priceOracle: reserveRaw.priceOracle,
    variableRateSlope1: reserveRaw.variableRateSlope1.toString(),
    variableRateSlope2: reserveRaw.variableRateSlope2.toString(),
    stableRateSlope1: reserveRaw.stableRateSlope1.toString(),
    stableRateSlope2: reserveRaw.stableRateSlope2.toString(),
    baseStableBorrowRate: reserveRaw.baseStableBorrowRate
      ? reserveRaw.baseStableBorrowRate.toString()
      : '',
    baseVariableBorrowRate: reserveRaw.baseVariableBorrowRate
      ? reserveRaw.baseVariableBorrowRate.toString()
      : '',
    optimalUsageRatio: reserveRaw.optimalUsageRatio ? reserveRaw.optimalUsageRatio.toString() : '',
    isPaused: reserveRaw.isPaused,
    debtCeiling: reserveRaw.debtCeiling.toString(),
    eModeCategoryId: reserveRaw.eModeCategoryId,
    borrowCap: reserveRaw.borrowCap.toString(),
    supplyCap: reserveRaw.supplyCap.toString(),
    eModeLtv: reserveRaw.eModeLtv,
    eModeLiquidationThreshold: reserveRaw.eModeLiquidationThreshold,
    eModeLiquidationBonus: reserveRaw.eModeLiquidationBonus,
    eModePriceSource: reserveRaw.eModePriceSource.toString(),
    eModeLabel: reserveRaw.eModeLabel.toString(),
    borrowableInIsolation: reserveRaw.borrowableInIsolation,
    accruedToTreasury: reserveRaw.accruedToTreasury.toString(),
    unbacked: reserveRaw.unbacked.toString(),
    isolationModeTotalDebt: reserveRaw.isolationModeTotalDebt.toString(),
    debtCeilingDecimals: Number(reserveRaw.debtCeilingDecimals.toString()),
    isSiloedBorrowing: reserveRaw.isSiloedBorrowing,
    flashLoanEnabled: reserveRaw.flashLoanEnabled,
  }));

  const baseCurrencyData: PoolBaseCurrencyHumanized = {
    // this is to get the decimals from the unit so 1e18 = string length of 19 - 1 to get the number of 0
    marketReferenceCurrencyDecimals:
      poolBaseCurrencyRaw.marketReferenceCurrencyUnit.toString().length - 1,
    marketReferenceCurrencyPriceInUsd:
      poolBaseCurrencyRaw.marketReferenceCurrencyPriceInUsd.toString(),
    networkBaseTokenPriceInUsd: poolBaseCurrencyRaw.networkBaseTokenPriceInUsd.toString(),
    networkBaseTokenPriceDecimals: poolBaseCurrencyRaw.networkBaseTokenPriceDecimals,
  };

  return {
    reservesData,
    baseCurrencyData,
  };
};

export const formatReservesAndIncentives = memoize(
  (
    reservesData: ReservesDataHumanized,
    incentivesData: ReservesIncentiveDataHumanized[],
    networkConfig: NetworkConfig,
  ) => {
    const reserves = selectReserves(reservesData);
    const baseCurrencyData = selectBaseCurrencyData(reservesData);

    return _formatReservesAndIncentives({
      reserves: reserves,
      currentTimestamp: dayjs().unix(),
      marketReferenceCurrencyDecimals: baseCurrencyData.marketReferenceCurrencyDecimals,
      marketReferencePriceInUsd: baseCurrencyData.marketReferenceCurrencyPriceInUsd,
      reserveIncentives: incentivesData,
    })
      .map(r => ({
        ...r,
        isWrappedBaseAsset:
          r.symbol.toLowerCase() === networkConfig.wrappedAsset.symbol.toLowerCase(),
      }))
      .sort(reserveSortFn);
  },
);

export const formatUserSummaryAndIncentives = memoize(
  (
    poolReserves: ReservesDataHumanized,
    userPoolReserves: UserReservesDataHumanized,
    formattedPoolReserves: FormattedReservesAndIncentives[],
    reserveIncentiveData: ReservesIncentiveDataHumanized[],
    userIncentiveData: UserReservesIncentivesDataHumanized[],
  ) => {
    const baseCurrencyData = selectBaseCurrencyData(poolReserves);
    const userReserves = selectUserReservesData(userPoolReserves);
    const userEmodeCategoryId = selectUserEModeCategory(userPoolReserves);
    return _formatUserSummaryAndIncentives({
      currentTimestamp: dayjs().unix(),
      marketReferencePriceInUsd: baseCurrencyData.marketReferenceCurrencyPriceInUsd,
      marketReferenceCurrencyDecimals: baseCurrencyData.marketReferenceCurrencyDecimals,
      userReserves,
      formattedReserves: formattedPoolReserves,
      userEmodeCategoryId: userEmodeCategoryId,
      reserveIncentives: reserveIncentiveData,
      userIncentives: userIncentiveData,
    });
  },
);

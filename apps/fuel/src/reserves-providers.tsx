import React, { ReactNode, useEffect, useState } from 'react';

import { useAccount, useChain } from '@fuels/react';

import { ReservesContext } from '@lendos/ui/providers/ReservesProvider';

import {
  EXPOSURE,
  FormattedReservesAndIncentives,
  ReserveToken,
  Reserves,
} from '@lendos/types/reserves';
import { ExtendedFormattedUser } from '@lendos/types/user';

import { baseCurrency } from '@lendos/constants/reserves';

import { assets } from './temporary';

export const ReservesProvider = ({ children }: { children: ReactNode }) => {
  const { chain } = useChain();
  const { account } = useAccount();
  const [reserves, setReserves] = useState<FormattedReservesAndIncentives<ReserveToken>[]>([]);

  useEffect(() => {
    if (!account) {
      setReserves([]);
    }

    const chainId = chain?.consensusParameters.chainId.toNumber();
    const res = assets.map(i => {
      return {
        id: `${chainId}-${i.assetId}-0x770c638885d259d957ea250cd37f50ef0a24fe74`,
        underlyingAsset: i.assetId,
        name: i.name,
        symbol: i.symbol,
        decimals: i.decimals,
        baseLTVasCollateral: '8000',
        reserveLiquidationThreshold: '8500',
        reserveLiquidationBonus: '10500',
        reserveFactor: '0.1',
        usageAsCollateralEnabled: true,
        borrowingEnabled: true,
        stableBorrowRateEnabled: true,
        isActive: true,
        isFrozen: false,
        liquidityIndex: '1000001332923854861929553528',
        variableBorrowIndex: '1000037344832710586430067779',
        liquidityRate: '16967627589187651811540',
        variableBorrowRate: '915372894108475386062079',
        stableBorrowRate: '50114421611763559423257760',
        lastUpdateTimestamp: 1734365496,
        aTokenAddress: '0xa6Dd9FaA1c21976ecA3723282F7DC76a28A19b98',
        stableDebtTokenAddress: '0x01a702f1D2fE4839D1B418Dd56a50ae0862657ee',
        variableDebtTokenAddress: '0x741774BC270d211B1f646c8A28dB421563C23E40',
        interestRateStrategyAddress: '0xFd236008865217e67a3bf178925C571551Dbe857',
        availableLiquidity: '0',
        totalPrincipalStableDebt: '0',
        averageStableRate: '0',
        stableDebtLastUpdateTimestamp: 0,
        totalScaledVariableDebt: '2064.046083',
        priceInMarketReferenceCurrency: '99988565',
        priceOracle: '0xf97E80c10d4c55637DB99C65E3446A4AE2Fd5874',
        variableRateSlope1: '40000000000000000000000000',
        variableRateSlope2: '600000000000000000000000000',
        stableRateSlope1: '5000000000000000000000000',
        stableRateSlope2: '600000000000000000000000000',
        baseStableBorrowRate: '50000000000000000000000000',
        baseVariableBorrowRate: '0',
        optimalUsageRatio: '900000000000000000000000000',
        isPaused: false,
        debtCeiling: '0',
        eModeCategoryId: 1,
        borrowCap: '0',
        supplyCap: '2000000000',
        eModeLtv: 9700,
        eModeLiquidationThreshold: 9750,
        eModeLiquidationBonus: 10100,
        eModePriceSource: '0x0000000000000000000000000000000000000000',
        eModeLabel: 'Stablecoins',
        borrowableInIsolation: true,
        accruedToTreasury: '14840',
        unbacked: '0',
        isolationModeTotalDebt: '0',
        debtCeilingDecimals: 2,
        isSiloedBorrowing: false,
        flashLoanEnabled: true,
        type: 'asset',
        totalDebt: '0',
        totalStableDebt: '0',
        totalVariableDebt: '0',
        totalLiquidity: '0',
        borrowUsageRatio: '0',
        supplyUsageRatio: '0',
        formattedReserveLiquidationBonus: '0.05',
        formattedEModeLiquidationBonus: '0.01',
        formattedEModeLiquidationThreshold: '0.975',
        formattedEModeLtv: '0.97',
        supplyAPY: '0',
        variableBorrowAPY: '0',
        stableBorrowAPY: '0',
        formattedAvailableLiquidity: '0',
        unborrowedLiquidity: '0',
        formattedBaseLTVasCollateral: '0.8',
        supplyAPR: '0',
        variableBorrowAPR: '0',
        stableBorrowAPR: '0',
        formattedReserveLiquidationThreshold: '0.85',
        debtCeilingUSD: '0',
        isolationModeTotalDebtUSD: '0',
        availableDebtCeilingUSD: '0',
        isIsolated: false,
        totalLiquidityUSD: '0',
        availableLiquidityUSD: '0',
        totalDebtUSD: '0',
        totalVariableDebtUSD: '0',
        totalStableDebtUSD: '0',
        formattedPriceInMarketReferenceCurrency: '0',
        priceInUSD: '0.99988565',
        borrowCapUSD: '0',
        supplyCapUSD: '0',
        unbackedUSD: '0',
        aIncentivesData: [],
        vIncentivesData: [],
        sIncentivesData: [],
        iconSymbol: i.symbol,
        isWrappedBaseAsset: false,
      };
    }) as FormattedReservesAndIncentives<ReserveToken>[];

    setReserves(res);
  }, [chain, account]);

  return (
    <ReservesContext.Provider
      value={{
        loading: false,
        reserves,
        lpReserves: [
          {
            id: `${chain?.consensusParameters.chainId.toNumber()}-0x123123-0x770c638885d259d957ea250cd37f50ef0a24fe74`,
            underlyingAsset: '0x123123',
            name: 'Sway Swap LP Token',
            symbol: 'SSLP',
            decimals: 18,
            baseLTVasCollateral: '8000',
            reserveLiquidationThreshold: '8500',
            reserveLiquidationBonus: '10500',
            reserveFactor: '0.1',
            usageAsCollateralEnabled: true,
            borrowingEnabled: true,
            stableBorrowRateEnabled: true,
            isActive: true,
            isFrozen: false,
            liquidityIndex: '1000000000000000000000000000',
            variableBorrowIndex: '1000000000000000000000000000',
            liquidityRate: '0',
            variableBorrowRate: '0',
            stableBorrowRate: '50000000000000000000000000',
            lastUpdateTimestamp: 1732796892,
            aTokenAddress: '0x32C106444612c5C9b037d4eaEa2263d4F224103d',
            stableDebtTokenAddress: '0xfaCA7F1aa48aE0b1Fb8b19B083e68Ea06f90DC08',
            variableDebtTokenAddress: '0xa677A6B01958dfd83105FDE9a2e188a337E87261',
            interestRateStrategyAddress: '0x14F1E430E09a55915C2becb977e758297d44e199',
            availableLiquidity: '155562491',
            totalPrincipalStableDebt: '0',
            averageStableRate: '0',
            stableDebtLastUpdateTimestamp: 0,
            totalScaledVariableDebt: '0',
            priceInMarketReferenceCurrency: '212133579034039338579',
            priceOracle: '0x9c6d1644125D11Bf11CF1Ce5A3CeBB1Ba910C080',
            variableRateSlope1: '40000000000000000000000000',
            variableRateSlope2: '600000000000000000000000000',
            stableRateSlope1: '5000000000000000000000000',
            stableRateSlope2: '600000000000000000000000000',
            baseStableBorrowRate: '50000000000000000000000000',
            baseVariableBorrowRate: '0',
            optimalUsageRatio: '900000000000000000000000000',
            isPaused: false,
            debtCeiling: '0',
            eModeCategoryId: 0,
            borrowCap: '0',
            supplyCap: '2000000000',
            eModeLtv: 0,
            eModeLiquidationThreshold: 0,
            eModeLiquidationBonus: 0,
            eModePriceSource: '0x0000000000000000000000000000000000000000',
            eModeLabel: '',
            borrowableInIsolation: false,
            accruedToTreasury: '0',
            unbacked: '0',
            isolationModeTotalDebt: '0',
            debtCeilingDecimals: 2,
            isSiloedBorrowing: false,
            flashLoanEnabled: true,
            token0: {
              address: '0x324d0c35a4299ef88138a656d5272c5a3a9ccde2630ae055dacaf9d13443d53b',
              symbol: 'FUEL',
            },
            token1: {
              address: '0xc26c91055de37528492e7e97d91c6f4abe34aae26f2c4d25cff6bfe45b5dc9a9',
              symbol: 'USDC',
            },
            dex: {
              name: 'SwaySwap',
              APY: 0,
              totalSupply: '141718340847',
              reserve0: '200420000000',
              reserve1: '100210000000',
            },
            type: Reserves.LP,
            exposure: EXPOSURE.SINGLE,
            totalDebt: '0',
            totalStableDebt: '0',
            totalVariableDebt: '0',
            totalLiquidity: '0',
            borrowUsageRatio: '0',
            supplyUsageRatio: '0',
            formattedReserveLiquidationBonus: '0.05',
            formattedEModeLiquidationBonus: '-1',
            formattedEModeLiquidationThreshold: '0',
            formattedEModeLtv: '0',
            supplyAPY: '0',
            variableBorrowAPY: '0',
            stableBorrowAPY: '0',
            formattedAvailableLiquidity: '0',
            unborrowedLiquidity: '0',
            formattedBaseLTVasCollateral: '0.8',
            supplyAPR: '0',
            variableBorrowAPR: '0',
            stableBorrowAPR: '0',
            formattedReserveLiquidationThreshold: '0.85',
            debtCeilingUSD: '0',
            isolationModeTotalDebtUSD: '0',
            availableDebtCeilingUSD: '0',
            isIsolated: false,
            totalLiquidityUSD: '0',
            availableLiquidityUSD: '0',
            totalDebtUSD: '0',
            totalVariableDebtUSD: '0',
            totalStableDebtUSD: '0',
            formattedPriceInMarketReferenceCurrency: '0',
            priceInUSD: '0',
            borrowCapUSD: '0',
            supplyCapUSD: '0',
            unbackedUSD: '0',
            aIncentivesData: [],
            vIncentivesData: [],
            sIncentivesData: [],
            iconSymbol: 'SLP',
            isWrappedBaseAsset: false,
          },
        ],
        accountLpReserves: [],
        eModes: {},
        accountSummary: {
          userReservesData: [],
          totalLiquidityMarketReferenceCurrency: '0',
          totalLiquidityUSD: '0',
          totalCollateralMarketReferenceCurrency: '0',
          totalCollateralUSD: '0',
          totalBorrowsMarketReferenceCurrency: '0',
          totalBorrowsUSD: '0',
          netWorthUSD: '0',
          availableBorrowsMarketReferenceCurrency: '0',
          availableBorrowsUSD: '0',
          currentLoanToValue: '0',
          currentLiquidationThreshold: '0',
          healthFactor: '-1',
          isInIsolationMode: false,
          calculatedUserIncentives: {},
          userEmodeCategoryId: 0,
          isInEmode: false,
          earnedAPY: 0,
          debtAPY: 0,
          netAPY: 0,
        } as ExtendedFormattedUser,
        accountReserves: [],
        baseCurrencyData: baseCurrency,
      }}
    >
      {children}
    </ReservesContext.Provider>
  );
};

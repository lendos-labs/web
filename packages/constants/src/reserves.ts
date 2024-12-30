import {
  DashboardReserve,
  EXPOSURE,
  FormattedReservesAndIncentives,
  InterestRate,
  ReserveLpToken,
  Reserves,
  ReserveToken,
} from '@lendos/types/reserves';

export const reserves = [
  {
    aIncentivesData: [],
    aTokenAddress: '0xa6Dd9FaA1c21976ecA3723282F7DC76a28A19b98',
    accruedToTreasury: '14840',
    availableDebtCeilingUSD: '0',
    availableLiquidity: '98156025236',
    availableLiquidityUSD: '98144.8010945142634',
    averageStableRate: '0',
    baseLTVasCollateral: '8000',
    baseStableBorrowRate: '50000000000000000000000000',
    baseVariableBorrowRate: '0',
    borrowCap: '0',
    borrowCapUSD: '0',
    borrowUsageRatio: '0.02059623260530346725',
    borrowableInIsolation: true,
    borrowingEnabled: true,
    debtCeiling: '0',
    debtCeilingDecimals: 2,
    debtCeilingUSD: '0',
    decimals: 6,
    eModeCategoryId: 1,
    eModeLabel: 'Stablecoins',
    eModeLiquidationBonus: 10100,
    eModeLiquidationThreshold: 9750,
    eModeLtv: 9700,
    eModePriceSource: '0x0000000000000000000000000000000000000000',
    flashLoanEnabled: true,
    formattedAvailableLiquidity: '98156.025236',
    formattedBaseLTVasCollateral: '0.8',
    formattedEModeLiquidationBonus: '0.01',
    formattedEModeLiquidationThreshold: '0.975',
    formattedEModeLtv: '0.97',
    formattedPriceInMarketReferenceCurrency: '0.99988565',
    formattedReserveLiquidationBonus: '0.05',
    formattedReserveLiquidationThreshold: '0.85',
    iconSymbol: 'USDC',
    id: '11155111-0x1552926e4df06fceefbbbdcc98747eb15cb27bbc-0x770c638885d259d957ea250cd37f50ef0a24fe74',
    interestRateStrategyAddress: '0xFd236008865217e67a3bf178925C571551Dbe857',
    isActive: true,
    isFrozen: false,
    isIsolated: false,
    isPaused: false,
    isSiloedBorrowing: false,
    isWrappedBaseAsset: false,
    isolationModeTotalDebt: '0',
    isolationModeTotalDebtUSD: '0',
    lastUpdateTimestamp: 1734365496,
    liquidityIndex: '1000001332923854861929553528',
    liquidityRate: '16967627589187651811540',
    name: 'USDC',
    optimalUsageRatio: '900000000000000000000000000',
    priceInMarketReferenceCurrency: '99988565',
    priceInUSD: '0.99988565',
    priceOracle: '0xf97E80c10d4c55637DB99C65E3446A4AE2Fd5874',
    reserveFactor: '0.1',
    reserveLiquidationBonus: '10500',
    reserveLiquidationThreshold: '8500',
    sIncentivesData: [],
    stableBorrowAPR: '0.05011442161176355942',
    stableBorrowAPY: '0.05139139134945014351',
    stableBorrowRate: '50114421611763559423257760',
    stableBorrowRateEnabled: true,
    stableDebtLastUpdateTimestamp: 0,
    stableDebtTokenAddress: '0x01a702f1D2fE4839D1B418Dd56a50ae0862657ee',
    stableRateSlope1: '5000000000000000000000000',
    stableRateSlope2: '600000000000000000000000000',
    supplyAPR: '0.00001696762758918765',
    supplyAPY: '0.00001696777154019024',
    supplyCap: '2000000000',
    supplyCapUSD: '1999771300',
    supplyUsageRatio: '0.02059623260530346725',
    symbol: 'USDC',
    totalDebt: '2064.15821',
    totalDebtUSD: '2063.9221735086865',
    totalLiquidity: '100220.183446',
    totalLiquidityUSD: '100208.7232680229499',
    totalPrincipalStableDebt: '0',
    totalScaledVariableDebt: '2064.046083',
    totalStableDebt: '0',
    totalStableDebtUSD: '0',
    totalVariableDebt: '2064.15821',
    totalVariableDebtUSD: '2063.9221735086865',
    type: Reserves.ASSET,
    unbacked: '0',
    unbackedUSD: '0',
    unborrowedLiquidity: '98156.025236',
    underlyingAsset: '0x1552926e4df06fceefbbbdcc98747eb15cb27bbc',
    usageAsCollateralEnabled: true,
    vIncentivesData: [],
    variableBorrowAPR: '0.00091537289410847539',
    variableBorrowAPY: '0.00091579197572504586',
    variableBorrowIndex: '1000037344832710586430067779',
    variableBorrowRate: '915372894108475386062079',
    variableDebtTokenAddress: '0x741774BC270d211B1f646c8A28dB421563C23E40',
    variableRateSlope1: '40000000000000000000000000',
    variableRateSlope2: '60000',
  },
] as FormattedReservesAndIncentives<ReserveToken>[];

export const dexReserves = [
  {
    ...reserves[0],
    
    type: Reserves.LP,
    token0: {
      symbol: 'USDC',
      address: '0x1234567890abcdef1234567890abcdef12345678',
    },
    token1: {
      symbol: 'USDT',
      address: '0xabcdef1234567890abcdef1234567890abcdef12',
    },
    dex: {
      name: 'Uniswap V2',
      APY: 12.5,
      totalSupply: '5000000000000000000000',
      reserve0: '2500000000000000000000',
      reserve1: '5000000000',
    },
    exposure: EXPOSURE.SINGLE,
  },
] as FormattedReservesAndIncentives<ReserveLpToken>[];

export const reservesDashboard = [
  {
    id: '1',
    symbol: 'FAKE',
    name: 'Fake Token',
    decimals: 18,
    underlyingAsset: '0xFakeTokenAddress1234567890',
    usageAsCollateralEnabled: true,
    reserveFactor: '0.10',
    baseLTVasCollateral: '0.50',
    averageStableRate: '0.03',
    stableDebtLastUpdateTimestamp: Date.now(),
    liquidityIndex: '1.02',
    reserveLiquidationThreshold: '0.65',
    reserveLiquidationBonus: '0.05',
    variableBorrowIndex: '1.01',
    variableBorrowRate: '0.045',
    availableLiquidity: '1000000',
    stableBorrowRate: '0.035',
    liquidityRate: '0.02',
    totalPrincipalStableDebt: '500000',
    totalScaledVariableDebt: '300000',
    lastUpdateTimestamp: Date.now(),
    eModeCategoryId: 1,
    borrowCap: '1000000',
    supplyCap: '2000000',
    debtCeiling: '3000000',
    debtCeilingDecimals: 2,
    isolationModeTotalDebt: '500000',
    eModeLtv: 0.7,
    eModeLiquidationThreshold: 0.75,
    eModeLiquidationBonus: 0.05,
    unbacked: '0',
    totalDebt: '800000',
    totalStableDebt: '500000',
    totalVariableDebt: '300000',
    totalLiquidity: '1200000',
    borrowUsageRatio: '0.67',
    supplyUsageRatio: '0.83',
    formattedReserveLiquidationBonus: '5%',
    formattedEModeLiquidationBonus: '5%',
    formattedEModeLiquidationThreshold: '75%',
    formattedEModeLtv: '70%',
    supplyAPY: '2%',
    variableBorrowAPY: '4.5%',
    stableBorrowAPY: '3.5%',
    formattedAvailableLiquidity: '1,000,000',
    unborrowedLiquidity: '200,000',
    formattedBaseLTVasCollateral: '50%',
    supplyAPR: '2%',
    variableBorrowAPR: '4.5%',
    stableBorrowAPR: '3.5%',
    formattedReserveLiquidationThreshold: '65%',
    debtCeilingUSD: '3,000,000',
    isolationModeTotalDebtUSD: '500,000',
    availableDebtCeilingUSD: '2,500,000',
    isIsolated: true,
    totalLiquidityUSD: '1,200,000',
    availableLiquidityUSD: '1,000,000',
    totalDebtUSD: '800,000',
    totalVariableDebtUSD: '300,000',
    totalStableDebtUSD: '500,000',
    formattedPriceInMarketReferenceCurrency: '1.0',
    priceInUSD: '1.0',
    borrowCapUSD: '1,000,000',
    supplyCapUSD: '2,000,000',
    unbackedUSD: '0',
    aIncentivesData: [
      { incentiveAPR: '0.02', rewardTokenAddress: '0xReward123', rewardTokenSymbol: 'REWARD' },
    ],
    vIncentivesData: [
      { incentiveAPR: '0.01', rewardTokenAddress: '0xReward456', rewardTokenSymbol: 'REWARD2' },
    ],
    sIncentivesData: [
      { incentiveAPR: '0.015', rewardTokenAddress: '0xReward789', rewardTokenSymbol: 'REWARD3' },
    ],
    iconSymbol: 'FAKE',
    isWrappedBaseAsset: false,
    rewardAPY: 0.02,
    borrowRateMode: InterestRate.Variable,
    reserve: reserves[0],
    stableBorrowRateEnabled: true,
    isFreezed: false,
    availableBorrows: '700000',
    availableBorrowsInUSD: '700,000',
    borrowableInIsolation: true,
    totalBorrows: '800000',
    borrowingEnabled: true,
    isActive: true,
    walletBalance: '500',
    walletBalanceUSD: '500',
    availableToDeposit: '200',
    availableToDepositUSD: '200',
    detailsAddress: '0xFakeTokenAddress1234567890',
    usageAsCollateralEnabledOnUser: true,
  },
] as FormattedReservesAndIncentives<DashboardReserve>[];

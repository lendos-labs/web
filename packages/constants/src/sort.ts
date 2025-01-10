export const reserveSortFn = (
  a: { totalLiquidityUSD: string },
  b: { totalLiquidityUSD: string },
) => {
  const numA = parseFloat(a.totalLiquidityUSD);
  const numB = parseFloat(b.totalLiquidityUSD);

  return numB > numA ? 1 : -1;
};

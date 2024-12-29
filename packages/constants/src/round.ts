import { BigNumberValue, USD_DECIMALS, valueToBigNumber } from '@aave/math-utils';

export const roundToTokenDecimals = (inputValue: string, tokenDecimals: number) => {
  const [whole, decimals] = inputValue.split('.');

  // If there are no decimal places or the number of decimal places is within the limit
  if (!decimals || decimals.length <= tokenDecimals) {
    return inputValue;
  }

  // Truncate the decimals to the specified number of token decimals
  const adjustedDecimals = decimals.slice(0, tokenDecimals);

  // Combine the whole and adjusted decimal parts
  return whole ? whole + '.' + adjustedDecimals : '.' + adjustedDecimals;
};

export const amountToUsd = (
  amount: BigNumberValue,
  formattedPriceInMarketReferenceCurrency: string,
  marketReferencePriceInUsd: string,
) => {
  return valueToBigNumber(amount)
    .multipliedBy(formattedPriceInMarketReferenceCurrency)
    .multipliedBy(marketReferencePriceInUsd)
    .shiftedBy(-USD_DECIMALS);
};

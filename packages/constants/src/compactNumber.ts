import { normalizeBN, valueToBigNumber } from '@aave/math-utils';

const POSTFIXES = ['', 'K', 'M', 'B', 'T', 'P', 'E', 'Z', 'Y'];

export const compactNumber = ({
  value,
  visibleDecimals = 2,
  roundDown,
  compactThreshold,
}: {
  value: string | number;
  visibleDecimals?: number;
  roundDown?: boolean;
  compactThreshold?: number;
}) => {
  const bnValue = valueToBigNumber(value);

  let integerPlaces = bnValue.toFixed(0).length;
  if (compactThreshold && Number(value) <= compactThreshold) {
    integerPlaces = 0;
  }
  const significantDigitsGroup = Math.min(
    Math.floor(integerPlaces ? (integerPlaces - 1) / 3 : 0),
    POSTFIXES.length - 1,
  );
  const postfix = POSTFIXES[significantDigitsGroup];
  let formattedValue = normalizeBN(bnValue, 3 * significantDigitsGroup).toNumber();
  if (roundDown) {
    // Truncates decimals after the visible decimal point, i.e. 10.237 with 2 decimals becomes 10.23
    formattedValue =
      Math.trunc(Number(formattedValue) * 10 ** visibleDecimals) / 10 ** visibleDecimals;
  }
  const prefix = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: visibleDecimals,
    minimumFractionDigits: visibleDecimals,
  }).format(formattedValue);

  return { prefix, postfix };
};

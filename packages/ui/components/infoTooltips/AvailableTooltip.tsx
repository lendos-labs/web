import { CapType } from '@lendos/types/cap';

import { TextWithTooltip, TextWithTooltipProps } from '../TextWithTooltip';

interface AvailableTooltipProps extends TextWithTooltipProps {
  capType: CapType;
}

export const AvailableTooltip = ({ capType, ...rest }: AvailableTooltipProps) => {
  const description =
    capType === CapType.supplyCap
      ? 'This is the total amount that you are able to supply to in this reserve. You are able to supply your wallet balance up until the supply cap is reached.'
      : 'This is the total amount available for you to borrow. You can borrow based on your collateral and until the borrow cap is reached.';

  return <TextWithTooltip {...rest}>{description}</TextWithTooltip>;
};

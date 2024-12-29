import { TextWithTooltip, TextWithTooltipProps } from '../../components/TextWithTooltip';

export const LiquidationPenaltyTooltip = ({ ...rest }: TextWithTooltipProps) => {
  return (
    <TextWithTooltip {...rest}>
      When a liquidation occurs, liquidators repay up to 50% of the outstanding borrowed amount on
      behalf of the borrower. In return, they can buy the collateral at a discount and keep the
      difference (liquidation penalty) as a bonus.
    </TextWithTooltip>
  );
};

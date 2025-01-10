import { TextWithTooltip, TextWithTooltipProps } from '../../components/TextWithTooltip';

export const ApprovalTooltip = ({ ...rest }: TextWithTooltipProps) => {
  return (
    <TextWithTooltip {...rest}>
      To continue, you need to grant Aave smart contracts permission to move your funds from your
      wallet. Depending on the asset and wallet you use, it is done by signing the permission
      message (gas free), or by submitting an approval transaction (requires gas).
    </TextWithTooltip>
  );
};

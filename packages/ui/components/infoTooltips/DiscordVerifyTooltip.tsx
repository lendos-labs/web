import { TextWithTooltip, TextWithTooltipProps } from '../TextWithTooltip';

export const DiscordVerifyTooltip = ({ ...rest }: TextWithTooltipProps) => {
  return (
    <TextWithTooltip {...rest}>
      Firstly - connect to Discord, then get verified in the verification channel. And then back to
      this page and press the &quot;verified&quot; button. You will receive your points within 24
      hours
    </TextWithTooltip>
  );
};

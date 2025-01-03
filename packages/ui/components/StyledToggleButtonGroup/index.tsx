import { ToggleButtonGroup, ToggleButtonGroupProps, styled } from '@mui/material';

const CustomToggleGroup = styled(ToggleButtonGroup)<ToggleButtonGroupProps>({
  gap: '8px',
  height: '36px',
}) as typeof ToggleButtonGroup;

const CustomToggleTabGroup = styled(ToggleButtonGroup)<ToggleButtonGroupProps>(
  ({ theme, size }) => ({
    padding: '4px 12px',
    height: '44px',
    backgroundColor: theme.palette.background.white,
    ...(size === 'small' && {
      height: '36px',
    }),
  }),
) as typeof ToggleButtonGroup;

const CustomTxModalToggleGroup = styled(ToggleButtonGroup)<ToggleButtonGroupProps>({
  width: '100%',
  gap: '14px',
}) as typeof ToggleButtonGroup;

export function StyledTxModalToggleGroup(props: ToggleButtonGroupProps) {
  return <CustomTxModalToggleGroup {...props} />;
}

export function StyledToggleTabGroup(props: ToggleButtonGroupProps) {
  return <CustomToggleTabGroup {...props} />;
}

export default function StyledToggleGroup(props: ToggleButtonGroupProps) {
  return <CustomToggleGroup {...props} />;
}

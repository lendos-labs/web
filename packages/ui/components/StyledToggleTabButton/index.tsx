import { styled, ToggleButton, ToggleButtonProps } from '@mui/material';

const CustomToggleButton = styled(ToggleButton)<ToggleButtonProps>(({ theme }) => ({
  border: '1px solid transparent',
  flex: 1,
  backgroundColor: theme.palette.background.surface2,
  color: theme.palette.text.dark,
  borderRadius: '4px',
  boxShadow: theme.palette.shadow.card,
  ...theme.typography.buttonS,

  '&.MuiToggleButtonGroup-grouped:not(:first-of-type)': {
    marginLeft: 0,
  },

  '&.Mui-selected.MuiToggleButtonGroup-grouped:not(:first-of-type),&.Mui-selected:hover,.MuiToggleButtonGroup-grouped:not(:first-of-type)':
    {
      borderColor: theme.palette.primary.main,
    },

  '&.Mui-selected, &.Mui-selected:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: '#FFFFFF',
  },

  '&.Mui-selected, &.Mui-disabled': {
    zIndex: 100,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',

    '.MuiTypography-subheader1': {
      background: theme.palette.gradients.default,
      backgroundClip: 'text',
      textFillColor: 'transparent',
    },
    '.MuiTypography-secondary14': {
      background: theme.palette.gradients.default,
      backgroundClip: 'text',
      textFillColor: 'transparent',
    },
  },
})) as typeof ToggleButton;

const CustomToggleTabButton = styled(ToggleButton)<ToggleButtonProps>(({ theme }) => ({
  flex: 1,
  backgroundColor: 'transparent',
  color: theme.palette.text.dark,
  borderRadius: '4px !important',
  border: 'none',
  ...theme.typography.buttonS,

  '&.MuiToggleButtonGroup-grouped:not(:first-of-type)': {
    marginLeft: 0,
  },

  '&.Mui-selected, &.Mui-selected:hover': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.primary.light
        : theme.palette.buttons.white.default,
    color: theme.palette.mode === 'dark' ? theme.palette.text.white : theme.palette.text.dark,
    boxShadow: theme.palette.shadow.gray,
  },

  '&.Mui-selected, &.Mui-disabled': {
    zIndex: 100,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',

    '.MuiTypography-subheader1': {
      background: theme.palette.gradients.default,
      backgroundClip: 'text',
      textFillColor: 'transparent',
    },
    '.MuiTypography-secondary14': {
      background: theme.palette.gradients.default,
      backgroundClip: 'text',
      textFillColor: 'transparent',
    },
  },
})) as typeof ToggleButton;

const CustomTxModalToggleButton = styled(ToggleButton)<
  ToggleButtonProps & {
    href?: string;
  }
>(({ theme }) => ({
  boxShadow: theme.palette.shadow.gray,
  color: theme.palette.text.dark,
  borderRadius: '4px !important',
  height: '26px',
  width: '100%',
  backgroundColor: theme.palette.buttons.white.default,
  m: 0,
  ...theme.typography.buttonS,

  '&.MuiToggleButtonGroup-grouped:not(:first-of-type)': {
    marginLeft: 0,
  },

  '&.Mui-selected.MuiToggleButtonGroup-grouped:not(:first-of-type),&.Mui-selected:hover,.MuiToggleButtonGroup-grouped:not(:first-of-type)':
    {
      borderColor: theme.palette.primary.main,
    },

  '&.Mui-selected, &.Mui-selected:hover': {
    border: 'none',
    backgroundColor: theme.palette.buttons.white.hover,
    color: theme.palette.text.dark,
  },

  '&.Mui-selected, &.Mui-disabled': {
    zIndex: 100,
    display: 'flex',
    justifyContent: 'center',
  },
})) as typeof ToggleButton;

export function StyledTxModalToggleButton(props: ToggleButtonProps) {
  return <CustomTxModalToggleButton {...props} />;
}

export function StyledToggleTabButton(
  props: ToggleButtonProps & {
    href?: string;
  },
) {
  return <CustomToggleTabButton {...props} />;
}

export default function StyledToggleButton(props: ToggleButtonProps) {
  return <CustomToggleButton {...props} />;
}

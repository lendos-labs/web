import { Typography } from '@mui/material';
import StyledToggleGroup from '../../components/StyledToggleButtonGroup';
import StyledToggleButton from '../../components/StyledToggleTabButton';
import { Dispatch, SetStateAction } from 'react';

export enum Mode {
  'overview',
  'actions',
}

export const OverviewTab = ({
  mode,
  setMode,
}: {
  mode: Mode;
  setMode: Dispatch<SetStateAction<Mode>>;
}) => {
  return (
    <StyledToggleGroup
      color='primary'
      value={mode}
      exclusive
      onChange={(_, value) => setMode(value as Mode)}
      sx={{ width: { xs: '100%', xsm: '359px' }, height: '44px' }}
    >
      <StyledToggleButton value='overview' disabled={mode === Mode.overview}>
        <Typography variant='subheader1'>Overview</Typography>
      </StyledToggleButton>
      <StyledToggleButton value='actions' disabled={mode === Mode.actions}>
        <Typography variant='subheader1'>Your info</Typography>
      </StyledToggleButton>
    </StyledToggleGroup>
  );
};

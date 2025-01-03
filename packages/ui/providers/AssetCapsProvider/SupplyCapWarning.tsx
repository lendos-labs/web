import { AlertProps } from '@mui/material';

import { Warning } from '../../components/Warning';
import { AssetCapData } from './types';

type SupplyCapWarningProps = AlertProps & {
  supplyCap: AssetCapData;
  icon?: boolean;
};

export const SupplyCapWarning = ({ supplyCap, icon = true, ...rest }: SupplyCapWarningProps) => {
  // Don't show a warning when less than 98% utilized
  if (!supplyCap.percentUsed || supplyCap.percentUsed < 98) {
    return null;
  }

  const severity = 'warning';

  const renderText = () => {
    return supplyCap.isMaxed
      ? ' Protocol supply cap is at 100% for this asset. Further supply unavailable.'
      : `Maximum amount available to supply is limited because protocol supply cap is at ${supplyCap.percentUsed.toFixed(2)}%.`;
  };

  return (
    <Warning severity={severity} icon={icon} {...rest}>
      {renderText()}{' '}
    </Warning>
  );
};

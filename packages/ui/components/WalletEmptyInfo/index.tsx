import { SxProps, Theme } from '@mui/material';

import { NetworkConfig } from '@lendos/types/chain';

import { Warning } from '../Warning';

type WalletEmptyInfoProps = Pick<NetworkConfig, 'name'> & {
  icon?: boolean;
  sx?: SxProps<Theme>;
};

export function WalletEmptyInfo({ name, icon, sx }: WalletEmptyInfoProps) {
  return (
    <Warning severity='info' icon={icon} sx={sx}>
      Your {name} wallet is empty. Purchase or transfer assets.
    </Warning>
  );
}

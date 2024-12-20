import { Box, Link, SvgIcon, TypographyProps } from '@mui/material';
import OpenInNewOffIcon from '@mui/icons-material/OpenInNewOff';
import { CompactableTypography, CompactMode } from '../CompactableTypography';
import { DarkTooltip } from '../DarkTooltip';

export interface UserNameTextProps extends TypographyProps {
  addressCompactMode?: CompactMode;
  loading?: boolean;
  address: string;
  link?: string;
  iconSize?: number;
  funnel?: string;
}

export const UserNameText: React.FC<UserNameTextProps> = ({
  addressCompactMode = CompactMode.SM,

  loading,
  address,
  link,
  iconSize = 16,
  ...rest
}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <CompactableTypography compactMode={addressCompactMode} loading={loading} {...rest}>
        {address}
      </CompactableTypography>
      {link && (
        <DarkTooltip title='View on Etherscan'>
          <Link href={link} target='_blank' sx={{ display: 'flex' }}>
            <SvgIcon sx={{ fontSize: iconSize }}>
              <OpenInNewOffIcon />
            </SvgIcon>
          </Link>
        </DarkTooltip>
      )}
    </Box>
  );
};

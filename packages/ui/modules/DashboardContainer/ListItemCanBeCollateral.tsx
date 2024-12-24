import CheckIcon from '@mui/icons-material/Check';
import { Box, SvgIcon } from '@mui/material';

import { ListItemIsolationBadge } from './ListItemIsolationBadge';
import { NoData } from '../../components/NoData';

interface ListItemCanBeCollateralProps {
  isIsolated: boolean;
  usageAsCollateralEnabled: boolean;
}

export const ListItemCanBeCollateral = ({
  isIsolated,
  usageAsCollateralEnabled,
}: ListItemCanBeCollateralProps) => {
  const CollateralStates = () => {
    if (usageAsCollateralEnabled && !isIsolated) {
      return (
        <SvgIcon sx={{ color: 'text.primary', fontSize: '16px' }}>
          <CheckIcon />
        </SvgIcon>
      );
    } else if (usageAsCollateralEnabled && isIsolated) {
      // NOTE: handled in ListItemIsolationBadge
      return null;
    } else {
      return <NoData color='text.primary' />;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {!isIsolated ? (
        <CollateralStates />
      ) : (
        <ListItemIsolationBadge>
          <CollateralStates />
        </ListItemIsolationBadge>
      )}
    </Box>
  );
};

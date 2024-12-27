import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box } from '@mui/material';
import { TextWithTooltip, TextWithTooltipProps } from '../../components/TextWithTooltip';
import { AssetCapData } from './types';

type SupplyCapMaxedTooltipProps = TextWithTooltipProps & {
  supplyCap: AssetCapData;
};

export const SupplyCapMaxedTooltip = ({ supplyCap, ...rest }: SupplyCapMaxedTooltipProps) => {
  if (!supplyCap.isMaxed) {
    return null;
  }

  return (
    <Box sx={{ ml: 2 }}>
      <TextWithTooltip {...rest} icon={<InfoOutlinedIcon />} iconColor='warning.main' iconSize={18}>
        Protocol supply cap at 100% for this asset. Further supply unavailable.
      </TextWithTooltip>
    </Box>
  );
};

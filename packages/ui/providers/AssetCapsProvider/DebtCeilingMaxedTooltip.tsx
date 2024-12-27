import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box } from '@mui/material';
import { TextWithTooltip, TextWithTooltipProps } from '../../components/TextWithTooltip';
import { AssetCapData } from './types';

type DebtCeilingMaxedTooltipProps = TextWithTooltipProps & {
  debtCeiling: AssetCapData;
};

export const DebtCeilingMaxedTooltip = ({ debtCeiling, ...rest }: DebtCeilingMaxedTooltipProps) => {
  if (!debtCeiling.isMaxed) {
    return null;
  }

  return (
    <Box sx={{ ml: 2 }}>
      <TextWithTooltip {...rest} icon={<InfoOutlinedIcon />} iconColor='error.main' iconSize={18}>
        Protocol debt ceiling is at 100% for this asset. Futher borrowing against this asset is
        unavailable.
      </TextWithTooltip>
    </Box>
  );
};

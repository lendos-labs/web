import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box } from '@mui/material';
import { TextWithTooltip, TextWithTooltipProps } from '../../components/TextWithTooltip';
import { AssetCapData } from './types';

type BorrowCapMaxedTooltipProps = TextWithTooltipProps & {
  borrowCap: AssetCapData;
};

export const BorrowCapMaxedTooltip = ({ borrowCap, ...rest }: BorrowCapMaxedTooltipProps) => {
  if (!borrowCap.isMaxed) {
    return null;
  }

  return (
    <Box sx={{ ml: 2 }}>
      <TextWithTooltip {...rest} icon={<InfoOutlinedIcon />} iconColor='warning.main' iconSize={18}>
        Protocol borrow cap at 100% for this asset. Further borrowing unavailable.
      </TextWithTooltip>
    </Box>
  );
};

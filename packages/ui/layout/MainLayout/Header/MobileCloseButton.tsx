import CloseIcon from '@mui/icons-material/Close';
import { IconButton, SvgIcon } from '@mui/material';

interface MobileCloseButtonProps {
  setOpen: (value: boolean) => void;
}

export const MobileCloseButton = ({ setOpen }: MobileCloseButtonProps) => {
  return (
    <IconButton onClick={() => setOpen(false)} sx={{ p: 0, mr: { xs: -2, xsm: 1 } }}>
      <SvgIcon sx={{ color: '#F1F1F3', fontSize: '32px' }}>
        <CloseIcon />
      </SvgIcon>
    </IconButton>
  );
};

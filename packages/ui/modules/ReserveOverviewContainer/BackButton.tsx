import { Button, SvgIcon } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackOutlined';

import { Routes } from '@lendos/constants/routes';
import { useRouter } from 'next/navigation';

export const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      variant='text'
      size='small'
      color='primary'
      disableRipple
      sx={{
        p: 0,
        mr: 6,
      }}
      startIcon={
        <SvgIcon sx={{ fontSize: '20px' }}>
          <ArrowBackRoundedIcon />
        </SvgIcon>
      }
      onClick={() => {
        if ((history.state as { idx: number }).idx !== 0) {
          router.back();
        } else {
          router.push(Routes.markets);
        }
      }}
    >
      Back
    </Button>
  );
};
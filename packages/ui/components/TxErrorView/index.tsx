import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Box, Button, Link, SvgIcon, Typography } from '@mui/material';
import { TxErrorType, useModalContext } from '../../providers/ModalProvider';

export const TxErrorView = ({ txError }: { txError: TxErrorType }) => {
  const { close } = useModalContext();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          mb: '92px',
        }}
      >
        <Box
          sx={{
            mt: 14,
            mx: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <SvgIcon sx={{ color: 'error.main', fontSize: '32px' }}>
            <CloseOutlinedIcon />
          </SvgIcon>
        </Box>

        <Typography sx={{ mt: 6 }} variant='h3'>
          Oh no!
        </Typography>

        <Typography>
          <>
            You can report incident to our <Link href='https://discord.gg/pq2va7zyY8'>Discord</Link>{' '}
            or
            <Link href='https://github.com/aave/interface'>Github</Link>.
          </>
        </Typography>

        <Button
          variant='outlined'
          onClick={() => {
            void (async () => {
              await navigator.clipboard.writeText(txError.rawError.message.toString());
            });
          }}
          size='small'
          sx={{ mt: 6 }}
        >
          Copy error text
          <SvgIcon sx={{ ml: 0.5, fontSize: '12px' }}>
            <FileCopyOutlinedIcon />
          </SvgIcon>
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', mt: 12 }}>
        <Button onClick={close} variant='contained' size='large' sx={{ minHeight: '44px' }}>
          Close
        </Button>
      </Box>
    </>
  );
};

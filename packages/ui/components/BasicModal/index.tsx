import { Box, IconButton, Modal, Paper, SvgIcon } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

export interface BasicModalProps {
  open: boolean;
  children: React.ReactNode;
  setOpen: (value: boolean) => void;
  withCloseButton?: boolean;
  contentMaxWidth?: number;
}

export const BasicModal = ({
  open,
  setOpen,
  withCloseButton = true,
  contentMaxWidth = 420,
  children,
  ...props
}: BasicModalProps) => {
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '.MuiPaper-root': {
          outline: 'none',
        },
      }}
      onClick={e => {
        e.stopPropagation();
      }}
      {...props}
      data-cy={'Modal'}
    >
      <Paper
        sx={theme => ({
          position: 'relative',
          margin: '10px',
          overflowY: 'auto',
          width: '100%',
          maxWidth: { xs: '359px', xsm: `${contentMaxWidth}px` },
          maxHeight: 'calc(100vh - 20px)',
          p: 6,
          ...(theme.palette.mode === 'dark' && {
            background: theme => theme.palette.gradients.body,
          }),
        })}
      >
        {children}

        {withCloseButton && (
          <Box sx={{ position: 'absolute', top: '24px', right: '50px', zIndex: 5 }}>
            <IconButton
              sx={theme => ({
                borderRadius: '50%',
                p: 0,
                minWidth: 0,
                position: 'absolute',
                ...(theme.palette.mode === 'light' && { bgcolor: 'background.paper' }),
              })}
              onClick={handleClose}
              data-cy={'close-button'}
            >
              <SvgIcon sx={{ fontSize: '28px', color: 'text.dark' }}>
                <CloseIcon data-cy={'CloseModalIcon'} />
              </SvgIcon>
            </IconButton>
          </Box>
        )}
      </Paper>
    </Modal>
  );
};

import { ReactNode } from 'react';

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Box, Typography } from '@mui/material';

interface ListHeaderTitleProps {
  sortName?: string;
  sortDesc?: boolean;
  sortKey?: string;
  source?: string;
  color?: string;
  styleSort?: 'default' | 'bios';
  setSortName?: (value: string) => void;
  setSortDesc?: (value: boolean) => void;
  onClick?: () => void;
  children: ReactNode;
}

export const ListHeaderTitle = ({
  sortName,
  sortDesc,
  sortKey,
  color,
  onClick,
  children,
  styleSort = 'default',
}: ListHeaderTitleProps) => {
  return (
    <Typography
      variant='h3'
      color={color ?? 'text.primary'}
      noWrap
      sx={{
        cursor: !!onClick || !!sortKey ? 'pointer' : 'default',
        display: 'inline-flex',
        alignItems: 'center',
      }}
    >
      {!!sortKey && styleSort === 'bios' && (
        <>
          C:{' '}
          <KeyboardBackspaceIcon
            sx={{
              color: 'text.white',
              transform: `rotate(${sortName === sortKey && sortDesc ? 90 : 270}deg)`,
              fontSize: 20,
            }}
          />
        </>
      )}

      {children}

      {!!sortKey && styleSort === 'default' && (
        <Box sx={{ display: 'inline-flex', flexDirection: 'column', ml: 1 }}>
          <Box
            component='span'
            sx={theme => ({
              width: 0,
              height: 0,
              borderStyle: 'solid',
              borderWidth: '0 4px 4px 4px',
              borderColor: `transparent transparent ${
                sortName === sortKey && sortDesc ? theme.palette.divider : theme.palette.text.dark
              } transparent`,
              mb: 0.5,
            })}
          />
          <Box
            component='span'
            sx={theme => ({
              width: 0,
              height: 0,
              borderStyle: 'solid',
              borderWidth: '4px 4px 0 4px',
              borderColor: `${
                sortName === sortKey && !sortDesc ? theme.palette.divider : theme.palette.text.dark
              } transparent transparent transparent`,
            })}
          />
        </Box>
      )}
    </Typography>
  );
};

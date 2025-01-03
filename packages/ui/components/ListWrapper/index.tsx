'use client';

import { ReactNode, useState } from 'react';

import { Box, BoxProps, Paper, Typography } from '@mui/material';
import { getCookie } from 'cookies-next';

import { toggleCookieStorageClick } from '../../helpers/toggle-cookie-storage-click.ts';

interface ListWrapperProps {
  titleComponent: ReactNode;
  localStorageName?: string;
  subTitleComponent?: ReactNode;
  subChildrenComponent?: ReactNode;
  topInfo?: ReactNode;
  children: ReactNode;
  withTopMargin?: boolean;
  noData?: boolean;
  wrapperSx?: BoxProps['sx'];
  tooltipOpen?: boolean;
}

export const ListWrapper = ({
  children,
  localStorageName,
  titleComponent,
  subTitleComponent,
  subChildrenComponent,
  topInfo,
  withTopMargin,
  noData,
  wrapperSx,
  tooltipOpen,
}: ListWrapperProps) => {
  const [isCollapse, setIsCollapse] = useState(
    localStorageName ? getCookie(localStorageName) === 'true' : false,
  );

  const collapsed = isCollapse && !noData;

  return (
    <Paper
      variant='outlined'
      sx={{
        mt: withTopMargin ? 4 : 0,
      }}
    >
      <Box
        sx={{
          px: { xs: 4, xsm: 5 },
          py: { xs: 3.5, xsm: 5 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          ...wrapperSx,
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: { xs: 'flex-start', xsm: 'center' },
            py: '3.6px',
            flexDirection: { xs: 'column', xsm: 'row' },
          }}
        >
          {titleComponent}
          {subTitleComponent}
        </Box>

        {!!localStorageName && !noData && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              minHeight: '28px',
              pl: 3,
              span: {
                width: '14px',
                height: '2px',
                bgcolor: 'text.secondary',
                position: 'relative',
                ml: 1,
                '&:after': {
                  content: "''",
                  position: 'absolute',
                  width: '14px',
                  height: '2px',
                  bgcolor: 'text.secondary',
                  transition: 'all 0.2s ease',
                  transform: collapsed ? 'rotate(90deg)' : 'rotate(0)',
                  opacity: collapsed ? 1 : 0,
                },
              },
            }}
            onClick={() => {
              void toggleCookieStorageClick(isCollapse, setIsCollapse, localStorageName);
            }}
          >
            <Typography variant='buttonM' color='text.secondary'>
              {collapsed ? <>Show</> : <>Hide</>}
            </Typography>
            <span />
          </Box>
        )}
      </Box>

      {topInfo && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            px: { xs: 4, xsm: 5 },
            pb: { xs: !noData && collapsed ? 6 : 2, xsm: !noData && collapsed ? 5 : 0 },
            overflowX: tooltipOpen ? 'hidden' : 'auto',
          }}
        >
          {topInfo}
        </Box>
      )}
      {subChildrenComponent && !collapsed && (
        <Box sx={{ marginBottom: { xs: 2, xsm: 0 } }}>{subChildrenComponent}</Box>
      )}
      <Box sx={{ display: collapsed ? 'none' : 'block' }}>{children}</Box>
    </Paper>
  );
};

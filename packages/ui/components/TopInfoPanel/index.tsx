import { ReactNode } from 'react';

import { Box, Container, ContainerProps, Paper } from '@mui/material';

import { PageTitle } from '../PageTitle';

interface TopInfoPanelProps {
  children?: ReactNode;
  titleComponent?: ReactNode;
  containerProps?: ContainerProps;
  mode?: 'paper' | 'transparent';
  banner?: ReactNode;
  pageTitle?: ReactNode;
  withMarketSwitcher?: boolean;
}

export const TopInfoPanel = ({
  pageTitle,
  titleComponent,
  withMarketSwitcher,
  children,
  containerProps = {},
  mode = 'transparent',
  banner,
}: TopInfoPanelProps) => {
  return (
    <Box
      sx={{
        pt: { xs: 10, md: 12 },
        pb: { xs: 18, md: 20, lg: '94px', xl: '92px', xxl: '96px' },
        color: '#F1F1F3',
      }}
    >
      <Container {...containerProps} sx={{ ...containerProps.sx, pb: 0 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            justifyContent: 'space-between',
            gap: '24px',
          }}
        >
          <Box
            sx={{
              width: '100%',
            }}
          >
            {!titleComponent && (
              <PageTitle pageTitle={pageTitle} withMarketSwitcher={withMarketSwitcher} />
            )}
            {titleComponent && titleComponent}
            {mode === 'transparent' ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: { xs: 3, xsm: 8 },
                  flexWrap: 'wrap',
                  width: '100%',
                }}
              >
                {children}
              </Box>
            ) : (
              <Paper
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  py: 6,
                  px: 5,
                }}
              >
                {children}
              </Paper>
            )}
          </Box>
          {banner}
        </Box>
      </Container>
    </Box>
  );
};

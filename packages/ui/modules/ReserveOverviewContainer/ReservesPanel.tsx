import type { ReactNode } from 'react';

import { Box, BoxProps, Typography, TypographyProps } from '@mui/material';

export const PanelRow: React.FC<BoxProps> = props => (
  <Box
    {...props}
    sx={{
      position: 'relative',
      display: { xs: 'block', md: 'flex' },
      margin: '0 auto',
      ...props.sx,
    }}
  />
);
export const PanelTitle: React.FC<TypographyProps> = props => (
  <Typography
    {...props}
    variant='h2'
    color={'text.dark'}
    sx={{ minWidth: { xs: '170px' }, mr: 4, mb: { xs: 6, md: 0 }, ...props.sx }}
  />
);

interface PanelItemProps {
  title: ReactNode;
  children: ReactNode;
  className?: string;
}

export const PanelItem: React.FC<PanelItemProps> = ({ title, children, className }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        '&:not(:last-child)': {
          mr: 8,
        },
      }}
      className={className}
    >
      <Typography color='text.secondary' component='span'>
        {title}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          flex: 1,
          overflow: 'hidden',
          py: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

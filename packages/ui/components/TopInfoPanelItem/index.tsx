import { ReactNode } from 'react';

import { Box, Skeleton, Typography } from '@mui/material';

interface TopInfoPanelItemProps {
  icon?: ReactNode;
  title: ReactNode;
  titleIcon?: ReactNode;
  children: ReactNode;
  hideIcon?: boolean;
  withoutIconWrapper?: boolean;
  variant?: 'light' | 'dark' | undefined; // default dark
  withLine?: boolean;
  loading?: boolean;
}

export const TopInfoPanelItem = ({
  icon,
  title,
  titleIcon,
  children,
  hideIcon,
  withLine,
  loading,
  withoutIconWrapper,
}: TopInfoPanelItemProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: { xsm: 'unset' },
      }}
    >
      {withLine && (
        <Box
          sx={{
            mr: 8,
            my: 'auto',
            width: '1px',
            bgcolor: '#F2F3F729',
            height: '37px',
          }}
        />
      )}
      {!hideIcon &&
        (withoutIconWrapper ? (
          icon && icon
        ) : (
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #EBEBED1F',
              borderRadius: '12px',
              bgcolor: '#383D51',
              boxShadow: '0px 2px 1px rgba(0, 0, 0, 0.05), 0px 0px 1px rgba(0, 0, 0, 0.25)',
              width: 42,
              height: 42,
              mr: 3,
            }}
          >
            {icon && icon}
          </Box>
        ))}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
          <Typography sx={{ color: 'text.dark' }} variant='h3' component='h3'>
            {title}
          </Typography>

          {titleIcon && titleIcon}
        </Box>
        {loading ? (
          <Skeleton
            width={60}
            sx={theme => ({
              height: 24,
              [theme.breakpoints.up('sm')]: {
                height: 28,
              },
            })}
          />
        ) : (
          children
        )}
      </Box>
    </Box>
  );
};

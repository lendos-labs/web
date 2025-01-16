import { ReactNode } from 'react';

import { Box, Typography } from '@mui/material';

import { ListWrapper } from '../ListWrapper';
import { ListHeader } from './ListHeader';
import { ListItemLoader } from './ListItemLoader';
import { MobileListItemLoader } from './MobileListItemLoader';

interface ListLoaderProps {
  title?: ReactNode;
  withTopMargin?: boolean;
  head: ReactNode[];
}

export const ListLoader = ({ title, withTopMargin, head }: ListLoaderProps) => {
  return (
    <ListWrapper
      titleComponent={
        title && (
          <Typography component='div' variant='h3' sx={{ mr: 4 }}>
            {title}
          </Typography>
        )
      }
      withTopMargin={withTopMargin}
    >
      <Box
        sx={theme => ({
          [theme.breakpoints.down('xsm')]: {
            display: 'none',
          },
          display: 'block',
        })}
      >
        <ListHeader head={head} />
        <ListItemLoader />
        <ListItemLoader />
      </Box>

      <Box
        sx={theme => ({
          [theme.breakpoints.down('xsm')]: {
            display: 'block',
          },
          display: 'none',
        })}
      >
        <MobileListItemLoader />
      </Box>
    </ListWrapper>
  );
};

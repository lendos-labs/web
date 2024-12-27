'use client';

import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  IconButton,
  SvgIcon,
  Typography,
  TypographyProps,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ReactNode, useState } from 'react';
import { SearchInput } from '../SearchInput';

interface TitleWithSearchBarProps<C extends React.ElementType> {
  onSearchTermChange: (value: string) => void;
  searchPlaceholder: string;
  titleProps?: TypographyProps<C, { component?: C }>;
  title: ReactNode;
}

export const TitleWithSearchBar = <T extends React.ElementType>({
  onSearchTermChange,
  searchPlaceholder,
  titleProps,
  title,
}: TitleWithSearchBarProps<T>) => {
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);

  const { breakpoints } = useTheme();
  const sm = useMediaQuery(breakpoints.down('sm'));

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {(!sm || !showSearchBar) && (
        <Typography
          component='div'
          variant='h2'
          color='text.dark'
          sx={{ mr: 4, display: 'flex', alignItems: 'center', gap: 1.5 }}
          {...titleProps}
        >
          <PlayCircleIcon sx={{ color: 'primary.light' }} />
          {title}
        </Typography>
      )}
      <Box
        sx={{
          height: '40px',
          width: showSearchBar && sm ? '100%' : 'unset',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {sm && !showSearchBar && (
          <IconButton onClick={() => setShowSearchBar(true)}>
            <SvgIcon sx={{ color: 'text.dark' }}>
              <SearchIcon />
            </SvgIcon>
          </IconButton>
        )}
        {(showSearchBar || !sm) && (
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <SearchInput
              wrapperSx={{
                width: {
                  xs: '100%',
                  sm: '340px',
                },
              }}
              placeholder={searchPlaceholder}
              onSearchTermChange={onSearchTermChange}
            />
            {sm && (
              <Button
                sx={{ ml: 2 }}
                onClick={() => {
                  setShowSearchBar(false);
                  onSearchTermChange('');
                }}
              >
                <Typography variant='buttonM'>Cancel</Typography>
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

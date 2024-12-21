import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import SearchIcon from '@mui/icons-material/Search';
import { Box, BoxProps, IconButton, InputBase, useMediaQuery, useTheme } from '@mui/material';
import { useRef, useState } from 'react';

interface SearchInputProps {
  onSearchTermChange: (value: string) => void;
  wrapperSx?: BoxProps;
  placeholder: string;
  disableFocus?: boolean;
  search?: string;
}

export const SearchInput = ({
  onSearchTermChange,
  wrapperSx,
  placeholder,
  disableFocus,
  search,
}: SearchInputProps) => {
  const inputEl = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const { breakpoints } = useTheme();
  const sm = useMediaQuery(breakpoints.down('sm'));

  const handleClear = () => {
    setSearchTerm('');
    onSearchTermChange('');
    inputEl.current?.focus();
  };

  // TODO check is debounce need
  // const debounchedChangeHandler = useMemo(() => {
  //   return debounce((value: string) => {
  //     onSearchTermChange(value);
  //   }, 300);
  // }, [onSearchTermChange]);

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          position: 'absolute',
          left: 6,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          alignItems: 'center',
          zIndex: 1,
        }}
      >
        <SearchIcon fontSize='small' sx={{ color: 'text.dark' }} />
      </Box>
      <InputBase
        autoFocus={sm}
        inputRef={inputEl}
        sx={theme => ({
          width: '100%',
          height: 36,
          fontSize: { xs: 16, sm: 14 },
          pl: 9,
          pr: search?.length ?? (searchTerm.length ? 9 : 2),
          borderRadius: 1,
          background: theme.palette.buttons.white.default,
          border: '1px solid',
          borderColor: 'transparent',
          color: 'text.dark',
          boxShadow: '0px 2px 3px 2px rgba(0, 0, 0, 0.25)',
          '&:hover': {
            borderColor: theme.palette.primary.main,
          },
          '&.Mui-focused ': {
            borderColor: theme.palette.primary.main,
          },
          'input::placeholder': {
            color: '#C3C3CC',
            opacity: 1,
            ...theme.typography.subtitle,
          },
          input: {
            ...theme.typography.subtitle,
          },
          ...theme.typography.subtitle,
          ...wrapperSx,
        })}
        placeholder={placeholder}
        value={search ?? searchTerm}
        onChange={e => {
          if (search === undefined) {
            setSearchTerm(e.target.value);
            onSearchTermChange(e.target.value);
          }
          onSearchTermChange(e.target.value);
        }}
        onKeyDown={event => {
          if (disableFocus) {
            event.stopPropagation();
          }
        }}
      />
      <IconButton
        sx={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          alignItems: 'center',
          visibility: searchTerm ? 'visible' : 'hidden',
          zIndex: 1,
        }}
        onClick={() => handleClear()}
      >
        <HighlightOffRoundedIcon height={16} />
      </IconButton>
    </Box>
  );
};

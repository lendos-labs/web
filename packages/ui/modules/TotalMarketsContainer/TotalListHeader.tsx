'use client';

import { FC } from 'react';

import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Box, MenuItem, Select, Typography, useMediaQuery, useTheme } from '@mui/material';

import { MarketDataType } from '@lendos/types/market';

import { SearchInput } from '../../components/SearchInput';
import { TitleWithSearchBar } from '../../components/TitleWithSearchBar';

interface TotalListHeaderProps {
  filterNetwork: string;
  handleTotalNetworkChange: (value: string) => void;
  handleSearchQueryChange: (value: string) => void;
  marketsData: MarketDataType[];
}

interface TotalListHeaderElementProps {
  filterNetwork: string;
  handleSearchQueryChange: (value: string) => void;
  handleTotalNetworkChange: (value: string) => void;
  filterNetworks: { label: string; value: string }[];
}

export const TotalListHeaderDesktop: FC<TotalListHeaderElementProps> = ({
  filterNetwork,
  handleSearchQueryChange,
  handleTotalNetworkChange,
  filterNetworks,
}) => {
  return (
    <>
      <Typography
        variant='h3'
        sx={{ mr: 4, display: 'flex', alignItems: 'center', gap: 1.5, flexGrow: 1 }}
      >
        <PlayCircleIcon sx={{ color: 'primary.light' }} />
        Assets
      </Typography>
      <Typography variant={'buttonS'}>Filter</Typography>
      <Select
        id='network'
        value={filterNetwork}
        sx={{
          minWidth: 140,
          height: 36,
        }}
        onChange={event => handleTotalNetworkChange(event.target.value)}
      >
        <MenuItem value='all'>
          <Typography color={'text.dark'} variant='subtitle'>
            All chains
          </Typography>
        </MenuItem>
        {filterNetworks.map(({ label, value }) => (
          <MenuItem key={value} value={value}>
            <Typography variant='subtitle'>
              <> {label}</>
            </Typography>
          </MenuItem>
        ))}
      </Select>

      <SearchInput
        wrapperSx={{
          width: '280px',
        }}
        placeholder='Search asset name,symbol,or address'
        onSearchTermChange={handleSearchQueryChange}
      />
    </>
  );
};

export const TotalListHeaderMobile: React.FC<TotalListHeaderElementProps> = ({
  filterNetwork,
  handleTotalNetworkChange,
  handleSearchQueryChange,
  filterNetworks,
}) => {
  return (
    <>
      <TitleWithSearchBar
        title={<>Assets</>}
        titleProps={{ variant: 'h3' }}
        onSearchTermChange={handleSearchQueryChange}
        searchPlaceholder='Search asset'
      />

      <Box
        sx={{
          display: 'flex',
          gap: 4,
          flexWrap: 'wrap',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Typography>Filter</Typography>
          <Select
            id='network'
            value={filterNetwork}
            sx={{ minWidth: 140 }}
            onChange={event => handleTotalNetworkChange(event.target.value)}
          >
            <MenuItem value='all'>All chain</MenuItem>

            {filterNetworks.map(({ label, value }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
    </>
  );
};

export const TotalListHeader: React.FC<TotalListHeaderProps> = ({
  filterNetwork,
  handleTotalNetworkChange,
  handleSearchQueryChange,
  marketsData,
}) => {
  const { breakpoints } = useTheme();

  const md = useMediaQuery(breakpoints.up('md'));
  const filterNetworks = marketsData.map(el => ({
    label: el.marketTitle,
    value: el.market,
  }));

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: {
          xs: 'column',
          md: 'row',
        },
        alignItems: {
          xs: 'flex-start',
          md: 'center',
        },
        gap: 3,
      }}
    >
      {!md ? (
        <TotalListHeaderMobile
          filterNetwork={filterNetwork}
          handleTotalNetworkChange={handleTotalNetworkChange}
          handleSearchQueryChange={handleSearchQueryChange}
          filterNetworks={filterNetworks}
        />
      ) : (
        <TotalListHeaderDesktop
          filterNetwork={filterNetwork}
          handleTotalNetworkChange={handleTotalNetworkChange}
          handleSearchQueryChange={handleSearchQueryChange}
          filterNetworks={filterNetworks}
        />
      )}
    </Box>
  );
};

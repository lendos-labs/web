import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { SearchInput } from '../../components/SearchInput';
import { TitleWithSearchBar } from '../../components/TitleWithSearchBar';
import { FC } from 'react';

interface ProposalListHeaderProps {
  proposalFilter: string;
  proposalNetwork: string;
  handleProposalFilterChange: (value: string) => void;
  handleProposalNetworkChange: (value: string) => void;
  handleSearchQueryChange: (value: string) => void;
}

interface ProposalListHeaderElementProps {
  proposalFilter?: string;
  proposalNetwork: string;
  handleSearchQueryChange: (value: string) => void;
  handleChange?: (event: SelectChangeEvent) => void;
  handleProposalNetworkChange: (value: string) => void;
}

const proposalFilters = [
  {
    label: 'Active',
    value: 'active',
  },
  {
    label: 'Completed',
    value: 'completed',
  },
];

const proposalNetworks = [
  {
    label: 'Neon',
    value: 'neon',
  },
  {
    label: 'Hemi',
    value: 'hemi',
  },
];

export const ProposalListHeaderDesktop: React.FC<ProposalListHeaderElementProps> = ({
  proposalFilter,
  proposalNetwork,
  handleSearchQueryChange,
  handleProposalNetworkChange,
  handleChange,
}) => {
  return (
    <>
      <Typography
        variant='h3'
        sx={{ mr: 4, display: 'flex', alignItems: 'center', gap: 1.5, flexGrow: 1 }}
      >
        <PlayCircleIcon sx={{ color: 'primary.light' }} />
        Proposals
      </Typography>
      <Typography variant={'buttonS'}>Network</Typography>
      <Select
        id='network'
        value={proposalNetwork}
        sx={{
          minWidth: 140,
          height: 36,
        }}
        onChange={event => handleProposalNetworkChange(event.target.value)}
      >
        <MenuItem value='all'>
          <Typography color={'text.dark'} variant='subtitle'>
            All networks
          </Typography>
        </MenuItem>
        {proposalNetworks.map(({ label, value }) => (
          <MenuItem key={value} value={value}>
            <Typography variant='subtitle'>
              <> {label}</>
            </Typography>
          </MenuItem>
        ))}
      </Select>
      <Typography variant={'buttonS'}>Filter</Typography>
      <Select
        id='filter'
        value={proposalFilter}
        sx={{
          minWidth: 140,
          height: 36,
        }}
        onChange={handleChange}
      >
        <MenuItem value='all'>
          <Typography color={'text.dark'} variant='subtitle'>
            All proposals
          </Typography>
        </MenuItem>
        {proposalFilters.map(({ label, value }) => (
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
        placeholder='Search proposals'
        onSearchTermChange={handleSearchQueryChange}
      />
    </>
  );
};

export const ProposalListHeaderMobile: React.FC<ProposalListHeaderElementProps> = ({
  proposalFilter,
  proposalNetwork,
  handleProposalNetworkChange,
  handleChange,
  handleSearchQueryChange,
}) => {
  return (
    <>
      <TitleWithSearchBar
        title={<>Proposals</>}
        titleProps={{ variant: 'h3' }}
        onSearchTermChange={handleSearchQueryChange}
        searchPlaceholder='Search proposals'
      />

      <Box
        sx={{
          display: 'flex',
          gap: 4,
          flexWrap: 'wrap',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Typography>Network</Typography>
          <Select
            id='network'
            value={proposalNetwork}
            sx={{ minWidth: 140 }}
            onChange={event => handleProposalNetworkChange(event.target.value)}
          >
            <MenuItem value='all'>All networks</MenuItem>

            {proposalNetworks.map(({ label, value }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Typography>Filter</Typography>
          <Select id='filter' value={proposalFilter} sx={{ minWidth: 140 }} onChange={handleChange}>
            <MenuItem value='all'>All proposals</MenuItem>

            {proposalFilters.map(({ label, value }) => (
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

export const ProposalListHeader: FC<ProposalListHeaderProps> = ({
  proposalFilter,
  proposalNetwork,
  handleProposalNetworkChange,
  handleProposalFilterChange,
  handleSearchQueryChange,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    handleProposalFilterChange(event.target.value);
  };
  const { breakpoints } = useTheme();

  const md = useMediaQuery(breakpoints.up('md'));

  return (
    <Box
      sx={{
        px: 6,
        py: 4,
        pb: 10,
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
        <ProposalListHeaderMobile
          proposalFilter={proposalFilter}
          proposalNetwork={proposalNetwork}
          handleChange={handleChange}
          handleProposalNetworkChange={handleProposalNetworkChange}
          handleSearchQueryChange={handleSearchQueryChange}
        />
      ) : (
        <ProposalListHeaderDesktop
          proposalFilter={proposalFilter}
          proposalNetwork={proposalNetwork}
          handleChange={handleChange}
          handleProposalNetworkChange={handleProposalNetworkChange}
          handleSearchQueryChange={handleSearchQueryChange}
        />
      )}
    </Box>
  );
};

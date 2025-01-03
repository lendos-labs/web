import { Box, MenuItem, Select, Typography } from '@mui/material';

import { Filters } from '@lendos/types/dexLp';

import { poolTypes } from '@lendos/constants/dexLp';

import { SearchInput } from '../../components/SearchInput';
import { useReservesContext } from '../../providers/ReservesProvider';

interface DexLpContainerFiltersProps {
  filters: Record<Filters, string>;
  setSearchTerm: (term: string) => void;
  setFilter: (type: Filters, value: string) => void;
}

function DexLpContainerFilters({ filters, setSearchTerm, setFilter }: DexLpContainerFiltersProps) {
  const { reserves } = useReservesContext();

  return (
    <Box sx={{ mt: 6, display: 'flex', gap: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
      <SearchInput
        wrapperSx={{
          width: {
            xs: '100%',
            sm: '340px',
          },
        }}
        placeholder='Search by token name'
        onSearchTermChange={setSearchTerm}
        search={filters[Filters.SEARCH]}
      />
      <Box
        sx={{
          display: 'flex',

          gap: 3,
        }}
      >
        <Select
          id='token'
          sx={{
            minWidth: 140,
            height: 36,
          }}
          variant='outlined'
          defaultValue={'_all'}
          onChange={e => setFilter(Filters.TOKEN, e.target.value)}
        >
          <MenuItem value='_all'>
            <Typography color={'text.dark'} variant='subtitle'>
              All Tokens
            </Typography>
          </MenuItem>
          {reserves.map(i => (
            <MenuItem value={i.symbol} key={i.symbol}>
              <Typography variant='subtitle'>{i.symbol}</Typography>
            </MenuItem>
          ))}
        </Select>
        <Select
          variant='outlined'
          id='type'
          sx={{
            minWidth: 140,
            height: 36,
          }}
          defaultValue={'_all'}
          onChange={e => setFilter(Filters.TYPE, e.target.value)}
        >
          <MenuItem value='_all'>
            <Typography color={'text.dark'} variant='subtitle'>
              All Types
            </Typography>
          </MenuItem>

          {poolTypes.map(i => (
            <MenuItem value={i} key={i}>
              <Typography variant='subtitle' sx={{ textTransform: 'capitalize' }}>
                {i} exposure
              </Typography>
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  );
}

export default DexLpContainerFilters;

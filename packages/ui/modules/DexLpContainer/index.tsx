'use client';

import { useEffect, useMemo, useState } from 'react';
import { Paper } from '@mui/material';
import { StyledToggleTabGroup } from '../../components/StyledToggleButtonGroup';
import { Filters, PoolCategories, PoolData, UserPoolData } from '@lendos/types/dexLp';
import { filtersInitValue, poolCategories } from '@lendos/constants/dexLp';
import { useReservesContext } from '../../providers/ReservesProvider';
import { StyledToggleTabButton } from '../../components/StyledToggleTabButton';
import Typography from '@mui/material/Typography';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import DexLpContainerFilters from './DexLpContainerFilters.tsx';
import { AllPoolsTableContainer } from './AllPoolsTableContainer.tsx';
import { CollateralTableContainer } from './CollateralTableContainer.tsx';

export const DexLpContainer = () => {
  const { lpReserves, accountLpReserves } = useReservesContext();
  const [category, setCategory] = useState<PoolCategories>(PoolCategories.ALL_POOLS);
  const [filters, setFilters] =
    useState<Record<PoolCategories, Record<Filters, string>>>(filtersInitValue);

  useEffect(() => {
    setFilters(filtersInitValue);
  }, [category]);

  const lpReservesByPair = useMemo(() => {
    return Object.values(
      lpReserves.reduce((acc: Record<string, PoolData>, item) => {
        const pairKey = [item.token0.symbol, item.token1.symbol].sort().join('/');

        acc[pairKey] = acc[pairKey] ?? {
          token0: item.token0.symbol,
          token1: item.token1.symbol,
          data: [],
        };

        acc[pairKey].data.push(item);

        return acc;
      }, {}),
    );
  }, [lpReserves]);

  const userLpReservesByPair = useMemo(() => {
    return Object.values(
      accountLpReserves.reduce((acc: Record<string, UserPoolData>, item) => {
        if (Number(item.underlyingBalanceUSD)) {
          const pairKey = [item.reserve.token0.symbol, item.reserve.token1.symbol]
            .sort((a, b) => a.localeCompare(b))
            .join('/');

          acc[pairKey] = acc[pairKey] ?? {
            token0: item.reserve.token0.symbol,
            token1: item.reserve.token1.symbol,
            data: [],
            collateral: 12, // TODO: add collateral,
          };

          acc[pairKey].data.push(item);
        }
        return acc;
      }, {}),
    );
  }, [accountLpReserves]);

  return (
    <Paper variant='outlined' sx={{ p: 5 }}>
      <StyledToggleTabGroup
        size='small'
        onChange={(_, v) => {
          if (v !== null) {
            setCategory(v as PoolCategories);
          }
        }}
        value={category}
        exclusive
        sx={theme => ({
          width: '305px',
          ...(theme.palette.mode === 'light' && {
            backgroundColor: theme.palette.buttons.white.default,
          }),
        })}
      >
        {poolCategories.map(i => (
          <StyledToggleTabButton key={i.type} value={i.type}>
            {i.type}
          </StyledToggleTabButton>
        ))}
      </StyledToggleTabGroup>
      <DexLpContainerFilters
        setSearchTerm={(value: string) => {
          setFilters(state => ({
            ...state,
            [category]: {
              ...state[category],
              [Filters.TOKEN]: '',
              [Filters.SEARCH]: value,
            },
          }));
        }}
        setFilter={(type: Filters, value) => {
          setFilters(state => ({
            ...state,
            [category]: {
              ...state[category],
              [type]: value,
              [Filters.SEARCH]: type === Filters.TOKEN ? '' : state[category].search,
            },
          }));
        }}
        filters={filters[category]}
      />
      <Typography
        component='div'
        variant='h2'
        color='text.dark'
        sx={{ mt: 10, display: 'flex', alignItems: 'center', gap: 1.5, pb: '12px' }}
      >
        <PlayCircleIcon sx={{ color: 'primary.light' }} />
        {category === PoolCategories.ALL_POOLS
          ? `${category} [${lpReserves.length}]`
          : `Pools Under Collateral [${userLpReservesByPair.length}]`}
      </Typography>
      {category === PoolCategories.ALL_POOLS && (
        <AllPoolsTableContainer
          lpReserves={lpReservesByPair}
          filters={filters[PoolCategories.ALL_POOLS]}
        />
      )}
      {category === PoolCategories.UNDER_COLLATERAL && (
        <CollateralTableContainer
          userLpReserves={userLpReservesByPair}
          filters={filters[PoolCategories.UNDER_COLLATERAL]}
        />
      )}
    </Paper>
  );
};

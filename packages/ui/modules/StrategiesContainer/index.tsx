'use client';

import { useMemo, useState } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Grid2, SvgIcon } from '@mui/material';

import { StyledToggleTabGroup } from '../../components/StyledToggleButtonGroup';
import { StyledToggleTabButton } from '../../components/StyledToggleTabButton';
import { useReservesContext } from '../../providers/ReservesProvider';
import { DetailStrategy } from './DetailStrategy.tsx';
import { StarategyCard } from './StarategyCard.tsx';
import { strategiesPairs, strategiesTab } from './constants.ts';
import { Pair } from './types.ts';

function StrategiesContainer() {
  const [select, setSelect] = useState<string>(strategiesTab[0]?.label ?? '');
  const { reserves } = useReservesContext();
  const [selectedPair, setSelectedPair] = useState<Pair | undefined>(undefined);

  const pair = useMemo(() => {
    return strategiesPairs.reduce<Pair[]>((acc, i) => {
      const lend = reserves.find(r => r.symbol === i.lend);
      const borrow = reserves.find(r => r.symbol === i.borrow);

      if (!borrow || !lend) {
        return [...acc];
      }

      return [...acc, { lend, borrow, name: `${lend.symbol}/${borrow.symbol}` }];
    }, []);
  }, [reserves]);

  return (
    <Box>
      <StyledToggleTabGroup
        onChange={(_, value: string[]) => {
          if (value[0]) {
            setSelect(value[0]);
          }
        }}
        sx={{ mt: 5, mb: 10 }}
      >
        {strategiesTab.map(i => (
          <StyledToggleTabButton
            key={i.label}
            value={i.label}
            selected={select === i.label}
            sx={{ flexGrow: 1, width: '117px' }}
          >
            {i.label}
          </StyledToggleTabButton>
        ))}
      </StyledToggleTabGroup>
      {selectedPair ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '34px',
          }}
        >
          <Button
            variant='text'
            size='medium'
            onClick={() => setSelectedPair(undefined)}
            color='primary'
            sx={{ alignSelf: 'flex-start' }}
            startIcon={
              <SvgIcon fontSize='small'>
                <ArrowBackIcon />
              </SvgIcon>
            }
          >
            Back
          </Button>
          <DetailStrategy pair={selectedPair} />
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <Grid2
            container
            rowSpacing={{ xs: 2, md: '34px' }}
            columnSpacing={{ xs: 2, md: 5 }}
            columns={{ xs: 1, sm: 8, md: 12 }}
          >
            {pair.map(p => (
              <Grid2 size={{ xs: 2, sm: 4, md: 4 }} key={p.name}>
                <StarategyCard pair={p} setSelectedPair={setSelectedPair} />
              </Grid2>
            ))}
          </Grid2>
        </Box>
      )}
    </Box>
  );
}

export default StrategiesContainer;

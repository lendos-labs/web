import { Box, Paper, Skeleton, Stack } from '@mui/material';
import { useState } from 'react';
import { Vote } from '@lendos/types/governance';

import { ProposalListHeader } from './ProposalListHeader';
import { ProposalV3ListItem } from './ProposalV3ListItem';
import { NoSearchResults } from '../../components/NoSearchResults';
import { useCreateEmployee } from '../../hooks/useGovernance.ts';

export const ProposalsV3List = () => {
  const [proposalFilter, setProposalFilter] = useState<string>('all');
  const [proposalNetwork, setProposalNetwork] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const networkQuery = proposalNetwork === 'all' ? '' : `?network=${proposalNetwork}`;

  // const { data, isLoading: loadingProposals } = useVoting({ networkQuery });
  const loadingProposals = false;
  const data = [
    {
      category: 'LST',
      description: 'Voting to add USDT (Tether) into the main pool and allow it as a collateral',
      details: 'Voting to add USDT (Tether) into the main pool and allow it as a collateral',
      is_voting: false,
      link: 'https://tether.to/',
      link_text: 'Tether',
      network: 'hemi',
      proposal_id: 4,
      protocol_name: 'USDT',
      status: 'active',
      votes_count: 0,
    },
  ] as Vote[];

  const { mutate } = useCreateEmployee();

  let listItems: Vote[] = data.filter((proposal: Vote) =>
    proposal.protocol_name.includes(searchTerm),
  );

  if (proposalFilter !== 'all') {
    listItems = listItems.filter(proposal => proposal.status === proposalFilter);
  }

  return (
    <Paper>
      <ProposalListHeader
        proposalFilter={proposalFilter}
        proposalNetwork={proposalNetwork}
        handleProposalFilterChange={setProposalFilter}
        handleProposalNetworkChange={setProposalNetwork}
        handleSearchQueryChange={setSearchTerm}
      />
      {listItems.length > 0 ? (
        <Box
          sx={{
            px: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            mb: 10,
          }}
        >
          {listItems.map(proposal => (
            <ProposalV3ListItem
              key={proposal.proposal_id}
              proposal={proposal}
              handleVote={id => mutate(id)}
            />
          ))}
          {loadingProposals &&
            Array.from({ length: 5 }).map((_, i) => <ProposalListSkeleton key={i} />)}
        </Box>
      ) : (
        <>
          {!loadingProposals && listItems.length === 0 ? (
            <NoSearchResults searchTerm={searchTerm} />
          ) : (
            Array.from({ length: 4 }).map((_, i) => <ProposalListSkeleton key={i} />)
          )}
        </>
      )}
    </Paper>
  );
};

const ProposalListSkeleton = () => {
  return (
    <Box
      sx={{
        p: 6,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        borderBottom: theme => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Stack
        direction='row'
        sx={{
          width: {
            xs: '100%',
            lg: '70%',
          },
          pr: { xs: 0, lg: 8 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Stack
          direction='column'
          sx={{
            width: {
              xs: '100%',
              lg: '70%',
            },
            pr: { xs: 0, lg: 8 },
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 3, lg: 6 },
          }}
        >
          <Skeleton variant='rectangular' height={22} width={220} />
          <Skeleton variant='rectangular' height={24} width={350} />
        </Stack>
      </Stack>
      <Skeleton variant='rectangular' height={36} width={186} />
    </Box>
  );
};

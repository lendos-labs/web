import { Box, Button, Paper, Stack, Typography } from '@mui/material';

import { Vote } from '@lendos/types/governance';

export const ProposalV3ListItem = ({
  proposal,
  handleVote,
}: {
  proposal: Vote;
  handleVote: (v: number) => void;
}) => {
  return (
    <Paper
      sx={theme => ({
        p: { xs: 4, md: 6 },
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: theme.palette.shadow.card,
      })}
    >
      <Stack
        direction='column'
        gap={{ xs: 4, md: 3 }}
        sx={{
          width: {
            xs: '100%',
            lg: '35%',
          },
          pr: { xs: 0, lg: 8 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={theme => ({
            boxShadow: theme.palette.shadow.card,
            background: theme.palette.background.surface2,
            padding: '3px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            width: 'max-content',
            borderRadius: '4px',
          })}
        >
          <Box
            sx={theme => ({
              background:
                proposal.status === 'active'
                  ? theme.palette.success.main
                  : theme.palette.error.main,
              width: 16,
              height: 16,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            })}
          />
          <Typography variant='buttonS' color={'text.dark'}>
            {proposal.status === 'active' ? 'Open for voting' : 'Voting over'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <img src={`/icons/tokens/${proposal.icon}.svg`} width='24px' height='24px' alt='' />
          <Typography variant='h3' color={'text.dark'}>
            {proposal.protocol_name}
          </Typography>
        </Box>

        <Typography variant='subtitle' color={'text.dark'}>
          {proposal.description}
        </Typography>
      </Stack>

      <Box
        sx={{
          mt: { xs: 6, lg: 0 },
          display: 'grid',
          gridTemplateColumns: { sx: '1fr', md: '1fr 1fr' },
          direction: { xs: 'column', md: 'row' },
          columnGap: { xs: 6, md: 15 },
          rowGap: { xs: 6, md: 4 },
          width: {
            xs: '100%',
            lg: '513px',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'row', md: 'column' },
            alignItems: { xs: 'center', md: 'flex-start' },
            justifyContent: 'space-between',
          }}
        >
          <Typography variant='h3' mb={{ sx: 0, md: 2 }}>
            Category
          </Typography>
          <Typography
            component={'div'}
            variant='buttonS'
            color={'text.dark'}
            sx={theme => ({
              padding: '3px 12px',
              boxShadow: theme.palette.shadow.card,
              background: theme.palette.background.surface2,
              borderRadius: '4px',
              width: 'max-content',
            })}
          >
            {proposal.category}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'row', md: 'column' },
            alignItems: { xs: 'center', md: 'flex-start' },
            justifyContent: 'space-between',
          }}
        >
          <Typography variant='h3' mb={{ sx: 0, md: 2 }}>
            Network
          </Typography>
          <Typography
            component={'div'}
            variant='buttonS'
            color={'text.dark'}
            sx={theme => ({
              padding: '3px 12px',
              boxShadow: theme.palette.shadow.card,
              background: theme.palette.background.surface2,
              borderRadius: '4px',
              width: 'max-content',
              textTransform: 'capitalize',
            })}
          >
            {proposal.network}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'row', md: 'column' },
            alignItems: { xs: 'center', md: 'flex-start' },
            justifyContent: 'space-between',
            flex: 1,
          }}
        >
          <Typography variant='h3' mb={{ sx: 0, md: 2 }}>
            Link
          </Typography>
          <Typography
            component={'a'}
            variant='buttonS'
            color={'primary.light'}
            href={proposal.link}
            target={'_blank'}
            sx={{
              textDecoration: 'none',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            {proposal.link_text}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'row', md: 'column' },
            alignItems: { xs: 'center', md: 'flex-start' },
            justifyContent: 'space-between',
          }}
        >
          <Typography variant='h3' mb={{ sx: 0, md: 2 }}>
            Total Votes
          </Typography>
          <Typography
            component={'div'}
            variant='buttonS'
            color={'primary.light'}
            sx={theme => ({
              padding: '3px 12px',
              boxShadow: theme.palette.shadow.card,
              background: theme.palette.background.surface2,
              borderRadius: '4px',
              width: 'max-content',
            })}
          >
            {proposal.votes_count}
          </Typography>
        </Box>
      </Box>

      <Button
        variant='contained'
        size='large'
        sx={{
          minHeight: '36px',
          height: 36,
          width: { xs: '100%', md: 186 },
          mt: { xs: 10, lg: 0 },
        }}
        onClick={() => handleVote(proposal.proposal_id)}
        disabled={proposal.is_voting || proposal.status === 'completed'}
      >
        Vote
      </Button>
    </Paper>
  );
};

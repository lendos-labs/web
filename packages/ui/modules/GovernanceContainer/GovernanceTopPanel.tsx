import { Box, Typography, useTheme } from '@mui/material';
import { TopInfoPanel } from '../../components/TopInfoPanel';

export const GovernanceTopPanel = () => {
  const { palette } = useTheme();
  return (
    <TopInfoPanel
      titleComponent={
        <Box mb={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <img
              src={`/icons/tokens/token_${palette.mode}.svg`}
              width='32px'
              height='32px'
              alt=''
            />
            <Typography variant={'h1'} sx={{ ml: 2, mr: 3 }} color={'text.dark'}>
              Governance
            </Typography>
          </Box>

          <Typography variant='h3' sx={{ maxWidth: '616px' }} color={'text.dark'}>
            lendOS is a multichain lending and borrowing infrastructure. lendOS provides users the
            possibility to influence a product by voting. Vote for upgrades, for listing new assets,
            and for other improvements on lendOS. Be an active member of the great lendOS community
          </Typography>
        </Box>
      }
    />
  );
};

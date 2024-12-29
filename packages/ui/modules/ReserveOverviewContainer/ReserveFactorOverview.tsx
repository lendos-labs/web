import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import { ExplorerLinkBuilderProps } from '@lendos/types/chain';
import { Box, SvgIcon, Typography } from '@mui/material';
import { ReserveOverviewBox } from './ReserveOverviewBox';
import { ReserveFactorTooltip } from './ReserveFactorTooltip';
import { FormattedNumber } from '../../components/FormattedNumber';
import { Link } from '../../components/Link';

interface ReserveFactorOverviewProps {
  collectorContract: string;
  explorerLinkBuilder: (props: ExplorerLinkBuilderProps) => string;
  reserveFactor: string;
}

export const ReserveFactorOverview = ({
  collectorContract,
  explorerLinkBuilder,
  reserveFactor,
}: ReserveFactorOverviewProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
    >
      <ReserveOverviewBox
        title={
          <ReserveFactorTooltip
            text='Reserve factor'
            key='res_factor'
            variant='h3'
            collectorLink={
              collectorContract
                ? explorerLinkBuilder({
                    address: collectorContract,
                  })
                : undefined
            }
          />
        }
      >
        <FormattedNumber value={reserveFactor} percent variant='numberS' visibleDecimals={2} />
      </ReserveOverviewBox>

      <ReserveOverviewBox title={<Typography variant='h3'>Collector Contract</Typography>}>
        <Link
          href={explorerLinkBuilder({
            address: collectorContract,
          })}
          sx={{ textDecoration: 'none' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant='numberS'>View contract</Typography>
            <SvgIcon sx={{ ml: 1, fontSize: 14 }}>
              <OpenInNewOutlinedIcon />
            </SvgIcon>
          </Box>
        </Link>
      </ReserveOverviewBox>
      <Box
        sx={{
          flex: '0 32%',
          marginBottom: '2%',
          height: { md: '70px', lg: '60px' },
          maxWidth: '32%',
        }}
      />
    </Box>
  );
};

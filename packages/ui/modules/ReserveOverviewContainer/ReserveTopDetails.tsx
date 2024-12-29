import { FormattedReservesAndIncentives } from '@lendos/types/reserves';
import IosShareIcon from '@mui/icons-material/IosShare';
import { Box, IconButton, Skeleton, useMediaQuery, useTheme } from '@mui/material';
import { useStateContext } from '../../providers/StateProvider';
import { TopInfoPanelItem } from '../../components/TopInfoPanelItem';
import { FormattedNumber } from '../../components/FormattedNumber';
import { Link } from '../../components/Link';

interface ReserveTopDetailsProps {
  reserve: FormattedReservesAndIncentives;
  loading: boolean;
}

export const ReserveTopDetails = ({ reserve, loading }: ReserveTopDetailsProps) => {
  const { currentNetworkData } = useStateContext();

  const theme = useTheme();
  const downToSM = useMediaQuery(theme.breakpoints.down('sm'));

  const iconStyling = {
    display: 'inline-flex',
    alignItems: 'center',
    color: '#A5A8B6',
    '&:hover': { color: '#F1F1F3' },
    cursor: 'pointer',
  };

  return (
    <>
      <TopInfoPanelItem title='Reserve Size' loading={loading} hideIcon>
        <FormattedNumber
          value={Math.max(Number(reserve.totalLiquidityUSD), 0)}
          symbol='USD'
          variant={'numberM'}
          symbolsVariant={'numberM'}
        />
      </TopInfoPanelItem>

      <TopInfoPanelItem title='Available liquidity' loading={loading} hideIcon>
        <FormattedNumber
          value={Math.max(Number(reserve.availableLiquidityUSD), 0)}
          symbol='USD'
          variant={'numberM'}
          symbolsVariant={'numberM'}
        />
      </TopInfoPanelItem>

      <TopInfoPanelItem title='Utilization Rate' loading={loading} hideIcon>
        <FormattedNumber
          value={reserve.borrowUsageRatio}
          percent
          variant='numberM'
          symbolsVariant='numberM'
        />
      </TopInfoPanelItem>

      <TopInfoPanelItem title='Oracle price' loading={loading} hideIcon>
        <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
          <FormattedNumber
            value={reserve.priceInUSD}
            symbol='USD'
            variant={'numberM'}
            symbolsVariant={'numberM'}
          />
          {loading ? (
            <Skeleton width={16} height={16} sx={{ ml: 1, background: '#383D51' }} />
          ) : (
            <Link
              href={currentNetworkData.explorerLinkBuilder({
                address: reserve.priceOracle,
              })}
              sx={iconStyling}
            >
              <IconButton>
                <IosShareIcon
                  sx={{ fontSize: downToSM ? '16px' : '20px', color: 'text.primary' }}
                />
              </IconButton>
            </Link>
          )}
        </Box>
      </TopInfoPanelItem>
    </>
  );
};

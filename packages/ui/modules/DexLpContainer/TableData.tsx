import { TableHeadProperties } from '../../components/Table';
import { PoolData, UserPoolData } from '@lendos/types/dexLp';
import { ModalArgsType, ModalContextType } from '../../providers/ModalProvider';
import { Box, Button } from '@mui/material';
import { TokenIcon } from '../../components/TokenIcon';
import Typography from '@mui/material/Typography';
import { ReserveSubheader } from '../../components/ReserveSubheader';

export const allPoolHeader: TableHeadProperties[] = [
  {
    key: 'pool',
    title: 'Pool',
  },
  {
    key: 'dex',
    title: 'DEX',
  },
  {
    key: 'actions',
    title: '',
    style: { width: '65%' },
  },
];

export const allPoolCollapsibleHeader: TableHeadProperties[] = [
  {
    key: 'pool',
    title: 'Pool',
  },
  {
    key: 'dex',
    title: 'DEX',
    sortKey: 'dex',
  },
  {
    key: 'apy',
    title: 'APY',
    sortKey: 'dexAPY',
  },
  {
    key: 'tvl',
    title: 'Pool TVL',
    sortKey: 'totalLiquidityUSD',
  },
  {
    key: 'type',
    title: 'Type',
    sortKey: 'exposure',
  },
  {
    key: 'action',
    title: '',
  },
];

export const collateralHeader: TableHeadProperties[] = [
  {
    key: 'pool',
    title: 'Pool',
  },
  {
    key: 'dex',
    title: 'DEX',
  },
  {
    key: 'collateral',
    title: 'Value',
  },
  {
    key: 'actions',
    title: '',
    style: { width: '55%' },
  },
];

export const collateralCollapsibleHeader: TableHeadProperties[] = [
  {
    key: 'pool',
    title: 'Pool',
  },
  {
    key: 'dex',
    title: 'DEX',
    sortKey: 'dex',
  },
  // TODO add key
  {
    key: 'collateral',
    title: 'Value',
    sortKey: 'dexAPY',
  },
  // TODO add key
  {
    key: 'poolShare',
    title: 'Share of the Pool',
    sortKey: 'totalLiquidityUSD',
  },
  // TODO add key
  {
    key: 'composition',
    title: 'Asset composition',
    sortKey: 'totalLiquidityUSD',
  },
  {
    key: 'action',
    title: '',
  },
];

export const getAllPoolsCells = ({
  pool,
  currentAccount,
  openSupply,
  openWithdraw,
}: {
  pool: PoolData;
  currentAccount: string | null;
  openSupply: ModalContextType<ModalArgsType>['openSupply'];
  openWithdraw: ModalContextType<ModalArgsType>['openWithdraw'];
}) => {
  return {
    pool: (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <TokenIcon symbol={`${pool.token0}_${pool.token1}`} fontSize='small' />
        <Typography variant='numberS' color='text.secondary'>
          {pool.token0}/{pool.token1}
        </Typography>
      </Box>
    ),
    dex: (
      <TokenIcon
        symbol={
          pool.data.length === 1
            ? (pool.data[0]?.dex?.name ?? '')
            : pool.data.reduce((acc, i) => {
                const updatedAcc = acc || '';
                return updatedAcc + (updatedAcc ? `_${i.dex.name || ''}` : i.dex.name || '');
              }, '')
        }
        fontSize='medium'
      />
    ),
    collapsibleData: pool.data.map(d => ({
      pool: (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <TokenIcon symbol={`${d.token0.symbol}_${d.token1.symbol}`} fontSize='small' />
          <Typography variant='numberS' color='text.secondary'>
            {d.token0.symbol}/{d.token1.symbol}
          </Typography>
        </Box>
      ),
      dex: (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TokenIcon symbol={d.dex.name} fontSize='medium' />
          <Typography variant='subtitle' color='text.secondary'>
            {d.dex.name}
          </Typography>
        </Box>
      ),
      apy: <Typography variant='subtitle'>-</Typography>,
      // <FormattedNumber value={d.dexAPY} percent variant="subtitle" />,
      tvl: <ReserveSubheader value={d.totalLiquidityUSD} variant='subtitle' />,
      type: (
        <Typography variant='subtitle' sx={{ textTransform: 'capitalize' }}>
          {d.exposure} exposure
        </Typography>
      ),
      action: (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
            gap: 2,
          }}
        >
          {currentAccount && (
            <Button
              variant='contained'
              size={'small'}
              sx={{
                width: { xs: '100%', md: '82px' },
              }}
              onClick={() => openSupply(d.underlyingAsset)}
              disabled
            >
              Supply
            </Button>
          )}
          {currentAccount && (
            <Button
              variant='white'
              size={'small'}
              sx={{
                width: { xs: '100%', md: '82px' },
              }}
              onClick={() => {
                openWithdraw(d.underlyingAsset);
              }}
              disabled
            >
              Withdraw
            </Button>
          )}
        </Box>
      ),
    })),
  };
};

export const getCollateralCells = ({
  pool,
  openSupply,
  openWithdraw,
}: {
  pool: UserPoolData;
  openSupply: ModalContextType<ModalArgsType>['openSupply'];
  openWithdraw: ModalContextType<ModalArgsType>['openWithdraw'];
}) => {
  return {
    pool: (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <TokenIcon symbol={`${pool.token0}_${pool.token1}`} fontSize='small' />
        <Typography variant='numberS' color='text.secondary'>
          {pool.token0}/{pool.token1}
        </Typography>
      </Box>
    ),
    dex: (
      <TokenIcon
        symbol={
          pool.data.length === 1
            ? (pool.data[0]?.reserve?.dex?.name ?? '')
            : pool.data.reduce((acc, i) => {
                return acc + (acc ? `_${i.reserve.dex.name || ''}` : i.reserve.dex.name || '');
              }, '')
        }
        fontSize='medium'
      />
    ),

    collateral: (
      <ReserveSubheader
        value={pool.data.reduce((acc, d) => acc + Number(d.underlyingBalanceUSD), 0).toString()}
        variant='subtitle'
      />
    ),
    collapsibleData: pool.data.map(d => ({
      pool: (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <TokenIcon
            symbol={`${d.reserve.token0.symbol}_${d.reserve.token1.symbol}`}
            fontSize='small'
          />
          <Typography variant='numberS' color='text.secondary'>
            {d.reserve.token0.symbol}/{d.reserve.token1.symbol}
          </Typography>
        </Box>
      ),
      dex: (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TokenIcon symbol={d.reserve.dex.name} fontSize='medium' />
          <Typography variant='subtitle' color='text.secondary'>
            {d.reserve.dex.name}
          </Typography>
        </Box>
      ),
      collateral: <ReserveSubheader value={d.underlyingBalanceUSD} variant='subtitle' />,
      poolShare: <Typography variant='subtitle'>-</Typography>,
      // <FormattedNumber value={'0.14'} percent variant="subtitle" />,
      action: (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
            gap: 2,
          }}
        >
          <Button
            variant='contained'
            size={'small'}
            sx={{
              width: { xs: '100%', md: '82px' },
            }}
            onClick={() => openSupply(d.underlyingAsset)}
            disabled
          >
            Supply
          </Button>
          <Button
            variant='white'
            size={'small'}
            sx={{
              width: { xs: '100%', md: '82px' },
            }}
            onClick={() => {
              openWithdraw(d.underlyingAsset);
            }}
            disabled
          >
            Withdraw
          </Button>
        </Box>
      ),
    })),
  };
};

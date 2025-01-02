import { BigNumberValue, USD_DECIMALS, valueToBigNumber } from '@aave/math-utils';
import { FormattedReservesAndIncentives, InterestRate } from '@lendos/types/reserves';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Skeleton,
  Stack,
  Typography,
  TypographyProps,
} from '@mui/material';
import { ElementType, ReactNode, useState } from 'react';
import { useModalContext } from '../../providers/ModalProvider';
import { Warning } from '../../components/Warning';
import { Link } from '../../components/Link';
import { Routes } from '@lendos/constants/routes';
import { API_ETH_MOCK_ADDRESS } from '@lendos/constants/addresses';
import { AvailableTooltip } from '../../components/infoTooltips/AvailableTooltip';
import { CapType } from '@lendos/types/cap';
import { FormattedNumber } from '../../components/FormattedNumber';
import { StyledTxModalToggleGroup } from '../../components/StyledToggleButtonGroup';
import { StyledTxModalToggleButton } from '../../components/StyledToggleTabButton';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import { useAccountContext } from '../../providers/AccountProvider';
import { useStateContext } from '../../providers/StateProvider';
import { useReservesContext } from '../../providers/ReservesProvider';
import { useBalanceContext } from '../../providers/BalanceProvider';
import { getMaxAmountAvailableToBorrow } from '@lendos/constants/getMaxAmountAvailableToBorrow';
import { getMaxAmountAvailableToSupply } from '@lendos/constants/getMaxAmountAvailableToSupply';
import { amountToUsd } from '@lendos/constants/round';
import { useReserveActionState } from './hooks/useReserveActionState';
import { ConnectWalletButton } from '../../components/ConnectWalletButton';

const amountToUSD = (
  amount: BigNumberValue,
  formattedPriceInMarketReferenceCurrency: string,
  marketReferencePriceInUsd: string,
) => {
  return valueToBigNumber(amount)
    .multipliedBy(formattedPriceInMarketReferenceCurrency)
    .multipliedBy(marketReferencePriceInUsd)
    .shiftedBy(-USD_DECIMALS)
    .toString();
};

interface ReserveActionsProps {
  reserve: FormattedReservesAndIncentives;
}

export const ReserveActions = ({ reserve }: ReserveActionsProps) => {
  const [selectedAsset, setSelectedAsset] = useState(reserve.symbol);

  const { loading: loadingWeb3, account } = useAccountContext();
  const { accountSummary, loading: loadingReserves, baseCurrencyData } = useReservesContext();
  const { currentNetworkData, currentMarketData, minRemainingBaseTokenBalance } = useStateContext();
  const { openBorrow, openSupply } = useModalContext();

  const { walletBalances, loading: loadingWalletBalance } = useBalanceContext();

  const { baseAssetSymbol } = currentNetworkData;

  let balance = walletBalances[reserve.underlyingAsset];
  if (reserve.isWrappedBaseAsset && selectedAsset === baseAssetSymbol) {
    balance = walletBalances[API_ETH_MOCK_ADDRESS.toLowerCase()];
  }

  let maxAmountToBorrow = '0';
  let maxAmountToSupply = '0';

  if (accountSummary) {
    maxAmountToBorrow = getMaxAmountAvailableToBorrow(
      reserve,
      accountSummary,
      InterestRate.Variable,
    ).toString();

    maxAmountToSupply = getMaxAmountAvailableToSupply(
      balance?.amount ?? '0',
      reserve,
      reserve.underlyingAsset,
      minRemainingBaseTokenBalance,
    ).toString();
  }

  const maxAmountToBorrowUsd = amountToUsd(
    maxAmountToBorrow,
    reserve.formattedPriceInMarketReferenceCurrency,
    baseCurrencyData.marketReferenceCurrencyPriceInUsd,
  ).toString();

  const maxAmountToSupplyUsd = amountToUSD(
    maxAmountToSupply,
    reserve.formattedPriceInMarketReferenceCurrency,
    baseCurrencyData.marketReferenceCurrencyPriceInUsd,
  ).toString();

  const { disableSupplyButton, disableBorrowButton, alerts } = useReserveActionState({
    balance: balance?.amount ?? '0',
    maxAmountToSupply: maxAmountToSupply.toString(),
    maxAmountToBorrow: maxAmountToBorrow.toString(),
    reserve,
  });

  if (!account) {
    return <ConnectWallet loading={loadingWeb3} />;
  }

  if (loadingReserves || loadingWalletBalance) {
    return <ActionsSkeleton />;
  }

  return (
    <PaperWrapper>
      {reserve.isWrappedBaseAsset && (
        <Box>
          <WrappedBaseAssetSelector
            assetSymbol={reserve.symbol}
            baseAssetSymbol={baseAssetSymbol}
            selectedAsset={selectedAsset}
            setSelectedAsset={setSelectedAsset}
          />
        </Box>
      )}
      <WalletBalance
        balance={balance?.amount ?? '0'}
        symbol={selectedAsset}
        marketTitle={currentMarketData.marketTitle}
      />
      {reserve.isFrozen || reserve.isPaused ? (
        <Box sx={{ mt: 3 }}>{reserve.isPaused ? <PauseWarning /> : <FrozenWarning />}</Box>
      ) : (
        <>
          <Divider sx={{ mt: 4, mb: 6, borderColor: theme => theme.palette.border.grey }} />
          <Stack gap={3}>
            <SupplyAction
              value={maxAmountToSupply.toString()}
              usdValue={maxAmountToSupplyUsd}
              symbol={selectedAsset}
              disable={disableSupplyButton}
              onActionClicked={() => {
                if (reserve.isWrappedBaseAsset && selectedAsset === baseAssetSymbol) {
                  openSupply(API_ETH_MOCK_ADDRESS.toLowerCase());
                } else {
                  openSupply(reserve.underlyingAsset);
                }
              }}
            />
            {reserve.borrowingEnabled && (
              <BorrowAction
                value={maxAmountToBorrow.toString()}
                usdValue={maxAmountToBorrowUsd}
                symbol={selectedAsset}
                disable={disableBorrowButton}
                onActionClicked={() => {
                  openBorrow(reserve.underlyingAsset);
                }}
              />
            )}
            {alerts}
          </Stack>
        </>
      )}
    </PaperWrapper>
  );
};

const PauseWarning = () => {
  return (
    <Warning sx={{ mb: 0 }} severity='error' icon={true}>
      Because this asset is paused, no actions can be taken until further notice
    </Warning>
  );
};

const FrozenWarning = () => {
  return (
    <Warning sx={{ mb: 0 }} severity='error' icon={true}>
      <>
        Since this asset is frozen, the only available actions are withdraw and repay which can be
        accessed from the <Link href={Routes.dashboard}>Dashboard</Link>
      </>
    </Warning>
  );
};

const ActionsSkeleton = () => {
  const RowSkeleton = (
    <Stack>
      <Skeleton width={150} height={14} />
      <Stack
        sx={{ height: '44px' }}
        direction='row'
        justifyContent='space-between'
        alignItems='center'
      >
        <Box>
          <Skeleton width={100} height={14} sx={{ mt: 1, mb: 2 }} />
          <Skeleton width={75} height={12} />
        </Box>
        <Skeleton height={36} width={96} />
      </Stack>
    </Stack>
  );

  return (
    <PaperWrapper>
      <Stack direction='row' gap={3}>
        <Skeleton width={42} height={42} sx={{ borderRadius: '12px' }} />
        <Box>
          <Skeleton width={100} height={12} sx={{ mt: 1, mb: 2 }} />
          <Skeleton width={100} height={14} />
        </Box>
      </Stack>
      <Divider sx={{ my: 6, borderColor: theme => theme.palette.border.grey }} />
      <Box>
        <Stack gap={3}>
          {RowSkeleton}
          {RowSkeleton}
        </Stack>
      </Box>
    </PaperWrapper>
  );
};

const PaperWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Paper sx={{ pt: 4, pb: { xs: 4, xsm: 6 }, px: { xs: 4, xsm: 6 } }}>
      <Typography
        component='h2'
        variant='h2'
        sx={{ mb: 6, display: 'flex', alignItems: 'center', gap: 1.5 }}
      >
        <PlayCircleIcon sx={{ color: 'primary.light' }} />
        Your info
      </Typography>

      {children}
    </Paper>
  );
};

const ConnectWallet = ({ loading }: { loading: boolean }) => {
  return (
    <Paper sx={{ pt: 4, pb: { xs: 4, xsm: 6 }, px: { xs: 4, xsm: 6 } }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Typography variant='h3' sx={{ mb: { xs: 6, xsm: 10 } }}>
            Your info
          </Typography>
          <Typography sx={{ mb: 6 }} color='text.secondary'>
            Please connect a wallet to view your personal information here.
          </Typography>
          <ConnectWalletButton />
        </>
      )}
    </Paper>
  );
};

interface ActionProps {
  value: string;
  usdValue: string;
  symbol: string;
  disable: boolean;
  onActionClicked: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- TODO add disabled
const SupplyAction = ({ value, usdValue, symbol, disable, onActionClicked }: ActionProps) => {
  return (
    <Stack>
      <AvailableTooltip variant='h3' text={<>Available to supply</>} capType={CapType.supplyCap} />
      <Stack
        sx={{ height: '44px' }}
        direction='row'
        justifyContent='space-between'
        alignItems='center'
      >
        <Box>
          <ValueWithSymbol variant='numberM' value={value} symbol={symbol} />
          <FormattedNumber
            value={usdValue}
            variant='numberS'
            color='text.primary'
            symbolsColor='text.primary'
            symbol='USD'
          />
        </Box>
        <Button
          sx={{ width: '82px' }}
          onClick={onActionClicked}
          disabled={true}
          fullWidth={false}
          variant='contained'
          data-cy='supplyButton'
          size='small'
        >
          Supply
        </Button>
      </Stack>
    </Stack>
  );
};

const BorrowAction = ({ value, usdValue, symbol, disable, onActionClicked }: ActionProps) => {
  return (
    <Stack>
      <AvailableTooltip variant='h3' text={<>Available to borrow</>} capType={CapType.borrowCap} />
      <Stack
        sx={{ height: '44px' }}
        direction='row'
        justifyContent='space-between'
        alignItems='center'
      >
        <Box>
          <ValueWithSymbol variant='numberM' value={value} symbol={symbol} />
          <FormattedNumber
            value={usdValue}
            variant='numberS'
            color='text.primary'
            symbolsColor='text.primary'
            symbol='USD'
          />
        </Box>
        <Button
          sx={{ width: '82px' }}
          onClick={onActionClicked}
          disabled={disable}
          fullWidth={false}
          variant='white'
          data-cy='borrowButton'
          size='small'
        >
          Borrow
        </Button>
      </Stack>
    </Stack>
  );
};

const WrappedBaseAssetSelector = ({
  assetSymbol,
  baseAssetSymbol,
  selectedAsset,
  setSelectedAsset,
}: {
  assetSymbol: string;
  baseAssetSymbol: string;
  selectedAsset: string;
  setSelectedAsset: (value: string) => void;
}) => {
  return (
    <StyledTxModalToggleGroup
      color='primary'
      value={selectedAsset}
      exclusive
      onChange={(_, value) => setSelectedAsset(value as string)}
      sx={{ mb: 4 }}
    >
      <StyledTxModalToggleButton value={assetSymbol}>
        <Typography variant='buttonM'>{assetSymbol}</Typography>
      </StyledTxModalToggleButton>

      <StyledTxModalToggleButton value={baseAssetSymbol}>
        <Typography variant='buttonM'>{baseAssetSymbol}</Typography>
      </StyledTxModalToggleButton>
    </StyledTxModalToggleGroup>
  );
};

interface ValueWithSymbolProps extends TypographyProps<ElementType, { component?: ElementType }> {
  value: string;
  symbol: string;
  children?: ReactNode;
}

const ValueWithSymbol = ({ value, symbol, children, variant }: ValueWithSymbolProps) => {
  return (
    <Stack direction='row' alignItems='center' gap={1}>
      <FormattedNumber value={value} variant={variant ?? 'numberS'} />
      <Typography variant={variant ?? 'numberS'}>{symbol}</Typography>
      {children}
    </Stack>
  );
};

interface WalletBalanceProps {
  balance: string;
  symbol: string;
  marketTitle: string;
}

const WalletBalance = ({ balance, symbol }: WalletBalanceProps) => {
  return (
    <Stack direction='row' gap={3}>
      <AccountBalanceWalletOutlinedIcon sx={{ width: '40px', height: '40px', stroke: `#DCDCDC` }} />
      <Box>
        <Typography variant='h3'>Wallet balance</Typography>
        <ValueWithSymbol value={balance} symbol={symbol} />
      </Box>
    </Stack>
  );
};

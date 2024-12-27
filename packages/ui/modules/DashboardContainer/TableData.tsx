import {
  Box,
  Button,
  ListItemText,
  Menu,
  MenuItem,
  SvgIcon,
  Tooltip,
  Typography,
} from '@mui/material';
import { MouseEvent } from 'react';
import { TableHeadProperties } from '../../components/Table';
import {
  DashboardReserve,
  FormattedReservesAndIncentives,
  InterestRate,
  ReserveToken,
} from '@lendos/types/reserves';
import { TokenIcon } from '../../components/TokenIcon';
import { CollateralSwitchTooltip } from '../../components/infoTooltips/CollateralSwitchTooltip.tsx';
import { ListButtonsColumn } from './ListButtonsColumn.tsx';
import { ModalArgsType, ModalContextType } from '../../providers/ModalProvider';
import { ListValueColumn } from './ListValueColumn.tsx';
import { ListItemUsedAsCollateral } from './ListItemUsedAsCollateral.tsx';
import { Link } from '../../components/Link';
import { Routes } from '@lendos/constants/routes';
import { MarketDataType } from '@lendos/types/market';
import StarCircle from '../../components/StarCircle';
import { FormattedNumber } from '../../components/FormattedNumber';
import { RewardAPYTooltip } from '../../components/RewardAPYTooltip';
import { IncentivesCard } from '../../components/IncentivesCard';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { isFeatureEnabled } from '@lendos/constants/markets';
import { ListItemCanBeCollateral } from './ListItemCanBeCollateral.tsx';
import { APYTypeTooltip } from '../../components/infoTooltips/APYTypeTooltip.tsx';
import { ListItemAPYButton } from './ListItemAPYButton.tsx';
import { ListAPRColumn } from './ListAPRColumn.tsx';
import { AvailableTooltip } from '../../components/infoTooltips/AvailableTooltip.tsx';
import { CapType } from '@lendos/types/cap';
import { VariableAPYTooltip } from '../../components/VariableAPYTooltip';
import { CapsHint } from '../../components/CapsHint';

export const suppliedPositionsHead: TableHeadProperties[] = [
  {
    key: 'symbol',
    title: 'Assets',
    sortKey: 'symbol',
    mobileHide: true,
  },
  {
    key: 'underlyingBalance',
    title: 'Balance',
    sortKey: 'underlyingBalance',
  },
  {
    key: 'supplyAPY',
    title: 'APY',
    sortKey: 'supplyAPY',
  },
  {
    key: 'usageAsCollateralEnabledOnUser',
    title: <CollateralSwitchTooltip text='Collateral' variant='h3' />,
  },
  {
    key: 'action',
    title: '',
  },
];

export const lpHead = [
  {
    key: 'symbol',
    title: 'Pool',
    mobileHide: true,
  },
  {
    key: 'Balance',
    title: 'Value',
    sortKey: 'underlyingBalanceUSD',
  },
  {
    key: 'DEX',
    title: 'DEX',
    sortKey: 'dex',
  },
];

export const getSuppliedPositionsCells = (
  reserve: FormattedReservesAndIncentives<ReserveToken>,
  market: MarketDataType,
  openSupply: ModalContextType<ModalArgsType>['openSupply'],
  openWithdraw: ModalContextType<ModalArgsType>['openWithdraw'],
  openCollateralChange: ModalContextType<ModalArgsType>['openCollateralChange'],
  canBeEnabledAsCollateral: boolean,
) => {
  return {
    symbol: (
      <Box
        component={Link}
        href={`${Routes.reserveOverview}/?underlyingAsset=${reserve.underlyingAsset}&marketName=${market.market}`}
        sx={{ display: 'flex', alignItems: 'center', gap: 3.5 }}
      >
        <TokenIcon
          symbol={reserve.iconSymbol}
          sx={{ fontSize: ['40px', '40px', '40px', '26px'] }}
        />
        <Tooltip title={`${reserve.name} (${reserve.symbol})`} arrow placement='top'>
          <Box>
            <Typography variant='subtitle' sx={{ color: 'text.dark' }} noWrap data-cy={`assetName`}>
              {reserve.symbol}
            </Typography>
            <Typography
              variant='subheader2'
              color='text.muted'
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {reserve.symbol}
            </Typography>
          </Box>
        </Tooltip>
      </Box>
    ),
    underlyingBalance: (
      <ListValueColumn
        symbol={reserve.iconSymbol}
        value={Number(123)}
        subValue={Number(123)}
        disabled={Number(123) === 0}
      />
    ),
    supplyAPY: (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {reserve.rewardAPY && reserve.rewardAPY > 0 ? (
          <Box>
            <RewardAPYTooltip
              supplyAPY={reserve.supplyAPY}
              rewardAPY={reserve.rewardAPY}
              cont={
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  <StarCircle />
                  <FormattedNumber
                    compact
                    value={
                      reserve.rewardAPY - Number(reserve.supplyAPY) * 100 > 0
                        ? (reserve.rewardAPY || 0) / 100
                        : reserve.supplyAPY
                    }
                    variant='numberS'
                    symbolsColor={'text.dark'}
                    color={'text.dark'}
                    percent
                  />
                </Box>
              }
            />
          </Box>
        ) : (
          <Box sx={{ display: 'flex' }}>
            <IncentivesCard
              value={Number(reserve.supplyAPY)}
              incentives={reserve.aIncentivesData}
              symbol={reserve.symbol}
            />
          </Box>
        )}
      </Box>
    ),
    usageAsCollateralEnabledOnUser: (
      <ListItemUsedAsCollateral
        disabled={reserve.isPaused}
        isIsolated={reserve.isIsolated}
        // TODO: need to find out what is usageAsCollateralEnabledOnUser
        usageAsCollateralEnabledOnUser={false}
        canBeEnabledAsCollateral={canBeEnabledAsCollateral}
        onToggleSwitch={() => {
          openCollateralChange(reserve.underlyingAsset);
        }}
        data-cy={`collateralStatus`}
      />
    ),
    action: (
      <ListButtonsColumn>
        <Button
          disabled={!reserve.isActive || reserve.isFrozen || reserve.isPaused}
          variant='contained'
          size={'small'}
          onClick={() => openSupply(reserve.underlyingAsset)}
          sx={{ minWidth: '82px', width: { xs: '100%', md: 'auto' } }}
        >
          Supply
        </Button>
        <Button
          disabled={!reserve.isActive || reserve.isPaused}
          variant='white'
          size={'small'}
          sx={{ minWidth: '82px', width: { xs: '100%', md: 'auto' } }}
          onClick={() => {
            openWithdraw(reserve.underlyingAsset);
          }}
        >
          Withdraw
        </Button>
      </ListButtonsColumn>
    ),
  };
};

export const supplyAssetsHead: TableHeadProperties[] = [
  {
    key: 'symbol',
    title: 'Assets',
    sortKey: 'symbol',
    mobileHide: true,
  },
  {
    key: 'walletBalance',
    title: 'Wallet balance',
    sortKey: 'walletBalance',
  },
  {
    key: 'supplyAPY',
    title: 'APY',
    sortKey: 'supplyAPY',
  },
  {
    key: 'usageAsCollateralEnabledOnUser',
    title: 'Can be collateral',
  },
  {
    key: 'action',
    title: '',
  },
];

export const getSupplyAssetsCells = (
  reserve: FormattedReservesAndIncentives<ReserveToken>,
  market: MarketDataType,
  openSupply: ModalContextType<ModalArgsType>['openSupply'],
  handleSwitchClick: (reserve: FormattedReservesAndIncentives<ReserveToken>) => void,
  handleClose: () => void,
  handleClick: (event: MouseEvent<HTMLButtonElement>) => void,
  anchorEl: HTMLElement | null,
  open: boolean,
) => {
  return {
    symbol: (
      <Box
        component={Link}
        href={`${Routes.reserveOverview}/?underlyingAsset=${reserve.underlyingAsset}&marketName=${market.market}`}
        sx={{ display: 'flex', alignItems: 'center', gap: 3.5 }}
      >
        <TokenIcon
          symbol={reserve.iconSymbol}
          sx={{ fontSize: ['40px', '40px', '40px', '26px'] }}
        />
        <Tooltip title={`${reserve.name} (${reserve.symbol})`} arrow placement='top'>
          <Box>
            <Typography variant='subtitle' sx={{ color: 'text.dark' }} noWrap data-cy={`assetName`}>
              {reserve.symbol}
            </Typography>
            <Typography
              variant='subheader2'
              color='text.muted'
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {reserve.symbol}
            </Typography>
          </Box>
        </Tooltip>
      </Box>
    ),
    walletBalance: <Box>balance</Box>,
    supplyAPY: (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {reserve.rewardAPY && reserve.rewardAPY > 0 ? (
          <Box>
            <RewardAPYTooltip
              supplyAPY={reserve.supplyAPY}
              rewardAPY={reserve.rewardAPY}
              cont={
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  <StarCircle />
                  <FormattedNumber
                    compact
                    value={
                      reserve.rewardAPY - Number(reserve.supplyAPY) * 100 > 0
                        ? (reserve.rewardAPY || 0) / 100
                        : reserve.supplyAPY
                    }
                    variant='numberS'
                    symbolsColor={'text.dark'}
                    color={'text.dark'}
                    percent
                  />
                </Box>
              }
            />
          </Box>
        ) : (
          <Box sx={{ display: 'flex' }}>
            <IncentivesCard
              value={Number(reserve.supplyAPY)}
              incentives={reserve.aIncentivesData}
              symbol={reserve.symbol}
            />
          </Box>
        )}
      </Box>
    ),
    usageAsCollateralEnabledOnUser: (
      <ListItemCanBeCollateral isIsolated={reserve.isIsolated} usageAsCollateralEnabled={false} />
    ),
    action: (
      <ListButtonsColumn>
        <Button
          // TODO: need to find out what is disabled
          disabled={false}
          variant='contained'
          onClick={() => {
            openSupply(reserve.underlyingAsset);
          }}
          size={'small'}
          sx={{ width: { xs: '100%', md: 'auto' } }}
        >
          Supply
        </Button>
        <Button
          id='supply-extra-button'
          sx={{
            minWidth: 0,
            px: 4,
            display: { xs: 'none', sm: 'flex' },
          }}
          variant='white'
          onClick={handleClick}
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          size={'small'}
        >
          ...
        </Button>
        <Button
          variant='white'
          size={'small'}
          component={Link}
          href={`${Routes.reserveOverview}/?underlyingAsset=${reserve.underlyingAsset}&marketName=${market.market}`}
          sx={{
            display: { xs: 'flex', sm: 'none' },
            width: { xs: '100%', md: 'auto' },
          }}
          fullWidth
        >
          Details
        </Button>
        <Menu
          id='supply-item-extra-menu'
          anchorEl={anchorEl}
          open={open}
          MenuListProps={{
            'aria-labelledby': 'supply-extra-button',
            sx: {
              py: 0,
            },
          }}
          onClose={handleClose}
          keepMounted={true}
          slotProps={{
            paper: {
              sx: {
                minWidth: '120px',
                py: 0,
              },
            },
          }}
        >
          <MenuItem
            sx={{ gap: 2 }}
            onClick={() => handleSwitchClick(reserve)}
            disabled={!isFeatureEnabled.switch(market)}
          >
            <SvgIcon fontSize='small'>
              <SwapHorizIcon />
            </SvgIcon>
            <ListItemText>Switch</ListItemText>
          </MenuItem>
          <MenuItem
            sx={{ gap: 2 }}
            component={Link}
            href={`${Routes.reserveOverview}/?underlyingAsset=${reserve.underlyingAsset}&marketName=${market.market}`}
            onClick={handleClose}
          >
            <SvgIcon fontSize='small'>
              <VisibilityIcon />
            </SvgIcon>
            <ListItemText>Details</ListItemText>
          </MenuItem>
        </Menu>
      </ListButtonsColumn>
    ),
  };
};

export const borrowedPositionsHead: TableHeadProperties[] = [
  {
    key: 'symbol',
    title: 'Asset',
    sortKey: 'symbol',
    mobileHide: true,
  },
  {
    key: 'variableBorrows',
    title: 'Debt',
    sortKey: 'variableBorrows',
  },
  {
    key: 'borrowAPY',
    title: 'APY',
    sortKey: 'borrowAPY',
  },
  {
    key: 'typeAPY',
    title: <APYTypeTooltip text='APY type' key='APY type' variant='h3' />,
  },
  {
    key: 'action',
    title: '',
  },
];

export const getBorrowedPositionsCells = (
  reserve: FormattedReservesAndIncentives<DashboardReserve>,
  market: MarketDataType,
  openBorrow: ModalContextType<ModalArgsType>['openBorrow'],
  openRepay: ModalContextType<ModalArgsType>['openRepay'],
  openRateSwitch: ModalContextType<ModalArgsType>['openRateSwitch'],
  openDebtSwitch: ModalContextType<ModalArgsType>['openDebtSwitch'],
) => {
  const disableBorrow =
    !reserve.isActive || !reserve.borrowingEnabled || reserve.isFrozen || reserve.isPaused;

  const disableRepay = !reserve.isActive || reserve.isPaused;

  const showSwitchButton = isFeatureEnabled.debtSwitch(market) ?? false;
  const disableSwitch = reserve.isPaused || !reserve.isActive || reserve.symbol === 'stETH';

  const borrowAPY =
    reserve.borrowRateMode === InterestRate.Variable
      ? Number(reserve.variableBorrowAPY)
      : Number(reserve.stableBorrowAPY);

  const incentives =
    reserve.borrowRateMode === InterestRate.Variable
      ? reserve.vIncentivesData
      : reserve.sIncentivesData;

  const totalBorrows =
    reserve.borrowRateMode === InterestRate.Variable
      ? reserve.variableBorrows
      : reserve.stableBorrows;

  const totalBorrowsUSD =
    reserve.borrowRateMode === InterestRate.Variable
      ? reserve.variableBorrowsUSD
      : reserve.stableBorrowsUSD;

  return {
    symbol: (
      <Box
        component={Link}
        href={`${Routes.reserveOverview}/?underlyingAsset=${reserve.underlyingAsset}&marketName=${market.market}`}
        sx={{ display: 'flex', alignItems: 'center', gap: 3.5 }}
      >
        <TokenIcon
          symbol={reserve.iconSymbol}
          sx={{ fontSize: ['40px', '40px', '40px', '26px'] }}
        />
        <Tooltip title={`${reserve.name} (${reserve.symbol})`} arrow placement='top'>
          <Box>
            <Typography variant='subtitle' sx={{ color: 'text.dark' }} noWrap data-cy={`assetName`}>
              {reserve.symbol}
            </Typography>
            <Typography
              variant='subheader2'
              color='text.muted'
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {reserve.symbol}
            </Typography>
          </Box>
        </Tooltip>
      </Box>
    ),
    variableBorrows: (
      <ListValueColumn symbol={reserve.symbol} value={totalBorrows} subValue={totalBorrowsUSD} />
    ),
    borrowAPY: <ListAPRColumn value={borrowAPY} incentives={incentives} symbol={reserve.symbol} />,
    typeAPY: (
      <ListItemAPYButton
        stableBorrowRateEnabled={reserve.stableBorrowRateEnabled}
        borrowRateMode={reserve.borrowRateMode}
        disabled={
          !reserve.stableBorrowRateEnabled ||
          reserve.isFrozen ||
          !reserve.isActive ||
          reserve.isPaused
        }
        onClick={() => {
          openRateSwitch(reserve.underlyingAsset, reserve.borrowRateMode);
        }}
        stableBorrowAPY={reserve.stableBorrowAPY}
        variableBorrowAPY={reserve.variableBorrowAPY}
        underlyingAsset={reserve.underlyingAsset}
        currentMarket={market.market}
      />
    ),
    action: (
      <ListButtonsColumn>
        {showSwitchButton ? (
          <Button
            disabled={disableSwitch}
            variant='contained'
            onClick={() => {
              openDebtSwitch(reserve.underlyingAsset, reserve.borrowRateMode);
            }}
            data-cy={`swapButton`}
            size={'small'}
            sx={{
              width: { xs: '100%', md: 'auto' },
            }}
          >
            Switch
          </Button>
        ) : (
          <Button
            disabled={disableBorrow}
            variant='contained'
            size={'small'}
            onClick={() => {
              openBorrow(reserve.underlyingAsset);
            }}
            sx={{
              width: { xs: '100%', md: 'auto' },
            }}
          >
            Borrow
          </Button>
        )}
        <Button
          disabled={disableRepay}
          variant='white'
          size={'small'}
          onClick={() => {
            openRepay(reserve.underlyingAsset, reserve.borrowRateMode, reserve.isFrozen);
          }}
          sx={{
            width: { xs: '100%', md: 'auto' },
          }}
        >
          Repay
        </Button>
      </ListButtonsColumn>
    ),
  };
};

export const borrowAssetsHead: TableHeadProperties[] = [
  {
    key: 'symbol',
    title: 'Asset',
    sortKey: 'symbol',
    mobileHide: true,
  },
  {
    key: 'availableBorrows',
    title: (
      <AvailableTooltip
        capType={CapType.borrowCap}
        text='Available'
        key='availableBorrows'
        variant='h3'
      />
    ),
    sortKey: 'availableBorrows',
  },
  {
    key: 'variableBorrowAPY',
    title: <VariableAPYTooltip text='APY, variable' key='variableBorrowAPY' variant='h3' />,
    sortKey: 'variableBorrowAPY',
  },
  {
    key: 'action',
    title: '',
  },
];

export const getBorrowAssetsCells = (
  reserve: FormattedReservesAndIncentives<DashboardReserve>,
  market: MarketDataType,
  openBorrow: ModalContextType<ModalArgsType>['openBorrow'],
) => {
  const disableBorrow = reserve.isFreezed ?? Number(reserve.availableBorrows) <= 0;

  return {
    symbol: (
      <Box
        component={Link}
        href={`${Routes.reserveOverview}/?underlyingAsset=${reserve.underlyingAsset}&marketName=${market.market}`}
        sx={{ display: 'flex', alignItems: 'center', gap: 3.5 }}
      >
        <TokenIcon
          symbol={reserve.iconSymbol}
          sx={{ fontSize: ['40px', '40px', '40px', '26px'] }}
        />
        <Tooltip title={`${reserve.name} (${reserve.symbol})`} arrow placement='top'>
          <Box>
            <Typography variant='subtitle' sx={{ color: 'text.dark' }} noWrap data-cy={`assetName`}>
              {reserve.symbol}
            </Typography>
            <Typography
              variant='subheader2'
              color='text.muted'
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {reserve.symbol}
            </Typography>
          </Box>
        </Tooltip>
      </Box>
    ),
    availableBorrows: (
      <ListValueColumn
        symbol={reserve.symbol}
        value={Number(reserve.availableBorrows)}
        subValue={Number(reserve.availableBorrowsInUSD)}
        disabled={Number(reserve.availableBorrows) === 0}
        withTooltip={false}
        capsComponent={
          <CapsHint
            capType={CapType.borrowCap}
            capAmount={reserve.borrowCap}
            totalAmount={reserve.totalBorrows}
            withoutText
          />
        }
      />
    ),
    variableBorrowAPY: (
      <ListAPRColumn
        value={Number(reserve.variableBorrowRate)}
        incentives={reserve.vIncentivesData}
        symbol={reserve.symbol}
      />
    ),
    action: (
      <ListButtonsColumn>
        <Button
          disabled={disableBorrow}
          variant='contained'
          size={'small'}
          onClick={() => {
            openBorrow(reserve.underlyingAsset);
          }}
          sx={{
            width: { xs: '100%', md: 'auto' },
          }}
        >
          Borrow
        </Button>
        <Button
          variant='white'
          size={'small'}
          component={Link}
          href={`${Routes.reserveOverview}/?underlyingAsset=${reserve.underlyingAsset}&marketName=${market.market}`}
          sx={{
            width: { xs: '100%', md: 'auto' },
          }}
        >
          Details
        </Button>
      </ListButtonsColumn>
    ),
  };
};

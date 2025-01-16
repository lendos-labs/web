import { Dispatch, SetStateAction } from 'react';

import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import VisibilityIcon from '@mui/icons-material/Visibility';
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

import { CapType } from '@lendos/types/cap';
import { MarketDataType } from '@lendos/types/market';
import {
  DashboardReserve,
  FormattedReservesAndIncentives,
  InterestRate,
  ReserveLpToken,
  ReserveToken,
  Reserves,
} from '@lendos/types/reserves';
import { FormattedUserReserves } from '@lendos/types/user';

import { isFeatureEnabled } from '@lendos/constants/markets';
import { Routes } from '@lendos/constants/routes';

import { CapsHint } from '../../components/CapsHint';
import { FormattedNumber } from '../../components/FormattedNumber';
import { IncentivesCard } from '../../components/IncentivesCard';
import { Link } from '../../components/Link';
import { ReserveSubheader } from '../../components/ReserveSubheader';
import { RewardAPYTooltip } from '../../components/RewardAPYTooltip';
import StarCircle from '../../components/StarCircle';
import { TableHeadProperties } from '../../components/Table';
import { TokenIcon } from '../../components/TokenIcon';
import { VariableAPYTooltip } from '../../components/VariableAPYTooltip';
import { APYTypeTooltip } from '../../components/infoTooltips/APYTypeTooltip.tsx';
import { AvailableTooltip } from '../../components/infoTooltips/AvailableTooltip.tsx';
import { ModalArgsType, ModalContextType } from '../../providers/ModalProvider';
import { ListAPRColumn } from './ListAPRColumn.tsx';
import { ListButtonsColumn } from './ListButtonsColumn.tsx';
import { ListItemAPYButton } from './ListItemAPYButton.tsx';
import { ListItemCanBeCollateral } from './ListItemCanBeCollateral.tsx';
import { ListItemUsedAsCollateral } from './ListItemUsedAsCollateral.tsx';
import { ListValueColumn } from './ListValueColumn.tsx';

export const getSuppliedPositionsCells = (
  userReserve: FormattedUserReserves<ReserveToken>,
  market: MarketDataType,
  canBeEnabledAsCollateral: boolean,
  openSupply: ModalContextType<ModalArgsType>['openSupply'],
  openWithdraw: ModalContextType<ModalArgsType>['openWithdraw'],
  openCollateralChange: ModalContextType<ModalArgsType>['openCollateralChange'],
) => {
  const { reserve } = userReserve;
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
        value={userReserve.underlyingBalance}
        subValue={userReserve.underlyingBalanceUSD}
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
        usageAsCollateralEnabledOnUser={userReserve.usageAsCollateralEnabledOnUser}
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

export const getDexLpSuppliedPositionsCells = (
  userReserve: FormattedUserReserves<ReserveLpToken>,
  market: MarketDataType,
  openSupply: ModalContextType<ModalArgsType>['openSupply'],
  openWithdraw: ModalContextType<ModalArgsType>['openWithdraw'],
) => {
  const { reserve } = userReserve;
  return {
    symbol: (
      <Box
        component={Link}
        href={`${Routes.reserveOverview}/?underlyingAsset=${reserve.underlyingAsset}&marketName=${market.market}`}
        sx={{ display: 'flex', alignItems: 'center', gap: 3.5 }}
      >
        <TokenIcon
          symbol={`${reserve.token0.symbol}_${reserve.token1.symbol}`}
          sx={{ fontSize: ['40px', '40px', '40px', '26px'] }}
        />
        <Tooltip
          title={`${reserve.name} (${reserve.token0.symbol}/${reserve.token1.symbol})`}
          arrow
          placement='top'
        >
          <Box>
            <Typography variant='subtitle' sx={{ color: 'text.dark' }} noWrap data-cy={`assetName`}>
              {reserve.token0.symbol}/{reserve.token1.symbol}
            </Typography>
            <Typography
              variant='subheader2'
              color='text.muted'
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {reserve.token0.symbol}/{reserve.token1.symbol}
            </Typography>
          </Box>
        </Tooltip>
      </Box>
    ),
    underlyingBalanceUSD: (
      <ReserveSubheader value={userReserve.underlyingBalanceUSD} variant='subtitle' />
    ),
    dexName: (
      <Typography variant='subtitle' sx={{ ml: 3, color: 'text.dark' }} noWrap data-cy={`dexName`}>
        {reserve.dex.name}
      </Typography>
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

export const getSupplyAssetsCells = (
  reserve: FormattedReservesAndIncentives<DashboardReserve>,
  market: MarketDataType,
  openSupply: ModalContextType<ModalArgsType>['openSupply'],
  handleSwitchClick: (reserve: FormattedReservesAndIncentives) => void,
  setAnchor: Dispatch<SetStateAction<Record<string, HTMLElement | null>>>,
  anchorEl: HTMLElement | null,
) => {
  const symbol =
    reserve.type === Reserves.ASSET
      ? reserve.iconSymbol
      : `${reserve.token0.symbol}/${reserve.token1.symbol}`;

  const iconSymbol =
    reserve.type === Reserves.ASSET
      ? reserve.iconSymbol
      : `${reserve.token0.symbol}_${reserve.token1.symbol}`;
  return {
    symbol: (
      <Box
        component={Link}
        href={`${Routes.reserveOverview}/?underlyingAsset=${reserve.underlyingAsset}&marketName=${market.market}`}
        sx={{ display: 'flex', alignItems: 'center', gap: 3.5 }}
      >
        <TokenIcon symbol={iconSymbol} sx={{ fontSize: ['40px', '40px', '40px', '26px'] }} />
        <Tooltip title={`${reserve.name} (${symbol})`} arrow placement='top'>
          <Box>
            <Typography variant='subtitle' sx={{ color: 'text.dark' }} noWrap data-cy={`assetName`}>
              {symbol}
            </Typography>
            <Typography
              variant='subheader2'
              color='text.muted'
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {symbol}
            </Typography>
          </Box>
        </Tooltip>
      </Box>
    ),
    ...(reserve.type === Reserves.ASSET && {
      // TODO: need change
      walletBalance: (
        <ListValueColumn
          symbol={symbol}
          value={Number(reserve.walletBalance)}
          subValue={reserve.walletBalanceUSD}
          withTooltip
          disabled={Number(reserve.walletBalance) === 0}
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
        <ListItemCanBeCollateral isIsolated={reserve.isIsolated} usageAsCollateralEnabled={false} />
      ),
    }),
    ...(reserve.type === Reserves.LP && {
      walletBalance: (
        <FormattedNumber
          value={Number(reserve.walletBalance)}
          visibleDecimals={2}
          variant='subtitle'
          color='text.dark'
        />
      ),

      dex: (
        <Typography
          variant='subtitle'
          sx={{ ml: 3, color: 'text.dark' }}
          noWrap
          data-cy={`dexName`}
        >
          {(reserve as ReserveLpToken).dex.name}
        </Typography>
      ),
    }),
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
          onClick={e =>
            setAnchor(state => ({ ...state, [reserve.underlyingAsset]: e.currentTarget }))
          }
          aria-controls={anchorEl ? 'basic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={anchorEl ? 'true' : undefined}
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
          open={Boolean(anchorEl)}
          MenuListProps={{
            'aria-labelledby': 'supply-extra-button',
            sx: {
              py: 0,
            },
          }}
          onClose={() => setAnchor({})}
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
          {isFeatureEnabled.switch(market) && (
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
          )}
          <MenuItem
            sx={{ gap: 2 }}
            component={Link}
            href={`${Routes.reserveOverview}/?underlyingAsset=${reserve.underlyingAsset}&marketName=${market.market}`}
            onClick={() => setAnchor({})}
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
  userReserve: FormattedUserReserves<ReserveToken>,
  market: MarketDataType,
  openBorrow: ModalContextType<ModalArgsType>['openBorrow'],
  openRepay: ModalContextType<ModalArgsType>['openRepay'],
  openRateSwitch: ModalContextType<ModalArgsType>['openRateSwitch'],
  openDebtSwitch: ModalContextType<ModalArgsType>['openDebtSwitch'],
) => {
  const { reserve } = userReserve;

  let borrowRateMode: InterestRate | undefined;
  if (userReserve.variableBorrows !== '0') {
    borrowRateMode = InterestRate.Variable;
  } else if (userReserve.stableBorrows !== '0') {
    borrowRateMode = InterestRate.Stable;
  }
  const disableBorrow =
    !reserve.isActive || !reserve.borrowingEnabled || reserve.isFrozen || reserve.isPaused;

  const disableRepay = !reserve.isActive || reserve.isPaused;

  const showSwitchButton = isFeatureEnabled.debtSwitch(market) ?? false;
  const disableSwitch = reserve.isPaused || !reserve.isActive || reserve.symbol === 'stETH';

  const borrowAPY =
    borrowRateMode === InterestRate.Variable
      ? Number(reserve.variableBorrowAPY)
      : Number(reserve.stableBorrowAPY);

  const incentives =
    borrowRateMode === InterestRate.Variable ? reserve.vIncentivesData : reserve.sIncentivesData;

  const totalBorrows =
    borrowRateMode === InterestRate.Variable
      ? userReserve.variableBorrows
      : userReserve.stableBorrows;

  const totalBorrowsUSD =
    borrowRateMode === InterestRate.Variable
      ? userReserve.variableBorrowsUSD
      : userReserve.stableBorrowsUSD;

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
    typeAPY: borrowRateMode && (
      <ListItemAPYButton
        stableBorrowRateEnabled={reserve.stableBorrowRateEnabled}
        borrowRateMode={borrowRateMode}
        disabled={
          !reserve.stableBorrowRateEnabled ||
          reserve.isFrozen ||
          !reserve.isActive ||
          reserve.isPaused
        }
        onClick={() => {
          openRateSwitch(reserve.underlyingAsset, borrowRateMode);
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
              if (borrowRateMode) {
                openDebtSwitch(reserve.underlyingAsset, borrowRateMode);
              }
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
            if (borrowRateMode) {
              openRepay(reserve.underlyingAsset, borrowRateMode, reserve.isFrozen);
            }
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

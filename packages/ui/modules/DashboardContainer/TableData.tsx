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
import { FormattedReservesAndIncentives, ReserveToken } from '@lendos/types/reserves';
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

export const suppliedPositionsHead: TableHeadProperties[] = [
  {
    key: 'symbol',
    title: 'Assets',
    sortKey: 'symbol',
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
        <TokenIcon symbol={reserve.iconSymbol} size={26} />
        <Tooltip title={`${reserve.name} (${reserve.symbol})`} arrow placement='top'>
          <Typography variant='subtitle' sx={{ color: 'text.dark' }} noWrap data-cy={`assetName`}>
            {reserve.symbol}
          </Typography>
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
          sx={{ minWidth: '82px' }}
        >
          Supply
        </Button>
        <Button
          disabled={!reserve.isActive || reserve.isPaused}
          variant='white'
          size={'small'}
          sx={{ minWidth: '82px' }}
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
        <TokenIcon symbol={reserve.iconSymbol} size={26} />
        <Tooltip title={`${reserve.name} (${reserve.symbol})`} arrow placement='top'>
          <Typography variant='subtitle' sx={{ color: 'text.dark' }} noWrap data-cy={`assetName`}>
            {reserve.symbol}
          </Typography>
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
        >
          Supply
        </Button>
        <Button
          id='supply-extra-button'
          sx={{
            minWidth: 0,
            px: 4,
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

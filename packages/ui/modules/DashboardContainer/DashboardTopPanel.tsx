import { TopInfoPanel } from '../../components/TopInfoPanel';
import { Box, Button, useMediaQuery, useTheme } from '@mui/material';
import { PageTitle } from '../../components/PageTitle';
import { TopInfoPanelItem } from '../../components/TopInfoPanelItem';
import { useAccountContext } from '../../providers/AccountProvider';
import { FormattedNumber } from '../../components/FormattedNumber';
import { NoData } from '../../components/NoData';
import { NetAPYTooltip } from '../../components/infoTooltips';
import { HealthFactorNumber } from '../../components/HealthFactorNumber';
import { useState } from 'react';
import { useStateContext } from '../../providers/StateProvider';
import { useModalContext } from '../../providers/ModalProvider';
import { normalize, UserIncentiveData, valueToBigNumber } from '@aave/math-utils';
import { FormattedReservesAndIncentives, ReserveToken } from '@lendos/types/reserves';
import { LiquidationRiskParametresInfoModal } from './LiquidationRiskParametresInfoModal';

const DashboardTopPanel = () => {
  const reserves: FormattedReservesAndIncentives<ReserveToken>[] = [];

  const [open, setOpen] = useState(false);

  const { currentMarketData, currentNetworkData } = useStateContext();
  const { account, accountSummary } = useAccountContext();
  const { openClaimRewards } = useModalContext();

  const { data, loading } = accountSummary;

  const { breakpoints } = useTheme();
  const downToSM = useMediaQuery(breakpoints.down('sm'));
  const noDataTypographyVariant = downToSM ? 'secondary16' : 'secondary21';

  const { claimableRewardsUsd } = data
    ? Object.keys(data.calculatedUserIncentives).reduce<{
        claimableRewardsUsd: number;
        assets: string[];
      }>(
        (acc, rewardTokenAddress) => {
          const incentive = data.calculatedUserIncentives[rewardTokenAddress] as UserIncentiveData;

          const rewardBalance = normalize(
            incentive.claimableRewards,
            incentive.rewardTokenDecimals,
          );

          let tokenPrice = 0;
          // getting price from reserves for the native rewards for v2 markets
          if (!currentMarketData.v3 && Number(rewardBalance) > 0) {
            // TODO Check this
            reserves.forEach(reserve => {
              if (reserve.symbol === currentNetworkData.wrappedBaseAssetSymbol) {
                tokenPrice = Number(reserve.priceInUSD);
              }
            });
          } else {
            tokenPrice = Number(incentive.rewardPriceFeed);
          }

          const rewardBalanceUsd = Number(rewardBalance) * tokenPrice;

          if (rewardBalanceUsd > 0) {
            if (!acc.assets.includes(incentive.rewardTokenSymbol)) {
              acc.assets.push(incentive.rewardTokenSymbol);
            }

            acc.claimableRewardsUsd += Number(rewardBalanceUsd);
          }

          return acc;
        },
        { claimableRewardsUsd: 0, assets: [] },
      )
    : { claimableRewardsUsd: 0 };

  const loanToValue =
    data?.totalCollateralMarketReferenceCurrency === '0'
      ? '0'
      : valueToBigNumber(data?.totalBorrowsMarketReferenceCurrency ?? '0')
          .dividedBy(data?.totalCollateralMarketReferenceCurrency ?? '1')
          .toFixed();

  return (
    <>
      <TopInfoPanel
        titleComponent={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PageTitle pageTitle={'Dashboard'} withMarketSwitcher={true} />
          </Box>
        }
      >
        <TopInfoPanelItem title='Net worth' loading={loading} hideIcon>
          {account ? (
            <FormattedNumber
              value={Number(data?.netWorthUSD ?? 0)}
              symbol='USD'
              variant={'numberM'}
              visibleDecimals={2}
              compact
            />
          ) : (
            <NoData variant={noDataTypographyVariant} sx={{ opacity: '0.7', color: 'text.dark' }} />
          )}
        </TopInfoPanelItem>
        <TopInfoPanelItem
          title={
            <div style={{ display: 'flex' }}>
              Net APY
              <NetAPYTooltip />
            </div>
          }
          loading={loading}
          hideIcon
        >
          {account && data && Number(data.netWorthUSD) > 0 ? (
            <FormattedNumber
              value={data.netAPY || 0}
              variant={'numberM'}
              visibleDecimals={2}
              percent
            />
          ) : (
            <NoData variant={noDataTypographyVariant} sx={{ opacity: '0.7', color: 'text.dark' }} />
          )}
        </TopInfoPanelItem>
        {account && data?.healthFactor !== '-1' && (
          <TopInfoPanelItem
            title={<Box sx={{ display: 'inline-flex', alignItems: 'center' }}>Health factor</Box>}
            loading={loading}
            hideIcon
          >
            <HealthFactorNumber
              value={data?.healthFactor ?? '-1'}
              variant={'numberM'}
              onInfoClick={() => {
                setOpen(true);
              }}
            />
          </TopInfoPanelItem>
        )}
        {account && claimableRewardsUsd > 0 && (
          <TopInfoPanelItem title={<>Available rewards</>} loading={loading} hideIcon>
            <Box
              sx={{
                display: 'flex',
                alignItems: { xs: 'flex-start', xsm: 'center' },
                flexDirection: { xs: 'column', xsm: 'row' },
              }}
            >
              <Box sx={{ display: 'inline-flex', alignItems: 'center' }} data-cy={'Claim_Box'}>
                <FormattedNumber
                  value={claimableRewardsUsd}
                  variant={'numberM'}
                  visibleDecimals={2}
                  compact
                  symbol='USD'
                  symbolsColor='#A5A8B6'
                  symbolsVariant={noDataTypographyVariant}
                  data-cy={'Claim_Value'}
                />
              </Box>

              <Button
                variant='white'
                size='small'
                onClick={() => openClaimRewards()}
                sx={{ minWidth: 'unset', ml: { xs: 0, xsm: 2 } }}
                data-cy={'Dashboard_Claim_Button'}
              >
                Claim
              </Button>
            </Box>
          </TopInfoPanelItem>
        )}
      </TopInfoPanel>
      <LiquidationRiskParametresInfoModal
        open={open}
        setOpen={setOpen}
        healthFactor={data?.healthFactor ?? '-1'}
        loanToValue={loanToValue}
        currentLoanToValue={data?.currentLoanToValue ?? '0'}
        currentLiquidationThreshold={data?.currentLiquidationThreshold ?? '0'}
      />
    </>
  );
};

export default DashboardTopPanel;

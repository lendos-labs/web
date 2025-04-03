import { useState } from 'react';

import { normalize, valueToBigNumber } from '@aave/math-utils';
import { Box, Button, useMediaQuery, useTheme } from '@mui/material';
import BigNumber from 'bignumber.js';

import { FormattedNumber } from '../../components/FormattedNumber';
import { HealthFactorNumber } from '../../components/HealthFactorNumber';
import { NoData } from '../../components/NoData';
import { PageTitle } from '../../components/PageTitle';
import { TopInfoPanel } from '../../components/TopInfoPanel';
import { TopInfoPanelItem } from '../../components/TopInfoPanelItem';
import { NetAPYTooltip } from '../../components/infoTooltips';
import { useAccountContext } from '../../providers/AccountProvider';
import { useModalContext } from '../../providers/ModalProvider';
import { useReservesContext } from '../../providers/ReservesProvider';
import { LiquidationRiskParametresInfoModal } from './LiquidationRiskParametresInfoModal';

const DashboardTopPanel = () => {
  const [open, setOpen] = useState(false);

  const { account } = useAccountContext();
  const { accountSummary, loading } = useReservesContext();
  const { openClaimRewards } = useModalContext();

  const { breakpoints } = useTheme();
  const downToSM = useMediaQuery(breakpoints.down('sm'));
  const noDataTypographyVariant = downToSM ? 'secondary16' : 'secondary21';

  const { claimableRewardsUsd } = accountSummary?.calculatedUserIncentives
    ? Object.keys(accountSummary.calculatedUserIncentives).reduce<{
        claimableRewardsUsd: number;
        assets: string[];
      }>(
        (acc, rewardTokenAddress) => {
          const incentive = accountSummary.calculatedUserIncentives[rewardTokenAddress];
          if (!incentive) {
            return { claimableRewardsUsd: 0, assets: [] };
          }

          const rewardBalance = normalize(
            BigNumber(incentive.claimableRewards.toString()),
            incentive.rewardTokenDecimals,
          );

          const tokenPrice = Number(incentive.rewardPriceFeed);
          // getting price from reserves for the native rewards for v2 markets

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
    accountSummary?.totalCollateralMarketReferenceCurrency === '0'
      ? '0'
      : valueToBigNumber(accountSummary?.totalBorrowsMarketReferenceCurrency ?? '0')
          .dividedBy(accountSummary?.totalCollateralMarketReferenceCurrency ?? '1')
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
              value={Number(accountSummary?.netWorthUSD ?? 0)}
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
          {account && accountSummary && Number(accountSummary.netWorthUSD) > 0 ? (
            <FormattedNumber
              value={accountSummary.netAPY || 0}
              variant={'numberM'}
              visibleDecimals={2}
              percent
            />
          ) : (
            <NoData variant={noDataTypographyVariant} sx={{ opacity: '0.7', color: 'text.dark' }} />
          )}
        </TopInfoPanelItem>
        {account && accountSummary?.healthFactor !== '-1' && (
          <TopInfoPanelItem
            title={<Box sx={{ display: 'inline-flex', alignItems: 'center' }}>Health factor</Box>}
            loading={loading}
            hideIcon
          >
            <HealthFactorNumber
              value={accountSummary?.healthFactor ?? '-1'}
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
        healthFactor={accountSummary?.healthFactor ?? '-1'}
        loanToValue={loanToValue}
        currentLoanToValue={accountSummary?.currentLoanToValue ?? '0'}
        currentLiquidationThreshold={accountSummary?.currentLiquidationThreshold ?? '0'}
      />
    </>
  );
};

export default DashboardTopPanel;

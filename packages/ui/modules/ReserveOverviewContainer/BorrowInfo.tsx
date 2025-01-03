import { valueToBigNumber } from '@aave/math-utils';
import { Box, Typography } from '@mui/material';
import { BigNumber } from 'bignumber.js';

import { NetworkConfig } from '@lendos/types/chain';
import { MarketDataType } from '@lendos/types/market';
import { FormattedReservesAndIncentives } from '@lendos/types/reserves';

import { CapsCircularStatus } from '../../components/CapsCircularStatus';
import { FormattedNumber } from '../../components/FormattedNumber';
import { IncentivesButton } from '../../components/IncentivesButton';
import { ReserveSubheader } from '../../components/ReserveSubheader';
import { TextWithTooltip } from '../../components/TextWithTooltip';
import { VariableAPYTooltip } from '../../components/VariableAPYTooltip';
import { AssetCapHookData } from '../../providers/AssetCapsProvider/types';
import { ApyGraphContainer } from './ApyGraphContainer';
import { ReserveFactorOverview } from './ReserveFactorOverview';
import { PanelItem, PanelTitle } from './ReservesPanel';
import { ApyGraphContainerKey } from './types';

interface BorrowInfoProps {
  reserve: FormattedReservesAndIncentives;
  currentMarketData: MarketDataType;
  currentNetworkConfig: NetworkConfig;
  renderCharts: boolean;
  showBorrowCapStatus: boolean;
  borrowCap: AssetCapHookData;
}

export const BorrowInfo = ({
  reserve,
  currentMarketData,
  currentNetworkConfig,
  renderCharts,
  showBorrowCapStatus,
  borrowCap,
}: BorrowInfoProps) => {
  const maxAvailableToBorrow = BigNumber.max(
    valueToBigNumber(reserve.borrowCap).minus(valueToBigNumber(reserve.totalDebt)),
    0,
  ).toNumber();

  const maxAvailableToBorrowUSD = BigNumber.max(
    valueToBigNumber(reserve.borrowCapUSD).minus(valueToBigNumber(reserve.totalDebtUSD)),
    0,
  ).toNumber();

  return (
    <Box sx={{ flexGrow: 1, minWidth: 0, maxWidth: '100%', width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <PanelTitle>Borrow info</PanelTitle>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 6, sm: 0 },
          }}
        >
          {showBorrowCapStatus ? (
            // With a borrow cap
            <>
              <CapsCircularStatus
                value={borrowCap.percentUsed}
                tooltipContent={
                  <>
                    Maximum amount available to borrow is{' '}
                    <FormattedNumber value={maxAvailableToBorrow} variant='secondary12' />{' '}
                    {reserve.symbol} (
                    <FormattedNumber
                      value={maxAvailableToBorrowUSD}
                      variant='secondary12'
                      symbol='USD'
                    />
                    ).
                  </>
                }
              />
              <PanelItem
                title={
                  <Box display='flex' alignItems='center'>
                    <Typography component='h3' color='text.dark' variant='h3'>
                      Total borrowed
                    </Typography>
                    <TextWithTooltip>
                      Borrowing of this asset is limited to a certain amount to minimize liquidity
                      pool insolvency.
                    </TextWithTooltip>
                  </Box>
                }
              >
                <Box>
                  <FormattedNumber value={reserve.totalDebt} variant='numberM' />
                  <Typography
                    component='span'
                    variant='numberM'
                    sx={{ display: 'inline-block', mx: 1 }}
                  >
                    of
                  </Typography>
                  <FormattedNumber value={reserve.borrowCap} variant='numberM' />
                </Box>
                <Box>
                  <ReserveSubheader value={reserve.totalDebtUSD} />
                  <Typography
                    component='span'
                    color='text.primary'
                    variant='numberS'
                    sx={{ display: 'inline-block', mx: 1 }}
                  >
                    of
                  </Typography>
                  <ReserveSubheader value={reserve.borrowCapUSD} />
                </Box>
              </PanelItem>
            </>
          ) : (
            // Without a borrow cap
            <PanelItem
              title={
                <Box display='flex' alignItems='center'>
                  <Typography variant='h3'>Total borrowed</Typography>
                </Box>
              }
            >
              <FormattedNumber value={reserve.totalDebt} variant='numberM' />
              <ReserveSubheader value={reserve.totalDebtUSD} />
            </PanelItem>
          )}
          <PanelItem
            title={
              <VariableAPYTooltip text='APY, variable' key='APY_res_variable_type' variant='h3' />
            }
          >
            <FormattedNumber value={reserve.variableBorrowAPY} percent variant='numberM' />
            <IncentivesButton
              symbol={reserve.symbol}
              incentives={reserve.vIncentivesData}
              displayBlank={true}
            />
          </PanelItem>
          {reserve.borrowCapUSD && reserve.borrowCapUSD !== '0' && (
            <PanelItem title={<Typography variant='h3'>Borrow cap</Typography>}>
              <FormattedNumber value={reserve.borrowCap} variant='numberM' />
              <ReserveSubheader value={reserve.borrowCapUSD} />
            </PanelItem>
          )}
        </Box>
      </Box>
      {renderCharts && (
        <ApyGraphContainer
          graphKey={ApyGraphContainerKey.borrow}
          reserve={reserve}
          currentMarketData={currentMarketData}
        />
      )}
      {currentMarketData.addresses.COLLECTOR && (
        <>
          <Box
            sx={{ display: 'inline-flex', alignItems: 'center', pt: '42px', pb: '12px' }}
            paddingTop={'42px'}
          >
            <Typography variant='subheader1' color='text.main'>
              Collector Info
            </Typography>
          </Box>

          <ReserveFactorOverview
            collectorContract={currentMarketData.addresses.COLLECTOR}
            explorerLinkBuilder={currentNetworkConfig.explorerLinkBuilder}
            reserveFactor={reserve.reserveFactor}
          />
        </>
      )}
    </Box>
  );
};

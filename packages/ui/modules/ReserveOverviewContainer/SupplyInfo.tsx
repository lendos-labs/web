import { valueToBigNumber } from '@aave/math-utils';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { Box, Typography } from '@mui/material';

import { MarketDataType } from '@lendos/types/market';
import { FormattedReservesAndIncentives } from '@lendos/types/reserves';

import { CapsCircularStatus } from '../../components/CapsCircularStatus';
import { FormattedNumber } from '../../components/FormattedNumber';
import { IncentivesButton } from '../../components/IncentivesButton';
import { ReserveSubheader } from '../../components/ReserveSubheader';
import { TextWithTooltip } from '../../components/TextWithTooltip';
import { Warning } from '../../components/Warning';
import { AssetCapHookData } from '../../providers/AssetCapsProvider/types';
import { ApyGraphContainer } from './ApyGraphContainer';
import { DebtCeilingStatus } from './DebtCeilingStatus';
import { LiquidationPenaltyTooltip } from './LiquidationPenaltyTooltip';
import { LiquidationThresholdTooltip } from './LiquidationThresholdTooltip';
import { MaxLTVTooltip } from './MaxLTVTooltip';
import { ReserveOverviewBox } from './ReserveOverviewBox';
import { PanelItem, PanelTitle } from './ReservesPanel';
import { ApyGraphContainerKey } from './types';

interface SupplyInfoProps {
  reserve: FormattedReservesAndIncentives;
  currentMarketData: MarketDataType;
  renderCharts: boolean;
  showSupplyCapStatus: boolean;
  supplyCap: AssetCapHookData;
  debtCeiling: AssetCapHookData;
}

export const SupplyInfo = ({
  reserve,
  currentMarketData,
  renderCharts,
  showSupplyCapStatus,
  supplyCap,
  debtCeiling,
}: SupplyInfoProps) => {
  return (
    <Box sx={{ flexGrow: 1, minWidth: 0, maxWidth: '100%', width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <PanelTitle>Supply Info</PanelTitle>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 6, sm: 0 },
          }}
        >
          {showSupplyCapStatus ? (
            <>
              <CapsCircularStatus
                value={supplyCap.percentUsed}
                tooltipContent={
                  <>
                    Maximum amount available to supply is{' '}
                    <FormattedNumber
                      value={
                        valueToBigNumber(reserve.supplyCap).toNumber() -
                        valueToBigNumber(reserve.totalLiquidity).toNumber()
                      }
                      variant='secondary12'
                    />
                    {reserve.symbol} (
                    <FormattedNumber
                      value={
                        valueToBigNumber(reserve.supplyCapUSD).toNumber() -
                        valueToBigNumber(reserve.totalLiquidityUSD).toNumber()
                      }
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
                      Total supplied
                    </Typography>
                    <TextWithTooltip>
                      Asset supply is limited to a certain amount to reduce protocol exposure to the
                      asset and to help manage risks involved.
                    </TextWithTooltip>
                  </Box>
                }
              >
                <Box>
                  <FormattedNumber value={reserve.totalLiquidity} variant='numberM' compact />
                  <Typography
                    component='span'
                    color='text.dark'
                    variant='numberM'
                    sx={{ display: 'inline-block', mx: 1 }}
                  >
                    of
                  </Typography>
                  <FormattedNumber value={reserve.supplyCap} variant='numberM' />
                </Box>
                <Box>
                  <ReserveSubheader value={reserve.totalLiquidityUSD} />
                  <Typography
                    component='span'
                    color='primary'
                    variant='numberS'
                    sx={{ display: 'inline-block', mx: 1 }}
                  >
                    of
                  </Typography>
                  <ReserveSubheader value={reserve.supplyCapUSD} />
                </Box>
              </PanelItem>
            </>
          ) : (
            // Without supply cap
            <PanelItem
              title={
                <Box display='flex' alignItems='center'>
                  <Typography color='text.dark' variant='h3'>
                    Total supplied
                  </Typography>
                </Box>
              }
            >
              <FormattedNumber value={reserve.totalLiquidity} variant='numberM' compact />
              <ReserveSubheader value={reserve.totalLiquidityUSD} />
            </PanelItem>
          )}
          <PanelItem
            title={
              <Typography component='span' variant='h3' sx={{ display: 'inline-block', mx: 1 }}>
                APY
              </Typography>
            }
          >
            <FormattedNumber value={reserve.supplyAPY} percent variant='numberM' />
            <IncentivesButton
              symbol={reserve.symbol}
              incentives={reserve.aIncentivesData}
              displayBlank={true}
            />
          </PanelItem>
          {reserve.unbacked && reserve.unbacked !== '0' && (
            <PanelItem
              title={
                <Typography component='span' variant='h3' sx={{ display: 'inline-block', mx: 1 }}>
                  Unbacked
                </Typography>
              }
            >
              <FormattedNumber value={reserve.unbacked} variant='numberM' symbol={reserve.name} />
              <ReserveSubheader value={reserve.unbackedUSD} />
            </PanelItem>
          )}
        </Box>
      </Box>
      {renderCharts && (reserve.borrowingEnabled || Number(reserve.totalDebt) > 0) && (
        <ApyGraphContainer
          graphKey={ApyGraphContainerKey.supply}
          reserve={reserve}
          currentMarketData={currentMarketData}
        />
      )}
      <div>
        {reserve.isIsolated ? (
          <Box sx={{ pt: '42px', pb: '12px' }}>
            <Typography variant='subheader1' color='text.main' paddingBottom={'12px'}>
              Collateral usage
            </Typography>
            <Warning severity='warning'>
              <Typography variant='subheader1'>
                Asset can only be used as collateral in isolation mode only.
              </Typography>
              <Typography variant='caption'>
                In Isolation mode you cannot supply other assets as collateral for borrowing. Assets
                used as collateral in Isolation mode can only be borrowed to a specific debt
                ceiling.{' '}
              </Typography>
            </Warning>
          </Box>
        ) : (
          <>
            {reserve.reserveLiquidationThreshold !== '0' ? (
              <Box
                sx={{ display: 'inline-flex', alignItems: 'center', pt: '42px', pb: '12px' }}
                paddingTop={'42px'}
              >
                <Typography variant='buttonS' color='text.main'>
                  Collateral usage
                </Typography>
                <CheckRoundedIcon fontSize='small' sx={{ ml: 2, color: "'text.primary'" }} />
                <Typography variant='buttonS' color={'text.primary'}>
                  Can be collateral
                </Typography>
              </Box>
            ) : (
              <Box sx={{ pt: '42px', pb: '12px' }}>
                <Typography variant='buttonS' color='text.main'>
                  Collateral usage
                </Typography>
                <Warning sx={{ my: '12px' }} severity='warning'>
                  Asset cannot be used as collateral.
                </Warning>
              </Box>
            )}
          </>
        )}
      </div>
      {reserve.reserveLiquidationThreshold !== '0' && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          <ReserveOverviewBox
            title={
              <MaxLTVTooltip
                variant='description'
                text={
                  <Typography variant='h3' component='span'>
                    Max LTV
                  </Typography>
                }
              />
            }
          >
            <FormattedNumber
              value={reserve.formattedBaseLTVasCollateral}
              percent
              variant='numberS'
              visibleDecimals={2}
            />
          </ReserveOverviewBox>

          <ReserveOverviewBox
            title={
              <LiquidationThresholdTooltip
                variant='description'
                text={
                  <Typography variant='h3' component='span'>
                    Liquidation threshold
                  </Typography>
                }
              />
            }
          >
            <FormattedNumber
              value={reserve.formattedReserveLiquidationThreshold}
              percent
              variant='numberS'
              visibleDecimals={2}
            />
          </ReserveOverviewBox>

          <ReserveOverviewBox
            title={
              <LiquidationPenaltyTooltip
                variant='description'
                text={
                  <Typography variant='h3' component='span'>
                    Liquidation penalty
                  </Typography>
                }
              />
            }
          >
            <FormattedNumber
              value={reserve.formattedReserveLiquidationBonus}
              percent
              variant='numberS'
              visibleDecimals={2}
            />
          </ReserveOverviewBox>

          {reserve.isIsolated && (
            <ReserveOverviewBox fullWidth>
              <DebtCeilingStatus
                debt={reserve.isolationModeTotalDebtUSD}
                ceiling={reserve.debtCeilingUSD}
                usageData={debtCeiling}
              />
            </ReserveOverviewBox>
          )}
        </Box>
      )}
    </Box>
  );
};

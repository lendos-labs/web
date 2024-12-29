import { FormattedReservesAndIncentives } from '@lendos/types/reserves';
import { Box, Divider } from '@mui/material';
import { Warning } from '../../components/Warning';
import { PanelRow } from './ReservesPanel';
import { SupplyInfo } from './SupplyInfo';
import { useAssetCaps } from '../../providers/AssetCapsProvider';
import { useStateContext } from '../../providers/StateProvider';
import { BorrowInfo } from './BorrowInfo';

interface ReserveConfigurationProps {
  reserve: FormattedReservesAndIncentives;
}

export const ReserveConfiguration = ({ reserve }: ReserveConfigurationProps) => {
  const { currentNetworkData, currentMarketData } = useStateContext();

  const renderCharts = !!currentNetworkData.ratesHistoryApiUrl && !currentMarketData.disableCharts;
  const { supplyCap, borrowCap, debtCeiling } = useAssetCaps();
  const showSupplyCapStatus: boolean = reserve.supplyCap !== '0';
  const showBorrowCapStatus: boolean = reserve.borrowCap !== '0';

  return (
    <>
      <Box>
        {reserve.isPaused && (
          <Warning sx={{ mt: '16px', mb: '40px' }} severity='error'>
            This asset has been paused due to a community decision. Supply, withdraw, borrows and
            repays are impacted.
          </Warning>
        )}
      </Box>
      <PanelRow>
        <SupplyInfo
          reserve={reserve}
          currentMarketData={currentMarketData}
          renderCharts={renderCharts}
          showSupplyCapStatus={showSupplyCapStatus}
          supplyCap={supplyCap}
          debtCeiling={debtCeiling}
        />
      </PanelRow>

      {(reserve.borrowingEnabled || Number(reserve.totalDebt) > 0) && (
        <>
          <Divider
            sx={{ my: { xs: 6, sm: 10 }, borderColor: theme => theme.palette.border.grey }}
          />
          <PanelRow>
            <Box sx={{ flexGrow: 1, minWidth: 0, maxWidth: '100%', width: '100%' }}>
              <BorrowInfo
                reserve={reserve}
                currentMarketData={currentMarketData}
                currentNetworkConfig={currentNetworkData}
                renderCharts={renderCharts}
                showBorrowCapStatus={showBorrowCapStatus}
                borrowCap={borrowCap}
              />
            </Box>
          </PanelRow>
        </>
      )}
    </>
  );
};

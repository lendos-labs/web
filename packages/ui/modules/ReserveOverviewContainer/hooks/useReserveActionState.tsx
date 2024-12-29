import { FormattedReservesAndIncentives } from '@lendos/types/reserves';
import { Stack } from '@mui/material';
import { useReservesContext } from '../../../providers/ReservesProvider';
import { useAssetCaps } from '../../../providers/AssetCapsProvider';
import { useStateContext } from '../../../providers/StateProvider';
import { assetCanBeBorrowedByUser } from '@lendos/constants/getMaxAmountAvailableToBorrow';
import { WalletEmptyInfo } from '../../../components/WalletEmptyInfo';
import { Warning } from '../../../components/Warning';
import { Link } from '../../../components/Link';
import { Routes } from '@lendos/constants/routes';

interface ReserveActionStateProps {
  balance: string;
  maxAmountToSupply: string;
  maxAmountToBorrow: string;
  reserve: FormattedReservesAndIncentives;
}

export const useReserveActionState = ({
  balance,
  maxAmountToSupply,
  maxAmountToBorrow,
  reserve,
}: ReserveActionStateProps) => {
  const { accountSummary, eModes } = useReservesContext();
  const { supplyCap, borrowCap, debtCeiling } = useAssetCaps();
  const { currentNetworkData } = useStateContext();

  const { name: networkName } = currentNetworkData;

  const assetCanBeBorrowedFromPool = accountSummary
    ? assetCanBeBorrowedByUser(reserve, accountSummary)
    : false;
  const userHasNoCollateralSupplied =
    accountSummary?.totalCollateralMarketReferenceCurrency === '0';

  const isolationModeBorrowDisabled = Boolean(
    accountSummary?.isInIsolationMode && !reserve.borrowableInIsolation,
  );
  const eModeBorrowDisabled = Boolean(
    accountSummary?.isInEmode && reserve.eModeCategoryId !== accountSummary.userEmodeCategoryId,
  );

  return {
    disableSupplyButton: balance === '0' || maxAmountToSupply === '0',
    disableBorrowButton:
      !assetCanBeBorrowedFromPool ||
      userHasNoCollateralSupplied ||
      isolationModeBorrowDisabled ||
      eModeBorrowDisabled ||
      maxAmountToBorrow === '0',
    alerts: (
      <Stack gap={3}>
        {balance === '0' && <WalletEmptyInfo sx={{ mb: 0 }} name={networkName} icon={false} />}

        {balance !== '0' && accountSummary?.totalCollateralMarketReferenceCurrency === '0' && (
          <Warning sx={{ mb: 0 }} severity='info' icon={false}>
            To borrow you need to supply any asset to be used as collateral.
          </Warning>
        )}

        {isolationModeBorrowDisabled && (
          <Warning sx={{ mb: 0 }} severity='warning' icon={false}>
            Collateral usage is limited because of Isolation mode.
          </Warning>
        )}

        {eModeBorrowDisabled && isolationModeBorrowDisabled && (
          <Warning sx={{ mb: 0 }} severity='info' icon={false}>
            <>
              Borrowing is unavailable because you’ve enabled Efficiency Mode (E-Mode) and Isolation
              mode. To manage E-Mode and Isolation mode visit your{' '}
              <Link href={Routes.dashboard}>Dashboard</Link>.
            </>
          </Warning>
        )}

        {eModeBorrowDisabled && !isolationModeBorrowDisabled && (
          <Warning sx={{ mb: 0 }} severity='info' icon={false}>
            <>
              Borrowing is unavailable because you’ve enabled Efficiency Mode (E-Mode) for{' '}
              {accountSummary?.userEmodeCategoryId
                ? eModes[accountSummary.userEmodeCategoryId]?.label
                : 'Disabled'}{' '}
              category. To manage E-Mode categories visit your{' '}
              <Link href={Routes.dashboard}>Dashboard</Link>.
            </>
          </Warning>
        )}

        {!eModeBorrowDisabled && isolationModeBorrowDisabled && (
          <Warning sx={{ mb: 0 }} severity='info' icon={false}>
            <>
              Borrowing is unavailable because you’re using Isolation mode. To manage Isolation mode
              visit your <Link href={Routes.dashboard}>Dashboard</Link>.
            </>
          </Warning>
        )}

        {maxAmountToSupply === '0' &&
          supplyCap.determineWarningDisplay({ supplyCap, icon: false, sx: { mb: 0 } })}
        {maxAmountToBorrow === '0' &&
          borrowCap.determineWarningDisplay({ borrowCap, icon: false, sx: { mb: 0 } })}
        {reserve.isIsolated &&
          balance !== '0' &&
          accountSummary?.totalCollateralUSD !== '0' &&
          debtCeiling.determineWarningDisplay({ debtCeiling, icon: false, sx: { mb: 0 } })}
      </Stack>
    ),
  };
};

import { FormattedReservesAndIncentives } from '@lendos/types/reserves';
import { AssetCapsProvider } from '../../providers/AssetCapsProvider';
import { ReserveTopDetailsWrapper } from './ReserveTopDetailsWrapper';

export const ReserveOverviewContainer = ({
  reserve,
  loading,
}: {
  reserve: FormattedReservesAndIncentives;
  loading: boolean;
}) => {
  return (
    <AssetCapsProvider asset={reserve}>
      <ReserveTopDetailsWrapper reserve={reserve} loading={loading} />
    </AssetCapsProvider>
  );
};

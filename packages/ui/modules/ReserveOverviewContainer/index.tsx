import { FormattedReservesAndIncentives } from '@lendos/types/reserves';
import { AssetCapsProvider } from '../../providers/AssetCapsProvider';

export const ReserveOverviewContainer = ({
  reserve,
}: {
  reserve: FormattedReservesAndIncentives;
}) => {
  return (
    <AssetCapsProvider asset={reserve}>
      <ReserveTopDetailsWrapper reserve={reserve} loading={loading} />
    </AssetCapsProvider>
  );
};

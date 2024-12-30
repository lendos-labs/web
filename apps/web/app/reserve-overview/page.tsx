import React from 'react';
import { ReserveOverviewContainer } from '@lendos/ui/modules/ReserveOverviewContainer';
import { reserves } from '@lendos/constants/reserves';
import { FormattedReservesAndIncentives, ReserveToken } from '@lendos/types/reserves';

const ReserveOverview = () => {
  return (
    <ReserveOverviewContainer
      loading={false}
      reserve={reserves[0] as unknown as FormattedReservesAndIncentives<ReserveToken>}
    />
  );
};

export default ReserveOverview;

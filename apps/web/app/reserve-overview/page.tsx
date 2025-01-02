'use client';

import React from 'react';
import { ReserveOverviewContainer } from '@lendos/ui/modules/ReserveOverviewContainer';
import { FormattedReservesAndIncentives, ReserveToken } from '@lendos/types/reserves';
import { useReservesContext } from '@lendos/ui/providers/ReservesProvider';
import { useSearchParams } from 'next/navigation';

const ReserveOverview = () => {
  const paramas = useSearchParams();
  const { reserves, lpReserves } = useReservesContext();
  const underlyingAsset = paramas.getAll('underlyingAsset')[0];

  if (!underlyingAsset) {
    return null;
  }

  const reserve = [...reserves, ...lpReserves].find(
    reserve => reserve.underlyingAsset === underlyingAsset,
  );

  if (!reserve) {
    return null;
  }

  return (
    <ReserveOverviewContainer
      loading={false}
      reserve={reserve as unknown as FormattedReservesAndIncentives<ReserveToken>}
    />
  );
};

export default ReserveOverview;

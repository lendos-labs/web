'use client';

import { MarketAssetsListContainer } from '@lendos/ui/modules/ MarketAssetsListContainer';
import { useReservesContext } from '@lendos/ui/providers/ReservesProvider';

const Markets = () => {
  const { reserves, loading } = useReservesContext();
  return <MarketAssetsListContainer reserves={reserves} loading={loading} />;
};

export default Markets;

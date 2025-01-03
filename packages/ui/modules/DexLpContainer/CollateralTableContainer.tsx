import { useMemo } from 'react';

import { Filters, UserPoolData } from '@lendos/types/dexLp';
import { EXPOSURE } from '@lendos/types/reserves';

import { CustomTable, TableData } from '../../components/Table';
import { useModalContext } from '../../providers/ModalProvider';
import { collateralCollapsibleHeader, collateralHeader, getCollateralCells } from './TableData.tsx';

interface CollateralTableContainerProps {
  userLpReserves: UserPoolData[];
  filters: Record<Filters, string>;
}

export const CollateralTableContainer = ({
  userLpReserves,
  filters,
}: CollateralTableContainerProps) => {
  const { openSupply, openWithdraw } = useModalContext();

  const data = useMemo(() => {
    const { token, type, search } = filters;

    let res = userLpReserves
      .filter(i => {
        if (search) {
          return `${i.token0}/${i.token1}`.toLowerCase().includes(search.toLowerCase());
        } else if (token) {
          return `${i.token0}/${i.token1}`.toLowerCase().includes(token.toLowerCase());
        }
        return true;
      })
      .map(i => {
        if (!type) {
          return { ...i };
        }
        return { ...i, data: i.data.filter(d => d.reserve.exposure === (type as EXPOSURE)) };
      });

    if (type) {
      res = res
        .map(i => {
          return { ...i, data: i.data.filter(d => d.reserve.exposure === (type as EXPOSURE)) };
        })
        .filter(i => i.data.length);
    }

    return res.map(i =>
      getCollateralCells({
        pool: i,
        openSupply,
        openWithdraw,
      }),
    ) as TableData[];
  }, [filters, userLpReserves, openSupply, openWithdraw]);

  return (
    <CustomTable
      header={collateralHeader}
      collapsibleHeader={collateralCollapsibleHeader}
      data={data}
    />
  );
};

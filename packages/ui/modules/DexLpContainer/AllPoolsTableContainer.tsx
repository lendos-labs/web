import { useMemo } from 'react';

import { Filters, PoolData } from '@lendos/types/dexLp';
import { EXPOSURE } from '@lendos/types/reserves';

import { CustomTable, TableData } from '../../components/Table';
import { useAccountContext } from '../../providers/AccountProvider';
import { useModalContext } from '../../providers/ModalProvider';
import { allPoolCollapsibleHeader, allPoolHeader, getAllPoolsCells } from './TableData.tsx';

interface AllPoolsTableContainerProps {
  lpReserves: PoolData[];
  filters: Record<Filters, string>;
}

export const AllPoolsTableContainer = ({ lpReserves, filters }: AllPoolsTableContainerProps) => {
  const { openSupply, openWithdraw } = useModalContext();
  const { account } = useAccountContext();

  const data = useMemo(() => {
    const { token, type, search } = filters;

    let res = lpReserves
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
        return { ...i, data: i.data.filter(d => d.exposure === (type as EXPOSURE)) };
      });

    if (type) {
      res = res
        .map(i => {
          return { ...i, data: i.data.filter(d => d.exposure === (type as EXPOSURE)) };
        })
        .filter(i => i.data.length);
    }

    return res.map(i =>
      getAllPoolsCells({ pool: i, currentAccount: account, openSupply, openWithdraw }),
    ) as TableData[];
  }, [filters, lpReserves, account, openSupply, openWithdraw]);

  return (
    <CustomTable header={allPoolHeader} collapsibleHeader={allPoolCollapsibleHeader} data={data} />
  );
};

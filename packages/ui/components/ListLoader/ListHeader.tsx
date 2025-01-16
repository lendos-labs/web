import { ReactNode } from 'react';

import { ListButtonsColumn } from '../../modules/DashboardContainer/ListButtonsColumn';
import { ListColumn } from '../ListColumn';
import { ListHeaderTitle } from '../ListHeaderTitle';
import { ListHeaderWrapper, ListHeaderWrapperProps } from '../ListHeaderWrapper';

// import { ListColumn } from '../../../components/lists/ListColumn';
// import { ListHeaderTitle } from '../../../components/lists/ListHeaderTitle';
// import {
//   ListHeaderWrapper,
//   ListHeaderWrapperProps,
// } from '../../../components/lists/ListHeaderWrapper';
// import { ListButtonsColumn } from './ListButtonsColumn';

interface ListHeaderProps {
  head: ReactNode[];
  mx?: ListHeaderWrapperProps['mx'];
}

export const ListHeader = ({ head, mx }: ListHeaderProps) => {
  return (
    <ListHeaderWrapper mx={mx}>
      {head.map((title, i) => (
        <ListColumn overFlow={'visible'} key={i} isRow={i === 0}>
          <ListHeaderTitle>{title}</ListHeaderTitle>
        </ListColumn>
      ))}

      <ListButtonsColumn />
    </ListHeaderWrapper>
  );
};

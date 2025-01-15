import { Box, Skeleton } from '@mui/material';

import { ListButtonsColumn } from '../../modules/DashboardContainer/ListButtonsColumn';
import { ListColumn } from '../ListColumn';
import { ListItem } from '../ListItem';

interface ListItemLoaderProps {
  mx?: number;
}
export const ListItemLoader = ({ mx }: ListItemLoaderProps) => {
  return (
    <ListItem mx={mx}>
      <ListColumn maxWidth={160} isRow>
        <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
          <Skeleton variant='circular' width={32} height={32} />
          <Skeleton sx={{ ml: 3 }} width={39} height={20} />
        </Box>
      </ListColumn>

      <ListColumn>
        <Skeleton width={70} height={20} />
      </ListColumn>

      <ListColumn>
        <Skeleton width={70} height={20} />
      </ListColumn>

      <ListColumn>
        <Skeleton width={70} height={20} />
      </ListColumn>

      <ListButtonsColumn>
        <Skeleton height={38} width={74} />
        <Skeleton height={38} width={74} sx={{ ml: '6px' }} />
      </ListButtonsColumn>
    </ListItem>
  );
};

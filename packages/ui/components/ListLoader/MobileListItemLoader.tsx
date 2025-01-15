import { Box, Skeleton } from '@mui/material';

import { ListMobileItemWrapper } from '../ListMobileItemWrapper';
import { Row } from '../Row';

export const MobileListItemLoader = () => {
  return (
    <ListMobileItemWrapper loading>
      <Row
        caption={<Skeleton width={100} height={20} />}
        align='flex-start'
        captionVariant='description'
        mb={2}
      >
        <Skeleton width={70} height={20} />
      </Row>

      <Row
        caption={<Skeleton width={100} height={20} />}
        align='flex-start'
        captionVariant='description'
        mb={2}
      >
        <Skeleton width={70} height={20} />
      </Row>

      <Row
        caption={<Skeleton width={100} height={20} />}
        align='flex-start'
        captionVariant='description'
        mb={2}
      >
        <Skeleton width={70} height={20} />
      </Row>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 5 }}>
        <Skeleton width='100%' height={36} sx={{ mr: 1.5 }} />
        <Skeleton width='100%' height={36} />
      </Box>
    </ListMobileItemWrapper>
  );
};

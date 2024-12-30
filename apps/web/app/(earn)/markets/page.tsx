import { reserves } from '@lendos/constants/reserves';
import { MarketAssetsListContainer } from '@lendos/ui/modules/ MarketAssetsListContainer';

const Markets = () => {
  return <MarketAssetsListContainer reserves={reserves} loading={false} />;
};

export default Markets;

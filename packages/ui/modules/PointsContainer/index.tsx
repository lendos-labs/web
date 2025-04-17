import { ConnectWalletPaper } from '../../components/ConnectWalletPaper';
import { ContentContainer } from '../../components/ContentContainer';
import { useAccountContext } from '../../providers/AccountProvider';
import { PointsAndLink } from './PointsAndLink.tsx';
import { PointsContent } from './PointsContent.tsx';
import { PointsTopPannel } from './PointsTopPannel.tsx';

const PointsContainer = () => {
  const { account, loading } = useAccountContext();
  return (
    <>
      <PointsTopPannel />
      <ContentContainer>
        {account ? (
          <>
            <PointsAndLink />
            <PointsContent />
          </>
        ) : (
          <ConnectWalletPaper loading={loading} />
        )}
      </ContentContainer>
    </>
  );
};

export default PointsContainer;

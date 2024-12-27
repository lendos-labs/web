'use client';

import { useAccountContext } from '../../providers/AccountProvider';
import { GovernanceTopPanel } from './GovernanceTopPanel.tsx';
import { ContentContainer } from '../../components/ContentContainer';
import { ConnectWalletPaper } from '../../components/ConnectWalletPaper';
import { ProposalsV3List } from './ProposalsV3List.tsx';

export default function GovernanceContainer() {
  const { account, loading } = useAccountContext();

  return (
    <>
      <GovernanceTopPanel />

      <ContentContainer>
        {account ? <ProposalsV3List /> : <ConnectWalletPaper loading={loading} />}
      </ContentContainer>
    </>
  );
}

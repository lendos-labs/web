'use client';

import { ConnectWalletPaper } from '../../components/ConnectWalletPaper';
import { ContentContainer } from '../../components/ContentContainer';
import { useAccountContext } from '../../providers/AccountProvider';
import { GovernanceTopPanel } from './GovernanceTopPanel.tsx';
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

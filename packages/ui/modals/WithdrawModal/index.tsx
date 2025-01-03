import { ModalType, useModalContext } from '../../providers/ModalProvider';
import { useState } from 'react';
import { BasicModal } from '../../components/BasicModal';
import { ModalWrapper } from '../../components/ModalWrapper';
import { UserAuthenticated } from '../../components/UserAuthenticated';
import { WithdrawModalContent } from './WithdrawModalContent.tsx';

export const WithdrawModal = () => {
  const { type, close, args } = useModalContext();
  const [withdrawUnWrapped, setWithdrawUnWrapped] = useState(false);

  const handleClose = () => {
    close();
  };

  return (
    <BasicModal open={type === ModalType.Withdraw} setOpen={handleClose}>
      <ModalWrapper
        title='Withdraw'
        underlyingAsset={args.underlyingAsset ?? ''}
        keepWrappedSymbol={!withdrawUnWrapped}
      >
        {params => (
          <UserAuthenticated>
            {user => (
              <WithdrawModalContent
                {...params}
                unwrap={withdrawUnWrapped}
                setUnwrap={setWithdrawUnWrapped}
                user={user}
              />
            )}
          </UserAuthenticated>
        )}
      </ModalWrapper>
    </BasicModal>
  );
};

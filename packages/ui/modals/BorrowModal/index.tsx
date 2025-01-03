import { ModalType, useModalContext } from '../../providers/ModalProvider';
import { useState } from 'react';
import { BasicModal } from '../../components/BasicModal';
import { ModalWrapper } from '../../components/ModalWrapper';
import { UserAuthenticated } from '../../components/UserAuthenticated';
import { BorrowModalContent } from './BorrowModalContent.tsx';

export const BorrowModal = () => {
  const { type, close, args } = useModalContext();
  const [borrowUnWrapped, setBorrowUnWrapped] = useState(true);

  const handleBorrowUnwrapped = (borrowUnWrapped: boolean) => {
    setBorrowUnWrapped(borrowUnWrapped);
  };

  return (
    <BasicModal open={type === ModalType.Borrow} setOpen={close}>
      <ModalWrapper
        action='borrow'
        title='Borrow'
        underlyingAsset={args.underlyingAsset ?? ''}
        keepWrappedSymbol={!borrowUnWrapped}
      >
        {params => (
          <UserAuthenticated>
            {user => (
              <BorrowModalContent
                {...params}
                user={user}
                unwrap={borrowUnWrapped}
                setUnwrap={handleBorrowUnwrapped}
              />
            )}
          </UserAuthenticated>
        )}
      </ModalWrapper>
    </BasicModal>
  );
};

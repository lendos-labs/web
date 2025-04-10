import { BasicModal } from '../../components/BasicModal';
import { ModalWrapper } from '../../components/ModalWrapper';
import { UserAuthenticated } from '../../components/UserAuthenticated';
import { ModalType, useModalContext } from '../../providers/ModalProvider';
import { WithdrawModalContent } from './WithdrawModalContent.tsx';

export const WithdrawModal = () => {
  const { type, close, args } = useModalContext();

  const handleClose = () => {
    close();
  };

  return (
    <BasicModal open={type === ModalType.Withdraw} setOpen={handleClose}>
      <ModalWrapper title='Withdraw' underlyingAsset={args.underlyingAsset ?? ''}>
        {params => (
          <UserAuthenticated>
            {user => <WithdrawModalContent {...params} user={user} />}
          </UserAuthenticated>
        )}
      </ModalWrapper>
    </BasicModal>
  );
};

import { BasicModal } from '../../components/BasicModal';
import { ModalWrapper } from '../../components/ModalWrapper';
import { UserAuthenticated } from '../../components/UserAuthenticated';
import { ModalType, useModalContext } from '../../providers/ModalProvider';
import { CollateralChangeModalContent } from './CollateralChangeModalContent.tsx';

export const CollateralChangeModal = () => {
  const { type, close, args } = useModalContext();

  if (!args.underlyingAsset) {
    return null;
  }

  return (
    <BasicModal open={type === ModalType.CollateralChange} setOpen={close}>
      <ModalWrapper title='Review tx' underlyingAsset={args.underlyingAsset}>
        {params => (
          <UserAuthenticated>
            {user => <CollateralChangeModalContent {...params} user={user} />}
          </UserAuthenticated>
        )}
      </ModalWrapper>
    </BasicModal>
  );
};

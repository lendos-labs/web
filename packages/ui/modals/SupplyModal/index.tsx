import { ModalType, useModalContext } from '../../providers/ModalProvider';
import { BasicModal } from '../../components/BasicModal';
import { ModalWrapper } from '../../components/ModalWrapper';
import { UserAuthenticated } from '../../components/UserAuthenticated';
import { SupplyModalContentWrapper } from './SupplyModalContentWrapper';

export const SupplyModal = () => {
  const { type, close, args } = useModalContext();

  if (!args.underlyingAsset) {
    return null;
  }

  return (
    <BasicModal open={type === ModalType.Supply} setOpen={close}>
      <ModalWrapper action='supply' title='Supply' underlyingAsset={args.underlyingAsset}>
        {params => (
          <UserAuthenticated>
            {user => <SupplyModalContentWrapper {...params} user={user} />}
          </UserAuthenticated>
        )}
      </ModalWrapper>
    </BasicModal>
  );
};

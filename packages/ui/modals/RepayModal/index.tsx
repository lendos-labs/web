import { ModalType, useModalContext } from '../../providers/ModalProvider';
import { BasicModal } from '../../components/BasicModal';
import { ModalWrapper } from '../../components/ModalWrapper';
import { UserAuthenticated } from '../../components/UserAuthenticated';
import { RepayModalContent } from './RepayModalContent.tsx';

export const RepayModal = () => {
  const { type, close, args } = useModalContext();

  const handleClose = () => {
    close();
  };

  return (
    <BasicModal open={type === ModalType.Repay} setOpen={handleClose}>
      <ModalWrapper title='Repay' underlyingAsset={args.underlyingAsset ?? ''}>
        {params => {
          return (
            <UserAuthenticated>
              {user => {
                if (!args.currentRateMode) {
                  return null;
                }
                return (
                  <RepayModalContent {...params} debtType={args.currentRateMode} user={user} />
                );
              }}
            </UserAuthenticated>
          );
        }}
      </ModalWrapper>
    </BasicModal>
  );
};

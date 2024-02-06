import { Modal } from '@/components/commons/ui-modal/Modal';

type AddDashboardModalProps = {
  isOpen: boolean;
};

export default function AddDashboardModal({ isOpen }: AddDashboardModalProps) {
  return (
    <Modal isOpen={isOpen}>
      <h1>하이</h1>
    </Modal>
  );
}

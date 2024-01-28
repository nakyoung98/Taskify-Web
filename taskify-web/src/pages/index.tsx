import { Modal } from '@/components/commons/ui-modal/Modal';

export default function Home() {
  const hi = true;
  return (
    <div>
      랜딩 페이지임
      <Modal isOpen={hi}>dd</Modal>
    </div>
  );
}

import { ReactNode, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ColumnModal.module.scss';
import { Modal } from '../ui-modal/Modal';
import { Input } from '../ui-input/Input';
import Button from '../ui-button/Button';

const cx = classNames.bind(styles);

type ModalContentProps = {
  children: ReactNode;
};

type ColumnModalProps = {
  secondButtonText: string;
};

function ModalContent({ children }: ModalContentProps) {
  return <div>{children}</div>;
}

export default function ColumnModal({ secondButtonText }: ColumnModalProps) {
  const [value, setValue] = useState<string>('');
  const [isDeleteConfirmationModalOpen, setDeleteConfirmationModalOpen] =
    useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleDelete = () => {
    setDeleteConfirmationModalOpen(true);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationModalOpen(false);
  };

  const handleConfirmDelete = () => {
    setDeleteConfirmationModalOpen(false);
  };

  return (
    <div>
      {isDeleteConfirmationModalOpen ? null : (
        <Modal isOpen={true}>
          <ModalContent>
            <h1 className={cx('modal-header')}>컬럼 관리</h1>
            <div className={cx('modal-body')}>
              <p>이름</p>
              <Input
                type="text"
                value={value}
                onChange={handleChange}
                isModal={true}
                placeholder="홍길동"
              />
            </div>
            <div className={cx('modal-footer')}>
              <button
                className={cx('delete')}
                type="button"
                onClick={handleDelete}
              >
                삭제하기
              </button>
              <div className={cx('right')}>
                <Button theme="secondary" size="modalMedium" onClick={() => {}}>
                  취소
                </Button>
                <Button size="modalMedium" onClick={() => {}}>
                  {secondButtonText}
                </Button>
              </div>
            </div>
          </ModalContent>
        </Modal>
      )}

      <Modal isOpen={isDeleteConfirmationModalOpen}>
        <div className={cx('modal-delete')}>
          <p className={cx('modal-delete-text')}>
            컬럼의 모든 카드가 삭제됩니다
          </p>
          <div className={cx('modal-footer')}>
            <Button
              theme="secondary"
              size="modalMedium"
              onClick={handleCancelDelete}
            >
              취소
            </Button>
            <Button size="modalMedium" onClick={handleConfirmDelete}>
              삭제
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

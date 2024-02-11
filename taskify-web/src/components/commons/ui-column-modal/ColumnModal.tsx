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
  isOpen: boolean;
  onColumnDelete: (columnId: number) => void;
  onColumnChange: (columnId: number, newColumnName: string) => void;
  onChangeModalOpenStatus: (isOpen: boolean) => void;
};

function ModalContent({ children }: ModalContentProps) {
  return <div>{children}</div>;
}

export default function ColumnModal({
  isOpen,
  onColumnChange,
  onColumnDelete,
  onChangeModalOpenStatus,
}: ColumnModalProps) {
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
    onChangeModalOpenStatus(false);
  };

  return (
    <>
      <Modal isOpen={isOpen && !isDeleteConfirmationModalOpen}>
        <ModalContent>
          <h1 className={cx('modal-header')}>컬럼 관리</h1>
          <div className={cx('modal-body')}>
            <p>이름</p>
            <Input
              type="text"
              value={value}
              onChange={handleChange}
              isModal={true}
              placeholder="새로운 컬럼명 입력"
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
              <Button
                theme="secondary"
                size="modalMedium"
                onClick={() => {
                  onChangeModalOpenStatus(false);
                }}
              >
                취소
              </Button>
              <Button
                size="modalMedium"
                onClick={() => {
                  onChangeModalOpenStatus(false);
                }}
              >
                변경
              </Button>
            </div>
          </div>
        </ModalContent>
      </Modal>

      <Modal isOpen={!isOpen && isDeleteConfirmationModalOpen}>
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
    </>
  );
}

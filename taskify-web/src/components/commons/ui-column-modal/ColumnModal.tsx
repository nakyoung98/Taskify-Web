import { ReactNode, useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import classNames from 'classnames/bind';
import styles from './ColumnModal.module.scss';
import { Modal } from '../ui-modal/Modal';
import { Input } from '../ui-input/Input';
import Button from '../ui-button/Button';
import { useAsync } from '@/lib/hooks/useAsync';
import { ColumnResponse } from '@/types/column';

const cx = classNames.bind(styles);

type ModalContentProps = {
  children: ReactNode;
};

type ColumnModalProps = {
  isOpen: boolean;
  onColumnDelete: () => Promise<AxiosResponse>;
  onColumnChange: (
    columnName: string,
  ) => Promise<AxiosResponse<ColumnResponse>>;
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

  const {
    execute: excuteColumnChange,
    loading: loadingColumnChange,
    error: errorColumnChange,
    data: columnChangeData,
    resetAsyncState: resetAsyncColumnChangeState,
  } = useAsync<ColumnResponse>({
    asyncFunction: () => {
      return onColumnChange(value);
    },
    isManual: true,
  });

  const {
    execute: excuteColumnDelete,
    loading: loadingColumnDelete,
    error: errorColumnDelete,
    resetAsyncState: resetAsyncColumnDeleteState,
  } = useAsync<void>({
    asyncFunction: () => {
      return onColumnDelete();
    },
    isManual: true,
  });
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
    excuteColumnDelete();
    setDeleteConfirmationModalOpen(false);
    onChangeModalOpenStatus(false);
  };

  const handleConfirmChange = () => {
    excuteColumnChange();
  };

  // 칼럼명 변경이 정상적으로 완료 되었을 때에만 모달을 닫는 훅
  useEffect(() => {
    if (columnChangeData && !errorColumnChange) {
      onChangeModalOpenStatus(false);
    }
  }, [columnChangeData, errorColumnChange, onChangeModalOpenStatus]);

  // 칼럼 삭제 중 오류 발생시 띄우는 alert
  useEffect(() => {
    if (errorColumnDelete) {
      alert('칼럼 삭제 중 오류가 발생했습니다.\n다시 시도해주세요.');
    }
  }, [errorColumnDelete]);

  // 모달 열었다 닫을 시 내용이 초기화되는 훅
  useEffect(() => {
    if (!isOpen) {
      resetAsyncColumnDeleteState();
      resetAsyncColumnChangeState();
      setValue('');
    }
  }, [isOpen, resetAsyncColumnChangeState, resetAsyncColumnDeleteState]);

  return (
    <>
      <Modal isOpen={isOpen && !isDeleteConfirmationModalOpen}>
        <ModalContent>
          <h1 className={cx('modal-header')}>컬럼 관리</h1>
          <div className={cx('modal-body')}>
            <p>이름</p>
            <Input
              isModal
              type="text"
              value={value}
              onChange={handleChange}
              placeholder="새로운 컬럼명 입력"
              hasError={errorColumnChange}
              errorMessage="컬럼명 변경에 실패했습니다. 다시 시도해주세요"
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
                onClick={handleConfirmChange}
                disabled={loadingColumnChange}
              >
                변경
              </Button>
            </div>
          </div>
        </ModalContent>
      </Modal>

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
            <Button
              size="modalMedium"
              onClick={handleConfirmDelete}
              disabled={loadingColumnDelete}
            >
              삭제
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

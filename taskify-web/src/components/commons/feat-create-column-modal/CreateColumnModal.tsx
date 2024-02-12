import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CreateColumnModal.module.scss';
import { Modal } from '../ui-modal/Modal';
import Button from '../ui-button/Button';
import { axiosInstance } from '@/lib/api/axiosInstance';

const cx = classNames.bind(styles);

type ColumnData = {
  result: string;
  data: [
    {
      id: number;
      title: string;
      teamId: string;
      dashboardId: number;
      createdAt: string;
      updatedAt: string;
    },
  ];
};

type CreateColumnModalProps = {
  isOpen: boolean;
  onClick: () => void;
};

export default function CreateColumnModal({
  isOpen,
  onClick,
}: CreateColumnModalProps) {
  const [isError, setIsError] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [columnData, setColumnData] = useState<ColumnData>();
  const router = useRouter();
  const { boardId } = router.query;

  const columnsData = async () => {
    try {
      const response = await axiosInstance.get(
        `columns?dashboardId=${boardId}`,
      );
      const newData = response.data;
      setColumnData(newData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    columnsData();
  }, []);

  const createColumnRequest = async () => {
    const isTitleVaild = columnData?.data.find(
      (columnTitle) => columnTitle.title === inputValue,
    );
    if (isTitleVaild) {
      setIsError(true);
      return;
    }
    if (!isTitleVaild) {
      try {
        await axiosInstance.post('columns', {
          title: inputValue,
          dashboardId: Number(boardId),
        });
      } catch (error) {
        console.log(error);
      }
      setIsError(false);
      await columnsData();
      onClick();
    }
  };

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <Modal isOpen={isOpen}>
      <div className={cx('container')}>
        <div className={cx('title')}>
          <span>새 컬럼 생성</span>
        </div>
        <div className={cx('input-container')}>
          <span className={cx('input-title')}>이름</span>
          <input
            value={inputValue}
            onChange={handleInputValue}
            placeholder="컬럼명을 입력하세요."
            className={cx('input')}
          />
          {isError && (
            <span className={cx('input-error')}>중복된 컬럼 이름입니다.</span>
          )}
        </div>
        <div className={cx('button')}>
          <Button theme="secondary" onClick={onClick} size="modalMedium">
            취소
          </Button>
          <Button
            theme="primary"
            onClick={createColumnRequest}
            size="modalMedium"
            disabled={!inputValue}
          >
            생성
          </Button>
        </div>
      </div>
    </Modal>
  );
}

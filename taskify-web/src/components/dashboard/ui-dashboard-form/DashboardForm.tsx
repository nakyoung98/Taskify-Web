import { useState } from 'react';
import classNames from 'classnames/bind';
import AddButton from '@/components/commons/ui-add-button/AddButton';
import styles from './DashboardForm.module.scss';
import { useColumn } from '@/contexts/ColumnProvider';
import DashboardCardColumn from '../feat-column/DashboardCardColumn';
import CreateColumnModal from '@/components/commons/feat-create-column-modal/CreateColumnModal';

const cx = classNames.bind(styles);

/**
 * 특정 Dashboard의 form을 구현한 ui 컴포넌트입니다
 */
function DashboardForm() {
  const { columns } = useColumn();

  const [isColumnCreateModalVisible, setIsColumnCreateModalVisible] =
    useState<boolean>(false);

  const onClick = () => {
    setIsColumnCreateModalVisible(false);
  };

  return (
    <section className={cx('dashboard-form')}>
      {columns.map((column) => {
        return <DashboardCardColumn key={column.id} column={column} />;
      })}
      <div className={cx('dashboard-form__add-column')}>
        <AddButton
          onClick={() => {
            setIsColumnCreateModalVisible(true);
          }}
          addCase="addColumn"
        />
      </div>
      <CreateColumnModal
        isOpen={isColumnCreateModalVisible}
        onClick={onClick}
      />
    </section>
  );
}

export default DashboardForm;

import classNames from 'classnames/bind';
import AddButton from '@/components/commons/ui-add-button/AddButton';
import styles from './DashboardForm.module.scss';
import { useColumn } from '@/contexts/ColumnProvider';
import DashboardCardColumn from '../feat-column/DashboardCardColumn';

const cx = classNames.bind(styles);

/**
 * 특정 Dashboard의 form을 구현한 ui 컴포넌트입니다
 */
function DashboardForm() {
  const { columns } = useColumn();

  return (
    <section className={cx('dashboard-form')}>
      {columns.map((column) => {
        return <DashboardCardColumn key={column.id} column={column} />;
      })}
      <div className={cx('dashboard-form__add-column')}>
        <AddButton
          onClick={() => {
            /** TODO: 칼럼 추가 onClick  */
          }}
          addCase="addColumn"
        />
      </div>
    </section>
  );
}

export default DashboardForm;

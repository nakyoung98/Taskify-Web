import classNames from 'classnames/bind';
import styles from './MyInvitedDashboardList.module.scss';
import SearchInput from '@/components/commons/feat-search-input/SearchInput';
import Button from '@/components/commons/ui-button/Button';

const cx = classNames.bind(styles);

export default function MyInvitedDashboardList() {
  const dd = () => {
    console.log('d');
  };

  return (
    <div className={cx('container')}>
      <span className={cx('board-header')}>초대받은 대시보드</span>
      <SearchInput onSearch={dd} />
      <div className={cx('board-menu')}>
        <span>이름</span>
        <span>초대자</span>
        <span>수락 여부</span>
      </div>
      <div className={cx('board-list-container')}>
        <div className={cx('board-list')}>
          <span className={cx('board-name')}>이름</span>
          <span>초대자</span>
          <div className={cx('board-button')}>
            <Button theme="primary" onClick={dd} size="medium">
              수락
            </Button>
            <Button theme="secondary" onClick={dd} size="medium">
              거절
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

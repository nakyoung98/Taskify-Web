import classNames from 'classnames/bind';
import LineIcon from './Line.svg';
import styles from './DashboardUserList.module.scss';

const cx = classNames.bind(styles);

export default function DashboardUserList() {
  return (
    <div className={cx('container')}>
      <div>(//TODO:대시보드 맴버리스트 map으로 나열)</div>
      <LineIcon />
    </div>
  );
}

import classNames from 'classnames/bind';
import styles from './DashboardName.module.scss';

const cx = classNames.bind(styles);

type DashboardNameProps = {
  title: string;
  id: number | null;
};

export default function DashboardName({
  title,
  id = null,
}: DashboardNameProps) {
  return (
    <div className={cx('container')}>
      <span className={cx('dashboardNameItem')}>{title}</span>
      {id && <div>(//TODO:왕관 이미지)</div>}
    </div>
  );
}

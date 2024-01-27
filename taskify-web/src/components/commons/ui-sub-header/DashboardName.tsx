import classNames from 'classnames/bind';
import styles from './DashboardName.module.scss';

const cx = classNames.bind(styles);

type DashboardNameProps = {
  title: string;
  id: number;
};

export default function DashboardName({ title, id }: DashboardNameProps) {
  return (
    <div className={cx('container')}>
      <span className={cx('dashboardTitle')}>{title}</span>
      {id && <div>//TODO:왕관 이미지</div>}
    </div>
  );
}

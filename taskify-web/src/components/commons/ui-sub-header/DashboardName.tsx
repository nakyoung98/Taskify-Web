import classNames from 'classnames/bind';
import styles from './DashboardName.module.scss';

const cx = classNames.bind(styles);

type DashboardNameProps = {
  title: string;
  id: number;
};

export default function DashboardName({ title, id }: DashboardNameProps) {
  return (
    <>
      <span className={cx('dashboardName')}>{title}</span>
      {id && <div>(//TODO:왕관 이미지)</div>}
    </>
  );
}

import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './MyDashboardMain.module.scss';

const cx = classNames.bind(styles);

type MydashboadMainProps = {
  children: ReactNode;
};

export default function MydashboadMain({ children }: MydashboadMainProps) {
  return <div className={cx('container')}>{children}</div>;
}

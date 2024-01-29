import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './SubHeader.module.scss';

const cx = classNames.bind(styles);

type SubHeaderProps = {
  children: ReactNode;
};

export default function SubHeader({ children }: SubHeaderProps) {
  return <div className={cx('container')}>{children}</div>;
}

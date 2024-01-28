import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './SubHeaderItemsLeft.module.scss';

const cx = classNames.bind(styles);

type SubHeaderItemsLeftProps = {
  children: ReactNode;
};

export default function SubHeaderItemsLeft({
  children,
}: SubHeaderItemsLeftProps) {
  return <div className={cx('container')}>{children}</div>;
}

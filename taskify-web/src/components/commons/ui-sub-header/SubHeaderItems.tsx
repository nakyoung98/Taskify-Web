import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './SubHeaderItems.module.scss';

const cx = classNames.bind(styles);

type SubHeaderItemsProps = {
  children: ReactNode;
};

export default function SubHeaderItems({ children }: SubHeaderItemsProps) {
  return <div className={cx('container')}>{children}</div>;
}

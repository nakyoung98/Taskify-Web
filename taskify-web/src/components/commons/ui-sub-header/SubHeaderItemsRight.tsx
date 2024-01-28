import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './SubHeaderItemsRight.module.scss';

const cx = classNames.bind(styles);

type SubHeaderItemsRightProps = {
  children: ReactNode;
};

export default function SubHeaderItemsRight({
  children,
}: SubHeaderItemsRightProps) {
  return <div className={cx('container')}>{children}</div>;
}

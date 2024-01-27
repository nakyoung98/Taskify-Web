import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './SubHeaderName.module.scss';

const cx = classNames.bind(styles);

type SubHeaderNameProps = {
  children: ReactNode;
};

export default function SubHeaderName({ children }: SubHeaderNameProps) {
  return <div className={cx('container')}>{children}</div>;
}

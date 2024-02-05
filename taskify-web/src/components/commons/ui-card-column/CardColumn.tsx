import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './CardColumn.module.scss';

const cx = classNames.bind(styles);

type CardColumnProps = {
  children: ReactNode;
};

export default function CardColumn({ children }: CardColumnProps) {
  return <section className={cx('card-column')}>{children}</section>;
}

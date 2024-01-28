import { HTMLProps } from 'react';

import classNames from 'classnames/bind';

import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

type MainProp = Pick<HTMLProps<HTMLDivElement>, 'children'>;

function SidebarMain({ children }: MainProp) {
  return <div className={cx('main')}>{children}</div>;
}

export default SidebarMain;

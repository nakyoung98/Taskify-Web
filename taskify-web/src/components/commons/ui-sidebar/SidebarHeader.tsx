import { HTMLProps } from 'react';

import classNames from 'classnames/bind';

import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

type HeaderProp = Pick<HTMLProps<HTMLDivElement>, 'children'>;

function SidebarHeader({ children }: HeaderProp) {
  return <header className={cx('header')}>{children}</header>;
}

export default SidebarHeader;

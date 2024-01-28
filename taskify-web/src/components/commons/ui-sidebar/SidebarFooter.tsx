import { HTMLProps } from 'react';

import classNames from 'classnames/bind';

import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

type FooterProp = Pick<HTMLProps<HTMLDivElement>, 'children'>;

function SidebarFooter({ children }: FooterProp) {
  return <footer className={cx('footer')}>{children}</footer>;
}

export default SidebarFooter;

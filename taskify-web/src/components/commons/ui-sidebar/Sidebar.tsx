import React, { ReactNode, isValidElement, Children } from 'react';

import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import SidebarMain from './Sidebarmain';
import SidebarHeader from './SidebarHeader';
import SidebarFooter from './SidebarFooter';
import ArrowComponent from './draw-arrow.svg';
import OpenStatus, { reverseOpenStatus } from './OpenStatus';

const cx = classNames.bind(styles);

type Drawable = {
  isOpened: OpenStatus;
};
type SidebarProps = {
  children: ReactNode;
  isDrawable: boolean;
  isOpened: boolean;
};

export default function Sidebar({ children }: SidebarProps) {

  
  return (
    <aside className={cx('container')}>
      <ArrowComponent
      />
      {children}
    </aside>
  );
}

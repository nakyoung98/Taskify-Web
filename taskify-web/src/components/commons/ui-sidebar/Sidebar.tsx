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

// DrawableProps를 전달하지 않으면 열고 닫을 수 없음
type SidebarProps = {
  children: ReactNode;
  drawableProps?: Drawable;
};

export default function Sidebar({
  children,
  drawableProps = {
    isOpened: OpenStatus.OPEN,
  },
}: SidebarProps) {

  
  return (
    <aside className={cx('container')}>
      <ArrowComponent
      />
      {children}
    </aside>
  );
}

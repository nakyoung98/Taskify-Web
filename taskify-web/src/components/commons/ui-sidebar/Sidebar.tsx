import React, { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import ArrowComponent from './draw-arrow.svg';
import { useSideBar } from '@/contexts/SidebarProvider';

const cx = classNames.bind(styles);

/**
 * `SidebarProps`는 사이드바 컴포넌트의 속성을 정의하는 타입입니다.
 * 이 타입은 사이드바에 포함될 자식 요소들(children)과, 사이드바가 드로어블(drawable)인지 여부를
 * 나타내는 선택적 속성(drawableProps)을 포함합니다.
 *
 * @typedef {Object} SidebarProps
 * @property {ReactNode} children - 사이드바 내에 렌더링될 React 노드 혹은 컴포넌트들.
 * @property {Drawable} [drawableProps] - 사이드바를 드로어블(열고 닫을 수 있음)로 만들기 위한 속성.
 *                                      이 속성이 제공되지 않으면, 사이드바는 열고 닫을 수 없습니다.
 */
type SidebarProps = {
  children: ReactNode;
};

export default function Sidebar({ children }: SidebarProps) {
  const { isOpen, setIsOpen } = useSideBar();

  const onArrowClickHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside className={cx('container', { open: isOpen }, { close: !isOpen })}>
      <ArrowComponent
        className={cx('draw-arrow', { open: isOpen }, { close: !isOpen })}
        onClick={onArrowClickHandler}
      />

      {children}
    </aside>
  );
}

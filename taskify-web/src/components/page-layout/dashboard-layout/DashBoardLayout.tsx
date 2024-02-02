import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './DashBoardLayout.module.scss';
import SubHeader from '@/components/dashboard/feat-sub-header/SubHeader';
import SideBar from '@/components/dashboard/feat-side-bar/SideBar';
import { useSideBar } from '@/contexts/SidebarProvider';

type DashBoardLayoutProps = {
  dashboardMain: ReactNode;
};

const cx = classNames.bind(styles);

/** 대시보드 관련 화면 레이아웃입니다.
 * main으로 들어갈 컴포넌트만 props로 받으며, context를 사용해 사이드바가 열리고 닫힐 때 padding이 변화합니다.
 */
export function DashBoardLayout({ dashboardMain }: DashBoardLayoutProps) {
  const { isOpen } = useSideBar();
  return (
    <>
      <SubHeader />

      <main>
        <SideBar />
        <article className={cx('main', { isOpened: !isOpen })}>
          {dashboardMain}
        </article>
      </main>
    </>
  );
}

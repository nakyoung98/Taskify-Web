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

export function DashBoardLayout({ dashboardMain }: DashBoardLayoutProps) {
  const { isOpen } = useSideBar();
  return (
    <main>
      <SubHeader />
      <SideBar />
      <article className={cx('main', { isOpened: !isOpen })}>
        {dashboardMain}
      </article>
    </main>
  );
}

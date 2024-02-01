import { ReactNode } from 'react';

type DashBoardLayoutProps = {
  dashboardHeader: ReactNode;
  dashboardMain: ReactNode;
  dashboardSideBar: ReactNode;
};

export function DashBoardLayout({
  dashboardHeader,
  dashboardMain,
  dashboardSideBar,
}: DashBoardLayoutProps) {
  return (
    <main>
      <aside>{dashboardSideBar}</aside>
      <header>{dashboardHeader}</header>
      <article>{dashboardMain}</article>
    </main>
  );
}

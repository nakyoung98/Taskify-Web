import SideBar from '@/components/dashboard/feat-side-bar/SideBar';
import SubHeader from '@/components/dashboard/feat-sub-header/SubHeader';
import { DashBoardLayout } from '@/components/page-layout/dashboard-layout/DashBoardLayout';
import { useAuth } from '@/contexts/AuthProvider';
import { useDashBoard } from '@/contexts/DashBoardProvider';

export default function DashBoard() {
  useAuth(true);
  const { boardId } = useDashBoard();

  return (
    <DashBoardLayout
      sideBar={<SideBar data={null} />}
      subHeader={<SubHeader dashBoardInfoLabel={null} />}
      dashboardMain={null}
    />
  );
}

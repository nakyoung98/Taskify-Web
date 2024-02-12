import DashboardInfoLabel from '@/components/commons/ui-dashboard-info-label/DashboardInfoLabel';
import MydashboadList from '@/components/dashboard/feat-my-dashboard-list/MydashboardList';
import MyInvitedDashboardList from '@/components/dashboard/feat-my-invited-dashboard-List/MyInvitedDashboardList';
import SideBar from '@/components/dashboard/feat-side-bar/SideBar';
import SubHeader from '@/components/dashboard/feat-sub-header/SubHeader';
import MydashboadMain from '@/components/dashboard/ui-my-dashboard-main/MyDashboardMain';
import { DashBoardLayout } from '@/components/page-layout/dashboard-layout/DashBoardLayout';
import { useDashBoard } from '@/contexts/DashBoardProvider';
import { SidebarProvider } from '@/contexts/SidebarProvider';

export default function MyDashBoard() {
  const { dashBoards } = useDashBoard();

  return (
    <SidebarProvider>
      <DashBoardLayout
        subHeader={
          <SubHeader
            dashBoardInfoLabel={
              <DashboardInfoLabel
                location="header"
                text="내 대시보드"
                isOwner={false}
              />
            }
          />
        }
        sideBar={<SideBar data={dashBoards.data} />}
        dashboardMain={
          <MydashboadMain>
            <MydashboadList />
            <MyInvitedDashboardList />
          </MydashboadMain>
        }
      />
    </SidebarProvider>
  );
}

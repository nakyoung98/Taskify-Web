import DashboardInfoLabel from '@/components/commons/ui-dashboard-info-label/DashboardInfoLabel';
import SideBar from '@/components/dashboard/feat-side-bar/SideBar';
import SubHeader from '@/components/dashboard/feat-sub-header/SubHeader';
import DashboardForm from '@/components/dashboard/ui-dashboard-form/DashboardForm';
import { DashBoardLayout } from '@/components/page-layout/dashboard-layout/DashBoardLayout';
import { useAuth } from '@/contexts/AuthProvider';
import { useDashBoard } from '@/contexts/DashBoardProvider';
import { SidebarProvider } from '@/contexts/SidebarProvider';
import mock from '@/components/dashboard/ui-dashboard-form/mock/mock.json';

export default function DashBoard() {
  useAuth(true);
  const { dashBoards, dashBoard } = useDashBoard();

  return (
    <SidebarProvider>
      <DashBoardLayout
        sideBar={<SideBar data={dashBoards.data} />}
        subHeader={
          <SubHeader
            dashBoardInfoLabel={
              <DashboardInfoLabel
                location="header"
                text={dashBoard.data?.title ?? ''}
                isOwner={dashBoard.data?.createdByMe ?? false}
              />
            }
          />
        }
        /** TODO: 실 데이터로 변경 */
        dashboardMain={<DashboardForm cardsWithColumns={mock} />}
      />
    </SidebarProvider>
  );
}

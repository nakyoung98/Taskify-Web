import ChangeDashBoardForm from '@/components/dashboard/feat-change-dashboard-form/ChangeDashBoardForm';
import GoBackMain from '@/components/dashboard/ui-go-back-main/GoBackMain';
import { DashBoardLayout } from '@/components/page-layout/dashboard-layout/DashBoardLayout';
import SubHeader from '@/components/dashboard/feat-sub-header/SubHeader';
import SideBar from '@/components/dashboard/feat-side-bar/SideBar';
import DashboardInfoLabel from '@/components/commons/ui-dashboard-info-label/DashboardInfoLabel';
import { SidebarProvider } from '@/contexts/SidebarProvider';
import SubHeaderButton from '@/components/commons/ui-sub-header/SubHeaderButton';
import { useDashBoard } from '@/contexts/DashBoardProvider';

export default function DashBoardEdit() {
  const { dashBoards, dashBoard } = useDashBoard();

  return (
    <SidebarProvider>
      <DashBoardLayout
        subHeader={
          <SubHeader
            subHeaderButtons={
              <SubHeaderButton isOwner={dashBoard.data?.createdByMe || false} />
            }
            dashBoardInfoLabel={
              <DashboardInfoLabel
                location="header"
                isOwner={dashBoard.data?.createdByMe || false}
                text={dashBoard.data?.title || ''}
              />
            }
          />
        }
        sideBar={<SideBar data={dashBoards.data} />}
        dashboardMain={
          <GoBackMain>
            <ChangeDashBoardForm data={dashBoard.data} />
          </GoBackMain>
        }
      />
    </SidebarProvider>
  );
}

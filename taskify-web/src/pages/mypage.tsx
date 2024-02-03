import ChangeProfileForm from '@/components/dashboard/feat-change-profile-form/ChangeProfileForm';
import GoBackMain from '@/components/dashboard/ui-go-back-main/GoBackMain';
import { DashBoardLayout } from '@/components/page-layout/dashboard-layout/DashBoardLayout';
import { SidebarProvider } from '@/contexts/SidebarProvider';

export default function MyPage() {
  return (
    <SidebarProvider>
      <DashBoardLayout
        dashboardMain={
          <GoBackMain>
            <ChangeProfileForm />
          </GoBackMain>
        }
      />
    </SidebarProvider>
  );
}

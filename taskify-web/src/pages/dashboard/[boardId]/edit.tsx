import ChangeDashBoardForm from '@/components/dashboard/feat-change-dashboard-form/ChangeDashBoardForm';
import GoBackMain from '@/components/dashboard/ui-go-back-main/GoBackMain';

export default function DashBoard() {
  return (
    <div>
      <GoBackMain>
        <ChangeDashBoardForm />
      </GoBackMain>
    </div>
  );
}

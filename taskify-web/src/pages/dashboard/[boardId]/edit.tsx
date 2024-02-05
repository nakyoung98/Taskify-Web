import { useRouter } from 'next/router';
import ChangeDashBoardForm from '@/components/dashboard/feat-change-dashboard-form/ChangeDashBoardForm';
import GoBackMain from '@/components/dashboard/ui-go-back-main/GoBackMain';
import { useGetDashboard } from '@/lib/hooks/useGetDashBoard';

export default function DashBoard() {
  const router = useRouter();
  const { boardId } = router.query;

  const { data, reloadDashboardInfo } = useGetDashboard(boardId as string);

  return (
    <div>
      <GoBackMain>
        <ChangeDashBoardForm
          data={data}
          boardId={boardId as string}
          reload={reloadDashboardInfo}
        />
      </GoBackMain>
    </div>
  );
}

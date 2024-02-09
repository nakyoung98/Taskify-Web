import { useState } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames/bind';
import styles from './MydashboardList.module.scss';
import AddButton from '@/components/commons/ui-add-button/AddButton';
import DashboardEnterButton from '../ui-dashboard-enter-button/DashboardEnterButton';
import AddDashboardModal from '../feat-add-dashboard-modal/AddDashboardModal';
import { DashboardsData } from '@/types/dashboard';
import PaginationButtonContainer from '@/components/commons/ui-pagination/PaginationButtonContainer';

const cx = classNames.bind(styles);

type MydashBoardListProps = {
  data: DashboardsData | null;
};

export default function MydashboadList({ data }: MydashBoardListProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleCreateDashBoardModal = () => {
    setIsOpen(!isOpen);
  };
  const router = useRouter();

  return (
    <div className={cx('container')}>
      <AddDashboardModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={cx('dashboard-list')}>
        <AddButton
          onClick={handleCreateDashBoardModal}
          addCase="addDashBoard"
        />
        {data?.dashboards &&
          data.dashboards.map((list) => (
            <DashboardEnterButton
              key={list.id}
              onClick={() => router.push(`/dashboard/${list.id}`)}
              dashboardName={list.title}
              dashboardColor={list.color}
              isOwner={list.createdByMe}
            />
          ))}
      </div>
      <div className={cx('pagination-container')}>
        <span>1 페이지 중 1</span>
        <PaginationButtonContainer
          leftClick={handleCreateDashBoardModal}
          rightClick={handleCreateDashBoardModal}
        />
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames/bind';
import styles from './MydashboardList.module.scss';
import AddButton from '@/components/commons/ui-add-button/AddButton';
import DashboardEnterButton from '../ui-dashboard-enter-button/DashboardEnterButton';
import AddDashboardModal from '../feat-add-dashboard-modal/AddDashboardModal';
import { DashboardsData } from '@/types/dashboard';
import PaginationButtonContainer from '@/components/commons/ui-pagination/PaginationButtonContainer';
import { axiosInstance } from '@/lib/api/axiosInstance';

const cx = classNames.bind(styles);

export default function MydashboadList() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dashboardData, setDashboardData] = useState<
    DashboardsData | undefined
  >(undefined);
  const [page, setPage] = useState<number>(1);
  const totalCount =
    dashboardData && dashboardData.totalCount ? dashboardData.totalCount : 0;
  const size = 5;
  const offset = page * size;
  const totalPage = Math.ceil(totalCount / size);

  const handleCreateDashBoardModal = () => {
    setIsOpen(!isOpen);
  };
  const router = useRouter();

  const getDashboardListData = async () => {
    try {
      const res = await axiosInstance.get(
        `dashboards?navigationMethod=pagination&page=${page}&size=${size}`,
      );
      setDashboardData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const isPageFirst = () => {
    if (page <= 1) {
      return true;
    }
    return false;
  };

  const isPageLast = () => {
    if (offset >= totalCount) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    getDashboardListData();
  }, [page]);

  return (
    <div className={cx('container')}>
      <AddDashboardModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={cx('dashboard-list')}>
        <AddButton
          onClick={handleCreateDashBoardModal}
          addCase="addDashBoard"
        />
        {dashboardData?.dashboards &&
          dashboardData.dashboards.map((list) => (
            <DashboardEnterButton
              key={list.id}
              onClick={() => router.push(`/dashboard/${list.id}`)}
              dashboardName={list.title}
              dashboardColor={list.color}
              isOwner={list.createdByMe}
            />
          ))}
      </div>
      {dashboardData?.dashboards && dashboardData.dashboards.length > 0 && (
        <div className={cx('pagination-container')}>
          <span>
            {totalPage} 페이지 중 {page}
          </span>
          <PaginationButtonContainer
            leftClick={() => setPage(page - 1)}
            leftDisabled={isPageFirst()}
            rightClick={() => setPage(page + 1)}
            righttDisabled={isPageLast()}
          />
        </div>
      )}
    </div>
  );
}

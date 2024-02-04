import { useCallback } from 'react';
import { axiosInstance } from '../api/axiosInstance';
import { DashboardsData } from '@/types/dashboard';
import { useAsync } from './useAsync';

/** @alert 대시보드 목록 조회 */
export const useGetDashboards = () => {
  /** @TODO 페이지네이션 관련 쿼리 추가 */
  const getDashboards = useCallback(
    () =>
      axiosInstance.get<{ data: DashboardsData }>(
        `dashboards?navigationMethod=infiniteScroll&page=1&size=10`,
      ),
    [],
  );
  const { data, error, loading } = useAsync({
    asyncFunction: getDashboards,
  });

  return { loading, error, data };
};

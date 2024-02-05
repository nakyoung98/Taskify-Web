import { useCallback } from 'react';
import { axiosInstance } from '../api/axiosInstance';
import { DashboardData } from '@/types/dashboard';
import { useAsync } from './useAsync';

/** @alert 대시보드 목록 조회 */
export const useGetDashboard = (dashboardId: string) => {
  const getDashboards = useCallback(
    () => axiosInstance.get<DashboardData>(`dashboards/${dashboardId}`),
    [dashboardId],
  );
  const { data, error, loading, execute } = useAsync({
    asyncFunction: getDashboards,
    reload: !!dashboardId,
  });

  return { loading, error, data, reloadDashboardInfo: execute };
};

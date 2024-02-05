import { useCallback } from 'react';
import { axiosInstance } from '../api/axiosInstance';
import { ChangeDashBoardForm, DashboardData } from '@/types/dashboard';
import { useAsync } from './useAsync';

/** @alert 대시보드 목록 조회 */
export const usePutDashboard = ({
  title,
  color,
  dashboardId,
}: ChangeDashBoardForm) => {
  const getDashboards = useCallback(
    () =>
      axiosInstance.put<DashboardData>(`dashboards/${dashboardId}`, {
        title,
        color,
      }),
    [dashboardId, color, title],
  );
  const { data, error, loading, execute } = useAsync({
    asyncFunction: getDashboards,
    isManual: true,
  });

  return { loading, error, data, execute };
};

import { useCallback } from 'react';
import { Members } from '@/types/dashboard';
import { axiosInstance } from '../api/axiosInstance';
import { useAsync } from './useAsync';

export const useGetMembers = (boardId: string, page: number = 1) => {
  const getUser = useCallback(
    () =>
      axiosInstance.get<Members>(
        `members?page=${page}&size=4&dashboardId=${boardId}`,
      ),
    [boardId, page],
  );
  const { loading, error, data, execute } = useAsync({
    asyncFunction: getUser,
    isManual: true,
    reload: !!boardId && !!page,
  });

  return { loading, error, membersData: data, executeGetMembers: execute };
};

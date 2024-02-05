import { useRouter } from 'next/router';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import axios, { AxiosError } from 'axios';
import {
  ChangeDashBoardForm,
  DashboardData,
  DashboardsData,
} from '@/types/dashboard';
import { axiosInstance } from '@/lib/api/axiosInstance';
import { useAuth } from './AuthProvider';

type DashBoardProviderType = {
  dashBoards: {
    data: DashboardsData | null;
    error: AxiosError<unknown> | null;
  };
  dashBoard: {
    data: DashboardData | null;
    error: AxiosError<unknown> | null;
  };
  getDashBoards: () => Promise<void>;
  updateDashBoard: ({ color, title }: ChangeDashBoardForm) => Promise<void>;
  error: AxiosError | null;
};

const DashBoardContext = createContext<DashBoardProviderType>({
  dashBoards: {
    data: null,
    error: null,
  },
  dashBoard: {
    data: null,
    error: null,
  },
  getDashBoards: async () => {},
  updateDashBoard: async () => {},
  error: null,
});

type DashBoardProviderProps = {
  children: ReactNode;
};

export function DashBoardProvider({ children }: DashBoardProviderProps) {
  const { user } = useAuth();
  const [dashBoards, setDashBoards] = useState<{
    data: DashboardsData | null;
    error: AxiosError | null;
  }>({
    data: null,
    error: null,
  });
  const [dashBoard, setDashBoard] = useState<{
    data: DashboardData | null;
    error: AxiosError | null;
  }>({
    data: null,
    error: null,
  });
  const [axiosError, setAxiosError] = useState<AxiosError | null>(null);

  const router = useRouter();
  const { boardId } = router.query;

  const getDashBoards = async () => {
    try {
      setDashBoards((prevValue) => ({ ...prevValue, error: null }));
      const res = await axiosInstance.get(
        `dashboards?navigationMethod=infiniteScroll&page=1&size=10`,
      );
      setDashBoards((prevValue) => ({ ...prevValue, data: res.data }));
    } catch {
      setDashBoards((prevValue) => ({ ...prevValue, error: axiosError }));
    }
  };

  const getDashBoard = async () => {
    try {
      setDashBoard((prevValue) => ({ ...prevValue, error: null }));
      const res = await axiosInstance.get(`dashboards/${boardId}`);
      setDashBoard((prevValue) => ({ ...prevValue, data: res.data }));
    } catch {
      setDashBoard((prevValue) => ({ ...prevValue, error: axiosError }));
    }
  };

  const updateDashBoard = async ({ title, color }: ChangeDashBoardForm) => {
    try {
      await axiosInstance.put(`dashboards/${boardId}`, {
        title,
        color,
      });
      await getDashBoards();
      await getDashBoard();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setAxiosError(error);
      }
    }
  };

  useEffect(() => {
    if (user) {
      if (router.asPath.includes('my') || router.asPath.includes('dashboard')) {
        getDashBoards();
      }
      if (boardId) {
        getDashBoard();
      }
    }
  }, [router, boardId, user]);

  const memoizedValue = useMemo(
    () => ({
      dashBoards,
      dashBoard,
      getDashBoards,
      getDashBoard,
      updateDashBoard,
      error: axiosError,
    }),
    [
      dashBoard,
      dashBoards,
      getDashBoards,
      getDashBoard,
      updateDashBoard,
      axiosError,
    ],
  );

  return (
    <DashBoardContext.Provider value={memoizedValue}>
      {children}
    </DashBoardContext.Provider>
  );
}

export function useDashBoard() {
  const context = useContext(DashBoardContext);
  if (!context) {
    throw new Error('반드시 DashBoardProvider 안에서 사용해야 합니다.');
  }

  return context;
}

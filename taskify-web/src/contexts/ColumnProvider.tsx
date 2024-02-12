import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { axiosInstance } from '@/lib/api/axiosInstance';
import { ColumnListResponse, ColumnResponse } from '@/types/column';
import { CardListResponse } from '@/types/card';

type ColumnProviderProps = {
  children: ReactNode;
};

type ColumnContextProps = {
  columns: ColumnResponse[];
  getCardDataFromColumn: (
    columnId: number,
    size?: number,
    cursorId?: number | null,
  ) => Promise<AxiosResponse<CardListResponse>>;
};

export const ColumnContext = createContext<ColumnContextProps | null>(null);

export default function ColumnProvider({ children }: ColumnProviderProps) {
  const router = useRouter();
  const { boardId } = router.query;
  const [columnData, setColumnData] = useState<ColumnListResponse | null>(null);

  const getColumnData = useCallback(async () => {
    const response = await axiosInstance.get('columns', {
      params: {
        dashboardId: boardId,
      },
    });
    setColumnData(() => response.data);

    return response;
  }, [boardId]);

  const getCardDataFromColumn = useCallback(
    async (columnId: number, size?: number, cursorId?: number | null) => {
      const responses = await axiosInstance('cards', {
        params: {
          columnId,
          cursorId,
          size,
        },
      });

      return responses;
    },
    [],
  );

  useEffect(() => {
    // boardId가 존재하고, 데이터가 아직 로드되지 않았으며, 로딩 중도 아닐 때만 실행
    if (boardId) {
      getColumnData().catch((error) => {
        console.error('Data loading error:', error);
      });
    }
  }, [boardId, router.asPath]);

  const contextValue = useMemo(
    (): ColumnContextProps => ({
      columns: columnData?.data ?? [],
      getCardDataFromColumn,
    }),
    [columnData, getCardDataFromColumn],
  );
  return (
    /** TODO: 전달할 데이터 삽입 */
    <ColumnContext.Provider value={contextValue}>
      {children}
    </ColumnContext.Provider>
  );
}

export function useColumn() {
  const columnContext = useContext(ColumnContext);

  if (!columnContext) {
    throw new Error('반드시 ColumnProvider 안에서 사용해야 합니다.');
  }

  return columnContext;
}

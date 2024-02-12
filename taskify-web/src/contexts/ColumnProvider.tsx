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
import { useAsync } from '@/lib/hooks/useAsync';
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
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

  const getColumnData = useCallback(async () => {
    const response = await axiosInstance.get('columns', {
      params: {
        dashboardId: boardId,
      },
    });

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

  const {
    execute: executeGetColumnData,
    loading: loadingGetColumnData,
    data: ColumnData,
  } = useAsync<ColumnListResponse>({
    asyncFunction: getColumnData,
    isManual: true,
  });

  useEffect(() => {
    // boardId가 존재하고, 데이터가 아직 로드되지 않았으며, 로딩 중도 아닐 때만 실행
    if (boardId && !isDataLoaded) {
      executeGetColumnData()
        .then(() => {
          setIsDataLoaded(true); // 데이터 로딩이 완료되었음을 표시
        })
        .catch((error) => {
          console.error('Data loading error:', error);
        });
    }
  }, [boardId, isDataLoaded, loadingGetColumnData, executeGetColumnData]);

  const contextValue = useMemo(
    (): ColumnContextProps => ({
      columns: ColumnData?.data ?? [],
      getCardDataFromColumn,
    }),
    [ColumnData, getCardDataFromColumn],
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

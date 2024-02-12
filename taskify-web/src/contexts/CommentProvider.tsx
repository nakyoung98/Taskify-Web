import axios, { AxiosError } from 'axios';
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Comments, PostCommentData } from '@/types/comments';
import { axiosInstance } from '@/lib/api/axiosInstance';

type CommentContextType = {
  comments: { data: Comments | null };
  getComments: (cardId: number) => Promise<void>;
  postComments: ({
    cardId,
    columnId,
    content,
    dashboardId,
  }: PostCommentData) => Promise<void>;
  error: AxiosError | null;
};
const CommentContext = createContext<CommentContextType>({
  comments: { data: null },
  getComments: async () => {},
  postComments: async () => {},
  error: null,
});

type CommentProviderProps = {
  children: ReactNode;
};

export function CommentProvider({ children }: CommentProviderProps) {
  const [comments, setComments] = useState<{ data: Comments | null }>({
    data: null,
  });
  const [axiosError, setAxiosError] = useState<AxiosError | null>(null);

  const getComments = useCallback(async (cardId: number) => {
    try {
      const res = await axiosInstance.get(`comments?size=10&cardId=${cardId}`);
      setComments((prevComments) => ({ ...prevComments, data: res.data }));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setAxiosError(error);
      }
    }
  }, []);

  const postComments = useCallback(
    async ({ cardId, columnId, content, dashboardId }: PostCommentData) => {
      try {
        await axiosInstance.post(`comments`, {
          cardId,
          columnId,
          content,
          dashboardId: Number(dashboardId),
        });
        getComments(cardId);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setAxiosError(error);
        }
      }
    },
    [getComments],
  );

  const memoizedValue = useMemo(
    () => ({
      comments,
      error: axiosError,
      getComments,
      postComments,
    }),
    [comments, axiosError, getComments, postComments],
  );

  return (
    <CommentContext.Provider value={memoizedValue}>
      {children}
    </CommentContext.Provider>
  );
}

export function useComment() {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error('반드시 CommentProvider 안에서 사용해야 합니다.');
  }

  return context;
}

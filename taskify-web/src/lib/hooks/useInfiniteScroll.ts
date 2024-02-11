import { useCallback, useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { useAsync } from './useAsync';

type DefaultInfiniteScrollType = {
  cursorId: number | null;
};

type UseInfiniteScrollProps<T> = {
  root?: React.RefObject<HTMLElement> | null;
  target: React.RefObject<HTMLElement>;
  onIntersect: (
    cursorId?: number | null,
    pageSize?: number,
  ) => Promise<AxiosResponse<T>>;
  threshold?: number;
  hookEnabled?: boolean;
};

export default function useInfiniteScroll<T extends DefaultInfiniteScrollType>({
  root = null,
  target,
  onIntersect,
  threshold = 1.0,
  hookEnabled,
}: UseInfiniteScrollProps<T>) {
  const [cursorId, setCursorId] = useState<number | null>();
  const [pageSize, setPageSize] = useState<number>(5);
  const { execute, loading, error, data } = useAsync<T>({
    asyncFunction: async () => {
      const response = await onIntersect(cursorId, pageSize);
      setCursorId(response.data.cursorId || null);
      return response;
    },
  });

  const callback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (cursorId === null) return;
          if (loading) return;
          execute();
        }
      });
    },
    [execute, loading, cursorId],
  );

  useEffect(() => {
    if (!hookEnabled || loading || cursorId === null) return undefined;

    const observer = new IntersectionObserver(callback, {
      threshold,
      root: root?.current,
    });

    if (target?.current) {
      observer.observe(target.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [target, callback, hookEnabled, root, threshold, cursorId, loading]);

  return { loading, error, data, setPageSize };
}

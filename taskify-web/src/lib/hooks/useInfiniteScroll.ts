import { useCallback, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { useAsync } from './useAsync';

type UseInfiniteScrollProps<T> = {
  root?: React.RefObject<HTMLElement> | null;
  target: React.RefObject<HTMLElement>;
  onIntersect: () => Promise<AxiosResponse<T[]>>;
  threshold?: number;
  hookEnabled?: boolean;
};

export default function useInfiniteScroll<T>({
  root = null,
  target,
  onIntersect,
  threshold = 1.0,
  hookEnabled,
}: UseInfiniteScrollProps<T>) {
  const { execute, loading, error, data } = useAsync<T[]>({
    asyncFunction: onIntersect,
  });
  const callback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          execute();
        }
      });
    },
    [execute],
  );

  useEffect(() => {
    if (hookEnabled === false) return undefined;

    const observer = new IntersectionObserver(callback, {
      threshold,
      root: root?.current,
    });

    if (target.current) {
      observer.observe(target.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [target, callback, hookEnabled, root, threshold]);

  return { loading, error, data };
}

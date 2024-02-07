import { ReactNode, createContext, useContext, useMemo } from 'react';

type ColumnProviderProps = {
  children: ReactNode;
};

export const ColumnContext = createContext({
  /** TODO: 기본 데이터 전달 */
});

export default function ColumnProvider({ children }: ColumnProviderProps) {
  const contextValue = useMemo(() => ({}), []);
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

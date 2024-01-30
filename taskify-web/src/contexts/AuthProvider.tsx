import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import axios, { AxiosError } from 'axios';
import { axiosInstance } from '@/lib/api/axiosInstance';
import { SignInForm, UserData } from '@/components/commons/type';

type AuthContextType = {
  user: UserData | null;
  isPending: boolean;
  login: ({ email, password }: SignInForm) => Promise<void>;
  error: AxiosError | null;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isPending: true,
  login: async () => {},
  error: null,
});

type AuthProviderProps = { children: ReactNode };

export function AuthProvider({ children }: AuthProviderProps) {
  const [value, setValue] = useState<{
    user: UserData | null;
    isPending: boolean;
  }>({
    user: null,
    isPending: true,
  });
  const [axiosError, setAxiosError] = useState<AxiosError | null>(null);

  const router = useRouter();

  /**
   * @TODO getMyDashBoard 내 대시보드 데이터 가져오는 함수 추가해야됨
   * */

  const login = async ({ email, password }: SignInForm) => {
    try {
      setAxiosError(null);
      const res = await axiosInstance.post('auth/login', { email, password });
      setValue((prevValue) => ({ ...prevValue, user: res.data.user }));
      sessionStorage.setItem('accessToken', res.data.accessToken);

      /** @TODO mydashboard 데이터 가져오는 함수 호출 */
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setAxiosError(error);
      }
      return;
    }
    router.push('/mydashboard');
  };

  const memoizedValue = useMemo(
    () => ({
      user: value.user,
      isPending: value.isPending,
      login,
      error: axiosError,
    }),
    [value.user, value.isPending, login, axiosError],
  );
  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(required: boolean = false) {
  const context = useContext(AuthContext);
  const router = useRouter();
  if (!context) {
    throw new Error('반드시 AuthProvider 안에서 사용해야 합니다.');
  }

  useEffect(() => {
    if (required && !context.user && !context.isPending) {
      router.push('/signin');
    }
  }, [context.user, context.isPending, required, router]);

  return context;
}

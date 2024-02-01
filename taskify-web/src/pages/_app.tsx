import type { AppProps } from 'next/app';
import { AuthProvider } from '@/contexts/AuthProvider';
import '../styles/global.scss';
import { SidebarProvider } from '@/contexts/SidebarProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <Component {...pageProps} />
      </SidebarProvider>
    </AuthProvider>
  );
}

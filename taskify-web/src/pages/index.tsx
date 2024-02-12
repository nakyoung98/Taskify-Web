import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Footer } from '@/components/commons/ui-footer/Footer';
import MainHeader from '@/components/commons/ui-main-header/MainHeader';
import LandingLayout from '@/components/page-layout/landing-layout/LandingLayout';
import { useAuth } from '@/contexts/AuthProvider';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/mydashboard');
    }
  }, [user]);
  return (
    <LandingLayout
      header={<MainHeader themeColor="black" />}
      footer={<Footer />}
    />
  );
}

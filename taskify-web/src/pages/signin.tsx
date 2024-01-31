import { useEffect } from 'react';
import { useRouter } from 'next/router';
import SignInForm from '@/components/auth/feature-signin-form/SignInForm';
import { AuthFooter } from '@/components/auth/ui-auth-footer/AuthFooter';
import { AuthHeader } from '@/components/auth/ui-auth-header/AuthHeader';
import { AuthLayout } from '@/components/page-layout/auth-layout/AuthLayout';
import { useAuth } from '@/contexts/AuthProvider';

export default function SignIn() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.replace('/mydashboard');
    }
  }, [user, router]);

  return (
    <main>
      <AuthLayout
        authHeader={<AuthHeader />}
        authForm={<SignInForm />}
        authFooter={<AuthFooter />}
      />
    </main>
  );
}

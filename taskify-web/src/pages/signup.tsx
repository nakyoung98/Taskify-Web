import { useRouter } from 'next/router';
import { useEffect } from 'react';
import SignUpForm from '@/components/auth/feature-signup-form/SignUpForm';
import { AuthFooter } from '@/components/auth/ui-auth-footer/AuthFooter';
import { AuthHeader } from '@/components/auth/ui-auth-header/AuthHeader';
import { AuthLayout } from '@/components/page-layout/auth-layout/AuthLayout';
import { useAuth } from '@/contexts/AuthProvider';

export default function SignUp() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace('/mydashboard');
    }
  }, [user, router]);

  return (
    <main>
      <AuthLayout
        authHeader={<AuthHeader />}
        authForm={<SignUpForm />}
        authFooter={<AuthFooter />}
      />
    </main>
  );
}

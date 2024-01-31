import { AuthFooter } from '@/components/auth/ui-auth-footer/AuthFooter';
import { AuthHeader } from '@/components/auth/ui-auth-header/AuthHeader';
import { AuthLayout } from '@/components/page-layout/auth-layout/AuthLayout';

export default function SignUp() {
  return (
    <main>
      <AuthLayout
        authHeader={<AuthHeader />}
        authForm={<div>하이</div>}
        authFooter={<AuthFooter />}
      />
    </main>
  );
}

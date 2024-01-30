import { AuthHeader } from '@/components/auth/ui-auth-header/AuthHeader';
import { AuthLayout } from '@/components/page-layout/auth-layout/AuthLayout';

export default function SignIn() {
  return (
    <main>
      <AuthLayout
        authHeader={<AuthHeader />}
        authForm={<div>d</div>}
        authFooter={<div>d</div>}
      />
    </main>
  );
}

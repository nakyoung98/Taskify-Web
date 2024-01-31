import SignUpForm from '@/components/auth/feature-signup-form/SignUpForm';
import { AuthFooter } from '@/components/auth/ui-auth-footer/AuthFooter';
import { AuthHeader } from '@/components/auth/ui-auth-header/AuthHeader';
import { AuthLayout } from '@/components/page-layout/auth-layout/AuthLayout';

export default function SignUp() {
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

import SignInForm from '@/components/auth/feature-signin-form/SignInForm';
import { AuthFooter } from '@/components/auth/ui-auth-footer/AuthFooter';
import { AuthHeader } from '@/components/auth/ui-auth-header/AuthHeader';
import { AuthLayout } from '@/components/page-layout/auth-layout/AuthLayout';

export default function SignIn() {
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

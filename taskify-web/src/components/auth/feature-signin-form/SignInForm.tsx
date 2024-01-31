import { MouseEvent, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import { Input } from '@/components/commons/ui-input/Input';
import PasswordInput from '../ui-password-input/PasswordInput';
import Button from '@/components/commons/ui-button/Button';
import styles from './SignInForm.module.scss';
import { TEXT } from './constant';
import { useAuth } from '@/contexts/AuthProvider';
import { AuthModal } from '../ui-auth-modal/AuthModal';

const cx = classNames.bind(styles);

/** signInForm입니다. */
export default function SignInForm() {
  const { watch, control } = useForm({
    defaultValues: { email: '', password: '' },
    mode: 'onBlur',
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { login, error } = useAuth();

  /** AuthContext의 login 함수 실행시킴. */
  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const value = {
      email: watch('email'),
      password: watch('password'),
    };
    login({ email: value.email, password: value.password });
  };

  useEffect(() => {
    if (error) {
      setIsOpen(!isOpen);
    }
  }, [error]);

  return (
    <>
      <AuthModal
        isOpen={isOpen}
        messageType="signInError"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      />
      <form className={cx('form')}>
        <label className={cx('inputContainer')}>
          {TEXT.email.label}
          <Controller
            control={control}
            name="email"
            defaultValue=""
            rules={{
              required: TEXT.email.message.required,
              pattern: {
                value: /\S@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: TEXT.email.message.pattern,
              },
            }}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                placeholder={TEXT.email.message.required}
                hasError={Boolean(fieldState.error)}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
        </label>
        <label className={cx('inputContainer')}>
          {TEXT.password.label}
          <Controller
            control={control}
            name="password"
            defaultValue=""
            rules={{
              required: TEXT.password.message.required,
              pattern: {
                value: /^(?=.*[a-zA-Z0-9]).{8,25}$/,
                message: TEXT.password.message.pattern,
              },
            }}
            render={({ field, fieldState }) => (
              <PasswordInput
                {...field}
                placeholder={TEXT.password.message.required}
                hasError={Boolean(fieldState.error)}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
        </label>
        <div className={cx('buttonContainer')}>
          <Button
            disabled={!watch('email') || !watch('password')}
            size="large"
            isSubmitType
            onClick={handleSubmit}
          >
            {TEXT.button}
          </Button>
        </div>
      </form>
    </>
  );
}

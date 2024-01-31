import { useRouter } from 'next/router';
import { MouseEvent, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import styles from './SignUpForm.module.scss';
import { Input } from '@/components/commons/ui-input/Input';
import PasswordInput from '../ui-password-input/PasswordInput';
import Button from '@/components/commons/ui-button/Button';
import { TEXT } from './constant';
import { useAuth } from '@/contexts/AuthProvider';
import { AuthModal } from '../ui-auth-modal/AuthModal';

const cx = classNames.bind(styles);

export default function SignUpForm() {
  const router = useRouter();
  const { signup, success, error } = useAuth();
  const [modalStatus, setModalStatus] = useState<{
    isOpen: boolean;
    messageType: 'signUpError' | 'signUpSuccess';
  }>({ isOpen: false, messageType: 'signUpError' });
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<{
    email: boolean;
    nickname: boolean;
    password: boolean;
    passwordRepeat: boolean;
  }>({ email: false, password: false, passwordRepeat: false, nickname: false });

  const { control, watch, trigger, getFieldState } = useForm({
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      passwordRepeat: '',
    },
    mode: 'onBlur',
  });

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const value = {
      email: watch('email'),
      nickname: watch('nickname'),
      password: watch('password'),
    };
    signup({
      email: value.email,
      nickname: value.nickname,
      password: value.password,
    });
  };

  useEffect(() => {
    if (success) {
      setModalStatus((prevValues) => ({
        ...prevValues,
        isOpen: true,
        messageType: 'signUpSuccess',
      }));
    }
    if (error?.response?.status === 409) {
      setModalStatus((prevValues) => ({
        ...prevValues,
        isOpen: true,
        messageType: 'signUpError',
      }));
    }
  }, [success, error]);

  return (
    <>
      <AuthModal
        isOpen={modalStatus.isOpen}
        messageType={modalStatus.messageType}
        onClick={() => {
          if (modalStatus.messageType === 'signUpError') {
            setModalStatus((prevValues) => ({ ...prevValues, isOpen: false }));
          } else {
            setModalStatus((prevValues) => ({ ...prevValues, isOpen: false }));
            router.push('/signin');
          }
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
                onBlur={() => {
                  trigger('email').then(() => {
                    if (!getFieldState('email').invalid) {
                      setIsValid((prev) => ({ ...prev, email: true }));
                    } else {
                      setIsValid((prev) => ({ ...prev, email: false }));
                    }
                  });
                }}
                placeholder={TEXT.email.message.required}
                hasError={Boolean(fieldState.error)}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
        </label>
        <label className={cx('inputContainer')}>
          {TEXT.nickname.label}
          <Controller
            control={control}
            name="nickname"
            defaultValue=""
            rules={{
              required: TEXT.nickname.message.required,
              pattern: {
                value: /^.{1,10}$/,
                message: TEXT.nickname.message.pattern,
              },
            }}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                onBlur={() => {
                  trigger('nickname').then(() => {
                    if (!getFieldState('nickname').invalid) {
                      setIsValid({ ...isValid, nickname: true });
                    } else {
                      setIsValid({ ...isValid, nickname: false });
                    }
                  });
                }}
                placeholder={TEXT.nickname.message.required}
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
                onBlur={() => {
                  trigger('password').then(() => {
                    if (!getFieldState('password').invalid) {
                      setIsValid({ ...isValid, password: true });
                    } else {
                      setIsValid({ ...isValid, password: false });
                    }
                  });
                }}
                placeholder={TEXT.password.message.pattern}
                hasError={Boolean(fieldState.error)}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
        </label>
        <label className={cx('inputContainer')}>
          {TEXT.passwordRepeat.label}
          <Controller
            control={control}
            name="passwordRepeat"
            defaultValue=""
            rules={{
              required: TEXT.passwordRepeat.message.required,
              validate: (value) =>
                value === watch('password')
                  ? true
                  : TEXT.passwordRepeat.message.pattern,
            }}
            render={({ field, fieldState }) => (
              <PasswordInput
                {...field}
                onBlur={() => {
                  trigger('passwordRepeat').then(() => {
                    if (!getFieldState('passwordRepeat').invalid) {
                      setIsValid({ ...isValid, passwordRepeat: true });
                    } else {
                      setIsValid({ ...isValid, passwordRepeat: false });
                    }
                  });
                }}
                placeholder={TEXT.passwordRepeat.message.required}
                hasError={Boolean(fieldState.error)}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
        </label>
        <label className={cx('checkboxContainer')}>
          <input
            className={cx('checkbox')}
            type="checkbox"
            onClick={() => {
              setIsChecked(!isChecked);
            }}
          />{' '}
          {TEXT.policy}
        </label>
        <div className={cx('buttonContainer')}>
          <Button
            disabled={
              !isChecked ||
              !isValid.email ||
              !isValid.nickname ||
              !isValid.password ||
              !isValid.passwordRepeat
            }
            onClick={handleSubmit}
            size="large"
          >
            {TEXT.button}
          </Button>
        </div>
      </form>
    </>
  );
}

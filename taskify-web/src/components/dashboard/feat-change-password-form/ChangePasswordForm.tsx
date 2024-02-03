import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import styles from './ChangePasswordForm.module.scss';
import Button from '@/components/commons/ui-button/Button';
import PasswordInput from '@/components/auth/ui-password-input/PasswordInput';
import { useAuth } from '@/contexts/AuthProvider';

const cx = classNames.bind(styles);

/** 비밀번호를 변경하는 폼. mypage에서만 사용합니다. */
export default function ChangePasswordForm() {
  const { watch, control, trigger, getFieldState, setError } = useForm({
    defaultValues: { password: '', newPassword: '', newPasswordRepeat: '' },
    mode: 'onBlur',
  });
  const [isValid, setIsValid] = useState<{
    password: boolean;
    newPassword: boolean;
    newPasswordRepeat: boolean;
  }>({
    password: false,
    newPassword: false,
    newPasswordRepeat: false,
  });

  const { changePassword, error } = useAuth();

  const handleSubmit = async () => {
    const value = {
      password: watch('password'),
      newPassword: watch('newPassword'),
    };
    changePassword({
      password: value.password,
      newPassword: value.newPassword,
    });
  };

  useEffect(() => {
    if (error?.response?.status === 400) {
      if (error.response?.data) {
        const message = Object.values(error.response?.data);
        setError('password', { message: message[0] });
      }
    }
  }, [error]);

  /**
   * @TODO 비밀번호 제출시 에러 발생하면 현재 비밀번호에 띄움
   *  */

  return (
    <form className={cx('container')}>
      <h1 className={cx('title')}>비밀번호 변경</h1>
      <div className={cx('formContainer')}>
        <label className={cx('inputContainer')}>
          현재 비밀번호
          <Controller
            control={control}
            defaultValue=""
            name="password"
            rules={{
              required: '비밀번호를 입력해 주세요',
              pattern: {
                value: /^(?=.*[a-zA-Z0-9]).{8,25}$/,
                message: '8자 이상 작성해 주세요.',
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
                placeholder="현재 비밀번호 입력"
                hasError={Boolean(fieldState.error)}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
        </label>
        <label className={cx('inputContainer')}>
          새 비밀번호
          <Controller
            control={control}
            defaultValue=""
            name="newPassword"
            rules={{
              required: '비밀번호를 입력해 주세요',
              pattern: {
                value: /^(?=.*[a-zA-Z0-9]).{8,25}$/,
                message: '8자 이상 작성해 주세요.',
              },
            }}
            render={({ field, fieldState }) => (
              <PasswordInput
                {...field}
                onBlur={() => {
                  trigger('newPassword').then(() => {
                    if (!getFieldState('newPassword').invalid) {
                      setIsValid({ ...isValid, newPassword: true });
                    } else {
                      setIsValid({ ...isValid, newPassword: false });
                    }
                  });
                }}
                placeholder="새 비밀번호 입력"
                hasError={Boolean(fieldState.error)}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
        </label>
        <label className={cx('inputContainer')}>
          새 비밀번호 확인
          <Controller
            control={control}
            defaultValue=""
            name="newPasswordRepeat"
            rules={{
              required: '비밀번호를 한번 더 입력해 주세요',
              validate: (value) =>
                value === watch('newPassword')
                  ? true
                  : '비밀번호가 일치하지 않습니다.',
            }}
            render={({ field, fieldState }) => (
              <PasswordInput
                {...field}
                onBlur={() => {
                  trigger('newPasswordRepeat').then(() => {
                    if (!getFieldState('newPasswordRepeat').invalid) {
                      setIsValid({ ...isValid, newPasswordRepeat: true });
                    } else {
                      setIsValid({ ...isValid, newPasswordRepeat: false });
                    }
                  });
                }}
                placeholder="새 비밀번호 입력"
                hasError={Boolean(fieldState.error)}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
        </label>
      </div>

      <div className={cx('buttonContainer')}>
        <Button
          disabled={
            !isValid.password ||
            !isValid.newPassword ||
            !isValid.newPasswordRepeat
          }
          onClick={handleSubmit}
          size="medium"
        >
          변경
        </Button>
      </div>
    </form>
  );
}

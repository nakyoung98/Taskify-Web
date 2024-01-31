import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import styles from './SignUpForm.module.scss';
import { Input } from '@/components/commons/ui-input/Input';
import PasswordInput from '../ui-password-input/PasswordInput';
import Button from '@/components/commons/ui-button/Button';
import { TEXT } from './constant';

const cx = classNames.bind(styles);

export default function SignUpForm() {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const { control } = useForm({
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      passwordRepeat: '',
    },
    mode: 'onBlur',
  });
  return (
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
        {TEXT.nickname.label}
        <Controller
          control={control}
          name="nickname"
          defaultValue=""
          rules={{
            required: TEXT.nickname.message.required,
            pattern: {
              value: /^.{1,8}$/,
              message: TEXT.nickname.message.pattern,
            },
          }}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              placeholder="닉네임을 입력해 주세요"
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
              placeholder="8자 이상 입력해 주세요"
              hasError={Boolean(fieldState.error)}
              errorMessage={fieldState.error?.message}
            />
          )}
        />
      </label>
      <label className={cx('inputContainer')}>
        비밀번호 확인
        <Controller
          control={control}
          name="passwordRepeat"
          defaultValue=""
          render={({ field }) => <PasswordInput {...field} />}
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
        <Button disabled={!isChecked} onClick={() => {}} size="large">
          회원가입
        </Button>
      </div>
    </form>
  );
}

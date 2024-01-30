import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './PasswordInput.module.scss';
import { Input, InputProps } from '@/components/commons/ui-input/Input';
import EyeOnIcon from './eye-on.svg';
import EyeOffIcon from './eye-off.svg';

const cx = classNames.bind(styles);

// 기존 Input에서 type에 대한 타입만 제외합니다.
type PasswordInputProps = Omit<InputProps, 'type' | 'isModal'>;

export default function PasswordInput({
  value,
  onChange,
  placeholder,
  hasError = false,
  errorMessage,
  onBlur,
}: PasswordInputProps) {
  // 비밀번호 가림 여부
  const [isVisible, setIsVisible] = useState<boolean>(false);

  //   visible에 따른 타입 값
  const inputType = isVisible ? 'text' : 'password';

  return (
    <div className={cx('container')}>
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        hasError={hasError}
        errorMessage={errorMessage}
        onBlur={onBlur}
        type={inputType}
      />
      <button
        type="button"
        className={cx('button')}
        onClick={() => {
          setIsVisible(!isVisible);
        }}
      >
        {isVisible ? <EyeOnIcon /> : <EyeOffIcon />}
      </button>
    </div>
  );
}

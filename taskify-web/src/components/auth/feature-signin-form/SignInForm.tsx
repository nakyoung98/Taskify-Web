import classNames from 'classnames/bind';
import { Input } from '@/components/commons/ui-input/Input';
import PasswordInput from '../ui-password-input/PasswordInput';
import Button from '@/components/commons/ui-button/Button';
import styles from './SignInForm.module.scss';

const cx = classNames.bind(styles);

export default function SignInForm() {
  const submitType = true;
  return (
    <form className={cx('form')}>
      <div className={cx('inputContainer')}>
        <Input value="" onChange={() => {}} />
      </div>
      <div className={cx('inputContainer')}>
        <PasswordInput value="" onChange={() => {}} />
      </div>
      <div className={cx('buttonContainer')}>
        <Button size="large" isSubmitType={submitType} onClick={() => {}}>
          로그인
        </Button>
      </div>
    </form>
  );
}

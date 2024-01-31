import Link from 'next/link';
import classNames from 'classnames/bind';
import styles from './AuthFooter.module.scss';
import { ROUTE, TEXT } from './constant';

type AuthFooterProps = {
  isSignIn?: boolean;
};

const cx = classNames.bind(styles);

/**
 * 로그인 및 회원가입 페이지 footer입니다.
 * @props isSignIn : boolean값이며, 분기에 따라 텍스트가 달라집니다.
 * @default isSignIn=true
 */
export function AuthFooter({ isSignIn = true }: AuthFooterProps) {
  const textCase = isSignIn ? 'signIn' : 'signUp';
  return (
    <h2 className={cx('suggestion')}>
      {`${TEXT[textCase].suggestion} `}
      <Link href={ROUTE[textCase]} className={cx('link')}>
        {TEXT[textCase].link}
      </Link>
    </h2>
  );
}

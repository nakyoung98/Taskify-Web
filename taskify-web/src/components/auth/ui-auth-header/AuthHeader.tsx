import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from './AuthHeader.module.scss';
import { TEXT } from './constant';
import LogoIcon from './logo-icon.png';
import LogoText from './logo-text.png';

type AuthHeaderProps = {
  isSignIn?: boolean;
};

const cx = classNames.bind(styles);

/**
 *
 * @alert 로고랑 바로 아래 텍스트가 있는 auth페이지의 헤더입니다.
 * @props isSignIn 로그인창에서 사용할 때는 true, 회원가입 창일때는 false를 넣으면 됩니다.
 */
export function AuthHeader({ isSignIn = true }: AuthHeaderProps) {
  return (
    <header className={cx('header')}>
      <div className={cx('imageContainer')}>
        <div className={cx('logoIcon')}>
          <Image fill src={LogoIcon} alt="로고 아이콘" />
        </div>
        <Link href="/">
          <div className={cx('logoText')}>
            <Image fill src={LogoText} alt="로고 텍스트" />
          </div>
        </Link>
      </div>
      <h1 className={cx('slogan')}>{isSignIn ? TEXT.signIn : TEXT.signUp}</h1>
    </header>
  );
}

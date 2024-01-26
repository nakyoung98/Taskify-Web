import classNames from 'classnames/bind';
import Link from 'next/link';
import styles from './MainHeader.module.scss';

const cx = classNames.bind(styles);

type MainHeaderProps = {
  themeColor?: 'white' | 'black';
};
export default function MainHeader({ themeColor = 'white' }: MainHeaderProps) {
  return (
    <nav className={cx('container', themeColor)}>
      <Link href="/">
        <img
          className={cx('largeLogo', themeColor)}
          src="/images/large_logo.svg"
          alt="큰 로고 이미지"
        />
        <img
          className={cx('smallLogo', themeColor)}
          src="/images/small_logo.svg"
          alt="작은 로고 이미지"
        />
      </Link>

      <div className={cx('buttonWrap')}>
        <Link className={cx('button', themeColor)} href="/signin">
          로그인
        </Link>
        <Link className={cx('button', themeColor)} href="/signup">
          회원가입
        </Link>
      </div>
    </nav>
  );
}

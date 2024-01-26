import { MouseEventHandler } from 'react';
import classNames from 'classnames/bind';
import Link from 'next/link';
import styles from './MainHeader.module.scss';

const cx = classNames.bind(styles);

type MainHeaderProps = {
  themeColor?: 'white' | 'black';
  onClick: MouseEventHandler<HTMLButtonElement>;
};
export default function MainHeader({ themeColor, onClick }: MainHeaderProps) {
  return (
    <div className={cx('container', themeColor)}>
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
        <button
          className={cx('button', themeColor)}
          type="button"
          onClick={onClick}
        >
          로그인
        </button>
        <button
          className={cx('button', themeColor)}
          type="button"
          onClick={onClick}
        >
          회원가입
        </button>
      </div>
    </div>
  );
}

MainHeader.defaultProps = {
  themeColor: 'white',
};

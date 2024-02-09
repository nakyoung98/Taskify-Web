import Link from 'next/link';

import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { TEXT, SNS } from './constant';

const cx = classNames.bind(styles);

export function Footer() {
  return (
    <footer className={cx('container')}>
      <div className={cx('items')}>
        <span className={cx('copyright')}>{TEXT.codeit}</span>
        <div className={cx('links')}>
          <Link className={cx('link')} href="/policy">
            {TEXT.privacyPolicy}
          </Link>
          <Link className={cx('link')} href="/faq">
            {TEXT.faq}
          </Link>
        </div>
        <div className={cx('sns')}>
          {SNS.map((sns) => {
            return (
              <Link
                key={sns}
                href={`https://www.${sns}.com/`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`../../../images/${sns}.svg`}
                  alt={`${sns} 홈페이지로 연결된 ${sns} 로고`}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
}

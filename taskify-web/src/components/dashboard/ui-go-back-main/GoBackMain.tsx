import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './GoBackMain.module.scss';
import ArrowBackIcon from './arrow-back.svg';

type GoBackMainProps = {
  children: ReactNode;
};

const cx = classNames.bind(styles);

export default function GoBackMain({ children }: GoBackMainProps) {
  const router = useRouter();
  return (
    <div className={cx('container')}>
      <button
        type="button"
        className={cx('goBack')}
        onClick={() => {
          router.back();
        }}
      >
        <ArrowBackIcon className={cx('icon')} /> 돌아가기
      </button>
      {children}
    </div>
  );
}

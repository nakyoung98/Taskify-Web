import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './AuthLayout.module.scss';

type AuthLayoutProps = {
  authHeader: ReactNode;
  authForm: ReactNode;
  authFooter: ReactNode;
};

const cx = classNames.bind(styles);

export function AuthLayout({
  authHeader,
  authForm,
  authFooter,
}: AuthLayoutProps) {
  return (
    <article className={cx('main')}>
      <section className={cx('container')}>
        {authHeader}
        {authForm}
        {authFooter}
      </section>
    </article>
  );
}

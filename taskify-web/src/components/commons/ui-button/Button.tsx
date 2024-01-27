import { MouseEventHandler, ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

type ButtonProps = {
  theme?: 'primary' | 'secondary';
  disabled?: boolean;
  children: ReactNode;
  size?: 'large' | 'medium' | 'small' | 'modalMedium' | 'modalSmall';
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const cx = classNames.bind(styles);

// 기본적인 button 컴포넌트
export default function Button({
  theme = 'primary',
  disabled = false,
  children,
  size = 'medium',
  onClick,
}: ButtonProps) {
  return (
    <button
      className={cx(theme, size, 'btn')}
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

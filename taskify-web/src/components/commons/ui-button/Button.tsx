import { MouseEventHandler, ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

type ButtonProps = {
  theme?: 'primary' | 'secondary';
  disabled?: boolean;
  children: ReactNode;
  size?: 'large' | 'medium' | 'small' | 'modalMedium' | 'modalSmall';
  onClick: MouseEventHandler<HTMLButtonElement>;
  isSubmitType?: boolean;
};

const cx = classNames.bind(styles);

/**
 * 기본적인 버튼 컴포넌트
 * @props theme : primary(보라색)(기본값), secondary(흰색) 테마
 * @props disabled : true, false(기본값)
 * @props size : large(로그인용), medium(수락 거절용)(기본값), small(삭제 버튼용), modalMedium(모달 중형), modalSmall(모달 소형)
 * @props onClick : 클릭 이벤트(필수)
 * @props isSubmitType : false(기본) true(폼에서 엔터 누를시 자동 제출 되도록 하는용)
 */
export default function Button({
  theme = 'primary',
  disabled = false,
  children,
  size = 'medium',
  onClick,
  isSubmitType = false,
}: ButtonProps) {
  return (
    <button
      className={cx(theme, size, 'btn')}
      type={isSubmitType ? 'submit' : 'button'}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

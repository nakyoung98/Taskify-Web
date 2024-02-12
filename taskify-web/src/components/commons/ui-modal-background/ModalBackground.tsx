import classNames from 'classnames/bind';
import { ReactNode } from 'react';
import { Portal } from '../ui-portal/Portal';
import styles from './ModalBackground.module.scss';

const cx = classNames.bind(styles);

// 모달에 들어가는 프롭 타입 선언
type ModalProps = {
  children: ReactNode;
  isOpen?: boolean;
};

/**
 *
 * 모달창 바깥 검은화면
 * @props children : html 요소
 * @props isOpen : 모달창 열고 닫기 값(참 거짓)
 * @alert Modal 컴포넌트에서 사용하는 컴포넌트로, 직접 사용하지 않습니다.
 */
export function ModalBackground({ children, isOpen = false }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <div className={cx('container')}>{children}</div>
    </Portal>
  );
}

import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './ModalContainer.module.scss';

type ModalContainerProps = {
  children: ReactNode;
};

const cx = classNames.bind(styles);

/**
 * 모달창 겉 껍데기 컨테이너 컴포넌트
 * @props children - html 요소
 * @alert - Modal 컴포넌트에 사용되는 컴포넌트로, 직접 안쓰는 컴포넌트입니다.
 */
export function ModalContainer({ children }: ModalContainerProps) {
  return <div className={cx('container')}>{children}</div>;
}

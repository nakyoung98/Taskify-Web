import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import { ModalBackground } from '../ui-modal-background/ModalBackground';

type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
};

const cx = classNames.bind(styles);

/**
 * 모달 기본 컨테이너
 * @props : isOpen - 모달 보임 여부
 * @props : children - ModalContentBox 컴포넌트를 안에 넣어주세요
 *
 * @alert 모달을 사용할 때 이 컴포넌트를 사용하세요
 *  */
export function Modal({ isOpen, children }: ModalProps) {
  return (
    <ModalBackground isOpen={isOpen}>
      <div className={cx('container')}>{children}</div>
    </ModalBackground>
  );
}

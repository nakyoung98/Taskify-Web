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
 * @props : children - html 요소
 *
 * @alert 모달의 기본 골조입니다. AlertModal, 등등으로 분기해서 맞게 사용하면 될 것 같습니다.
 *  */
export function Modal({ isOpen, children }: ModalProps) {
  return (
    <ModalBackground isOpen={isOpen}>
      <div className={cx('container')}>{children}</div>
    </ModalBackground>
  );
}

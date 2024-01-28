import { ReactNode } from 'react';
import { ModalBackground } from '../ui-modal-background/ModalBackground';
import { ModalContainer } from '../ui-modal-container/ModalContainer';

type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
};

/**
 * 모달 기본 컨테이너
 * @props : isOpen - 모달 보임 여부
 * @props : children - html 요소
 *
 * @alert 모달을 사용할 때 이 컴포넌트를 사용하세요
 *  */
export function Modal({ isOpen, children }: ModalProps) {
  return (
    <ModalBackground isOpen={isOpen}>
      <ModalContainer>{children}</ModalContainer>
    </ModalBackground>
  );
}

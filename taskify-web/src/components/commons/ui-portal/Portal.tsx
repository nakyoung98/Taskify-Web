import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  children: ReactNode;
  container?: Element | DocumentFragment | null;
};

/**
 * @params : children - 내용물로 넣을 컨테이너를 넣으시면 됩니다.
 * @params : container - children을 배치하기 위해 하위로 넣어줄 부모요소를 넣으면 됩니다. */
export const Portal = ({ children, container }: PortalProps) => {
  const [mountNode, setMountNode] = useState<Element | DocumentFragment | null>(
    null,
  );

  useEffect(() => {
    setMountNode(container || document.body);
  }, [container]);

  return mountNode ? createPortal(children, mountNode) : mountNode;
};

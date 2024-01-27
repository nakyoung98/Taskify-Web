import { HTMLProps } from 'react';

type MainProp = Pick<HTMLProps<HTMLDivElement>, 'children'>;

function SidebarMain({ children }: MainProp) {
  return <div>{children}</div>;
}

export default SidebarMain;

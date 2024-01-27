import { HTMLProps } from 'react';

type HeaderProp = Pick<HTMLProps<HTMLDivElement>, 'children'>;

function SidebarHeader({ children }: HeaderProp) {
  return <header>{children}</header>;
}

export default SidebarHeader;

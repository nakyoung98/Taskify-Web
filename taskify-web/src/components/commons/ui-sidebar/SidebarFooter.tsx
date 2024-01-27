import { HTMLProps } from 'react';

type FooterProp = Pick<HTMLProps<HTMLDivElement>, 'children'>;

function SidebarFooter({ children }: FooterProp) {
  return <footer>{children}</footer>;
}

export default SidebarFooter;

import UiSideBar from '@/components/commons/ui-sidebar/Sidebar';
import SidebarHeader from '@/components/commons/ui-sidebar/SidebarHeader';
import SidebarMain from '@/components/commons/ui-sidebar/SidebarMain';

/** sidebar 기능적 컴포넌트입니다.
 * 기능동작 관련은 여기서 구현하면 될 것 같습니다. */
export default function SideBar() {
  return (
    <UiSideBar>
      <SidebarHeader />
      <SidebarMain>
        <p>main</p>
        <p>💜</p>
        <p>🩷</p>
        <p>💚</p>
        <p>💙</p>
        <p>🩵</p>
        <p>🖤</p>
        <p>💛</p>
      </SidebarMain>
      {/** @TODO SideBarFooter 위치 */}
    </UiSideBar>
  );
}

import UiSideBar from '@/components/commons/ui-sidebar/Sidebar';
import SidebarFooter from '@/components/commons/ui-sidebar/SidebarFooter';
import SidebarHeader from '@/components/commons/ui-sidebar/SidebarHeader';
import SidebarMain from '@/components/commons/ui-sidebar/SidebarMain';

export default function SideBar() {
  return (
    <UiSideBar>
      <SidebarHeader>
        <p>headerheaderheader</p>
      </SidebarHeader>
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
      <SidebarFooter>
        <p>footer</p>
        <p>설정</p>
        <p>프로필</p>
      </SidebarFooter>
    </UiSideBar>
  );
}

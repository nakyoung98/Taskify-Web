import { useRouter } from 'next/router';
import SubHeader from './SubHeader';
import SubHeaderName from './SubHeaderName';
import SubHeaderItems from './SubHeaderItems';
import ProfileLabel from '../ui-profile-Label/ProfileLabel';
import DashboardUserList from './DashboardUserList';
import SubHeaderButton from './SubHeaderButton';
import DashboardItemsProvider from './Line.svg';
import SubHeaderItemsLeft from './SubHeaderItemsLeft';
import SubHeaderItemsRight from './SubHeaderItemsRight';
import DashboardInfoLabel from '../ui-dashboard-info-label/DashboardInfoLabel';
import Dropdown from '../ui-dropdown/Dropdown';
import { TEXT } from './constant';

export default function DashboardSubHeader() {
  const { subHeaderButtonList } = TEXT;
  const router = useRouter();
  const currentPath = router.pathname;
  const IsMyDashboard = currentPath === '/mydashboard';

  const handleRouteOnClick = async (e: React.MouseEvent) => {
    const input = e.target as HTMLElement;
    if (input.innerText === '로그아웃') {
      router.push('/');
      sessionStorage.removeItem('accessToken');
    }
    if (input.innerText === '내 정보') {
      router.push('/mypage');
    }
    if (input.innerText === '내 대시보드') {
      router.push('/mydashboard');
    }
  };

  return (
    <SubHeader>
      <SubHeaderName>
        <DashboardInfoLabel location="header" text="" isOwner={IsMyDashboard} />
      </SubHeaderName>
      <SubHeaderItems>
        <SubHeaderItemsLeft>
          <SubHeaderButton id={null} />
        </SubHeaderItemsLeft>
        <SubHeaderItemsRight>
          {IsMyDashboard && <DashboardUserList memberData="" />}
          {IsMyDashboard && <DashboardItemsProvider />}
          <Dropdown
            buttonList={subHeaderButtonList}
            onClick={handleRouteOnClick}
          >
            <ProfileLabel id={0} email="" nickname="" profileImageUrl="" />
          </Dropdown>
        </SubHeaderItemsRight>
      </SubHeaderItems>
    </SubHeader>
  );
}

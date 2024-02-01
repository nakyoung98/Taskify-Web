import { useRouter } from 'next/router';
import DashboardInfoLabel from '@/components/commons/ui-dashboard-info-label/DashboardInfoLabel';
import Dropdown from '@/components/commons/ui-dropdown/Dropdown';
import ProfileLabel from '@/components/commons/ui-profile-Label/ProfileLabel';
import DashboardUserList from '@/components/commons/ui-sub-header/DashboardUserList';
import UiSubHeader from '@/components/commons/ui-sub-header/SubHeader';
import SubHeaderButton from '@/components/commons/ui-sub-header/SubHeaderButton';
import SubHeaderItems from '@/components/commons/ui-sub-header/SubHeaderItems';
import SubHeaderItemsLeft from '@/components/commons/ui-sub-header/SubHeaderItemsLeft';
import SubHeaderItemsRight from '@/components/commons/ui-sub-header/SubHeaderItemsRight';
import SubHeaderName from '@/components/commons/ui-sub-header/SubHeaderName';
import { TEXT } from '@/components/commons/ui-sub-header/constant';

/** 기능 동작하는 subheader 컴포넌트 입니다. 여기서 기능적인 부분 구현하면 될 것 같습니다.
 * 데이터는 일단 예시로 작성한걸로 적용했습니다.
 */
export default function SubHeader() {
  const { subHeaderButtonList } = TEXT;
  const router = useRouter();
  const currentPath = router.pathname;
  const IsMyDashboard = currentPath === '/mydashboard';

  const handleRouteOnClick = async (e: React.MouseEvent) => {
    const input = e.target as HTMLElement;
    if (input.innerText === '로그아웃') {
      router.push('/');
      sessionStorage.clear();
    }
    if (input.innerText === '내 정보') {
      router.push('/mypage');
    }
    if (input.innerText === '내 대시보드') {
      router.push('/mydashboard');
    }
  };

  const TestUser = {
    id: 0,
    email: 'bayoucheol@test.com',
    nickname: '배유철',
    profileImageUrl: '',
  };

  const memberData = {
    members: [
      {
        id: 0,
        userId: 5,
        email: 'ytring@test.com',
        nickname: '1',
        profileImageUrl: 'string',
      },
      {
        id: 1,
        userId: 6,
        email: 'ctring@test.com',
        nickname: '2',
        profileImageUrl: 'string',
      },
      {
        id: 2,
        userId: 7,
        email: 'jtring@test.com',
        nickname: '3',
        profileImageUrl: 'string',
      },
      {
        id: 3,
        userId: 8,
        email: 'ktring@test.com',
        nickname: '4',
        profileImageUrl: 'string',
      },
      {
        id: 4,
        userId: 9,
        email: 'string',
        nickname: '5',
        profileImageUrl: 'string',
      },
      {
        id: 5,
        userId: 10,
        email: 'string',
        nickname: '6',
        profileImageUrl: 'string',
      },
    ],

    totalCount: 6,
  };
  return (
    <UiSubHeader>
      <SubHeaderName>
        <DashboardInfoLabel
          location="header"
          text="비브리지"
          isOwner={!IsMyDashboard}
        />
      </SubHeaderName>
      <SubHeaderItems>
        <SubHeaderItemsLeft>
          <SubHeaderButton id={2} />
        </SubHeaderItemsLeft>
        <SubHeaderItemsRight>
          <DashboardUserList memberData={memberData} />
          {/* {!IsMyDashboard && <DashboardItemsProvider />} */}
          <Dropdown
            buttonList={subHeaderButtonList}
            onClick={handleRouteOnClick}
          >
            <ProfileLabel
              id={TestUser.id}
              email={TestUser.email}
              nickname={TestUser.nickname}
              profileImageUrl={TestUser.profileImageUrl}
            />
          </Dropdown>
        </SubHeaderItemsRight>
      </SubHeaderItems>
    </UiSubHeader>
  );
}

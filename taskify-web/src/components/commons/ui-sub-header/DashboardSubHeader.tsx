import SubHeader from './SubHeader';
import SubHeaderName from './SubHeaderName';
import SubHeaderItems from './SubHeaderItems';
import MyProfile from './MyProfile';
import DashboardName from './DashboardName';
import DashboardUserList from './DashboardUserList';
import SubHeaderButton from './SubHeaderButton';

export default function DashboardSubHeader() {
  return (
    <SubHeader>
      <SubHeaderName>
        <DashboardName title="내 대시보드" id={222} />
      </SubHeaderName>
      <SubHeaderItems>
        <SubHeaderButton id={222} />
        <DashboardUserList />
        <MyProfile nickname="배유철" profileImageUrl="" />
      </SubHeaderItems>
    </SubHeader>
  );
}

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
        <DashboardName />
      </SubHeaderName>
      <SubHeaderItems>
        <SubHeaderButton />
        <DashboardUserList />
        <MyProfile />
      </SubHeaderItems>
    </SubHeader>
  );
}

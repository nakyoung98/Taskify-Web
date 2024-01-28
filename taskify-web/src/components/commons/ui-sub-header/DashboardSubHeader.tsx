import SubHeader from './SubHeader';
import SubHeaderName from './SubHeaderName';
import SubHeaderItems from './SubHeaderItems';
import MyProfile from './MyProfile';
import DashboardName from './DashboardName';
import DashboardUserList from './DashboardUserList';
import SubHeaderButton from './SubHeaderButton';
import DashboardItemsProvider from './Line.svg';
import SubHeaderItemsLeft from './SubHeaderItemsLeft';
import SubHeaderItemsRight from './SubHeaderItemsRight';

export default function DashboardSubHeader() {
  return (
    <SubHeader>
      <SubHeaderName>
        <DashboardName />
      </SubHeaderName>
      <SubHeaderItems>
        <SubHeaderItemsLeft>
          <SubHeaderButton />
        </SubHeaderItemsLeft>
        <SubHeaderItemsRight>
          <DashboardUserList />
          <DashboardItemsProvider />
          <MyProfile />
        </SubHeaderItemsRight>
      </SubHeaderItems>
    </SubHeader>
  );
}

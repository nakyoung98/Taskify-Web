import SubHeader from './SubHeader';
import SubHeaderName from './SubHeaderName';
import SubHeaderItems from './SubHeaderItems';
import MyProfile from '../ui-profile/Profile';
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
        <DashboardName title="" id={0} />
      </SubHeaderName>
      <SubHeaderItems>
        <SubHeaderItemsLeft>
          <SubHeaderButton id={0} />
        </SubHeaderItemsLeft>
        <SubHeaderItemsRight>
          <DashboardUserList />
          <DashboardItemsProvider />
          <MyProfile nickname="" profileImageUrl="" />
        </SubHeaderItemsRight>
      </SubHeaderItems>
    </SubHeader>
  );
}

import SubHeader from './SubHeader';
import SubHeaderName from './SubHeaderName';
import SubHeaderItems from './SubHeaderItems';
import ProfileLabel from '../ui-profile-Label/ProfileLabel';
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
        <DashboardName title="" id={null} />
      </SubHeaderName>
      <SubHeaderItems>
        <SubHeaderItemsLeft>
          <SubHeaderButton id={null} />
        </SubHeaderItemsLeft>
        <SubHeaderItemsRight>
          <DashboardUserList />
          <DashboardItemsProvider />
          <ProfileLabel nickname="" profileImageUrl="" />
        </SubHeaderItemsRight>
      </SubHeaderItems>
    </SubHeader>
  );
}

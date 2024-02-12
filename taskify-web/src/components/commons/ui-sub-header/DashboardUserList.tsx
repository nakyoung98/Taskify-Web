import classNames from 'classnames/bind';
import { useMembers } from '@/contexts/MemberProvider';
import UserBadge from '../ui-user-badge/UserBadge';
import getWindowSize from './utils/getWindowSize';
import getRandomColor from './utils/getRandomColor';
import getRemainNumber from './utils/getRemainNumber';
import styles from './DashboardUserList.module.scss';

const cx = classNames.bind(styles);

export default function DashboardUserList() {
  const { width } = getWindowSize();
  const { membersData } = useMembers();

  return (
    <div className={cx('container')}>
      <div className={cx('memberList')}>
        {membersData &&
          membersData.data?.members.map((member) => {
            return (
              <UserBadge
                location="header"
                key={member.id}
                color={getRandomColor(member.userId)}
                text={member.email}
                profileImageUrl={member.profileImageUrl}
              />
            );
          })}
        {getRemainNumber(width, membersData.data?.totalCount || 0) > 0 && (
          <UserBadge
            location="header"
            color="pink"
            text={`+${getRemainNumber(width, membersData.data?.totalCount || 0)}`}
            profileImageUrl=""
            IsTwoWord
          />
        )}
      </div>
    </div>
  );
}

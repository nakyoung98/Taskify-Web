import classNames from 'classnames/bind';
import styles from './DashboardUserList.module.scss';
import UserBadge from '../ui-user-badge/UserBadge';
import getWindowSize from './utils/getWindowSize';
import getRandomColor from './utils/getRandomColor';
import getRemainNumber from './utils/getRemainNumber';

const cx = classNames.bind(styles);

type Members = {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
};

type DashboardUserListProps = {
  memberData: {
    members: Array<Members>;
    totalCount: number;
  };
};

export default function DashboardUserList({
  memberData,
}: DashboardUserListProps) {
  const { members, totalCount } = memberData;
  const { width } = getWindowSize();
  const remainNumber = getRemainNumber(width, totalCount);

  return (
    <div className={cx('container')}>
      <div className={cx('memberList')}>
        {members.map((member) => (
          <UserBadge
            key={member.id}
            color={getRandomColor(member.userId)}
            text={member.email}
            profileImageUrl=""
          />
        ))}
        <UserBadge
          color="pink"
          text={`+${remainNumber}`}
          profileImageUrl=""
          IsTwoWord
        />
      </div>
    </div>
  );
}

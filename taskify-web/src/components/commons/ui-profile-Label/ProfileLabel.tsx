import classNames from 'classnames/bind';
import styles from './ProfileLabel.module.scss';
import UserBadge from '../ui-user-badge/UserBadge';
import getRandomColor from '../ui-sub-header/utils/getRandomColor';

const cx = classNames.bind(styles);

type ProfileLabelProps = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
};

export default function ProfileLabel({
  id,
  email,
  nickname,
  profileImageUrl,
}: ProfileLabelProps) {
  return (
    <div className={cx('container')}>
      <UserBadge
        color={getRandomColor(id)}
        text={email}
        profileImageUrl={profileImageUrl}
      />
      <span className={cx('ProfileLabelName')}>{nickname}</span>
    </div>
  );
}

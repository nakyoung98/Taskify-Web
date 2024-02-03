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
  position?: 'header' | 'dropdown' | 'card';
};

export default function ProfileLabel({
  id,
  email,
  nickname,
  profileImageUrl,
  position = 'header',
}: ProfileLabelProps) {
  return (
    <div className={cx('container')}>
      <UserBadge
        color={getRandomColor(id)}
        text={email}
        profileImageUrl={profileImageUrl}
      />
      <span className={cx('ProfileLabelName', position)}>{nickname}</span>
    </div>
  );
}

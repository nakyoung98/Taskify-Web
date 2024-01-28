import classNames from 'classnames/bind';
import styles from './MyProfile.module.scss';

const cx = classNames.bind(styles);

type MyProfileProps = {
  nickname: string;
  profileImageUrl: string;
};

export default function MyProfile({
  nickname,
  profileImageUrl,
}: MyProfileProps) {
  return (
    <div className={cx('container')}>
      <img
        className={cx('myProfileImage')}
        src={profileImageUrl}
        alt="내 프로필 이미지"
      />
      <span className={cx('myProfileName')}>{nickname}</span>
    </div>
  );
}

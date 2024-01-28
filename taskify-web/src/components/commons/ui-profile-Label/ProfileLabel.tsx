import classNames from 'classnames/bind';
import styles from './ProfileLabel.module.scss';

const cx = classNames.bind(styles);

type ProfileLabelProps = {
  nickname: string;
  profileImageUrl: string;
};

export default function ProfileLabel({
  nickname,
  profileImageUrl,
}: ProfileLabelProps) {
  return (
    <div className={cx('container')}>
      <img
        className={cx('ProfileLabelImage')}
        src={profileImageUrl}
        alt="내 프로필 이미지"
      />
      <span className={cx('ProfileLabelName')}>{nickname}</span>
    </div>
  );
}

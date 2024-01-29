import classNames from 'classnames/bind';
import styles from './UserBadge.module.scss';

const cx = classNames.bind(styles);

type UserBadgeProps = {
  color: 'orange' | 'pink' | 'brown' | 'sky';
  text: string;
  profileImageUrl?: string;
};

export default function UserBadge({
  color,
  text,
  profileImageUrl = '',
}: UserBadgeProps) {
  const firstWord = text.charAt(0);

  return (
    <div>
      {profileImageUrl ? (
        <img
          className={cx('Badge')}
          src={profileImageUrl}
          alt="프로필 이미지"
        />
      ) : (
        <div className={cx('Badge', color)}>
          <span className={cx('Badge-text')}>{firstWord}</span>
        </div>
      )}
    </div>
  );
}

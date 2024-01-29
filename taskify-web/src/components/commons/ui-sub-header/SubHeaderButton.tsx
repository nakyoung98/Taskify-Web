import classNames from 'classnames/bind';
import SettingIcon from './Setting.svg';
import InviteIcon from './Invite.svg';
import styles from './SubHeaderButton.module.scss';

const cx = classNames.bind(styles);

type SubHeaderButtonProps = {
  id?: number | null;
};

export default function SubHeaderButton({ id = null }: SubHeaderButtonProps) {
  return (
    <>
      {id && (
        <button className={cx('button', 'setting')} type="button">
          <SettingIcon />
          <span>관리</span>
        </button>
      )}
      <button className={cx('button', 'invite')} type="button">
        <InviteIcon />
        <span>초대하기</span>
      </button>
    </>
  );
}

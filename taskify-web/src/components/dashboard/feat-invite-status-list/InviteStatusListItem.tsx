import classNames from 'classnames/bind';
import styles from './InviteStatusListItem.module.scss';
import Button from '@/components/commons/ui-button/Button';

const cx = classNames.bind(styles);

export default function InviteStatusListItem() {
  return (
    <li className={cx('container')}>
      <div className={cx('email')}>이메일</div>
      <Button onClick={() => {}} size="small" theme="secondary">
        취소
      </Button>
    </li>
  );
}

import classNames from 'classnames/bind';
import styles from './InviteStatusListItem.module.scss';
import Button from '@/components/commons/ui-button/Button';
import { Invitation } from '@/types/dashboard';

const cx = classNames.bind(styles);

type InvitedStatusListItemProps = {
  data: Invitation | undefined;
};

export default function InviteStatusListItem({
  data,
}: InvitedStatusListItemProps) {
  return (
    <li className={cx('container')}>
      {data && (
        <>
          <div className={cx('email')}>{data.invitee.email || ''}</div>
          <Button onClick={() => {}} size="small" theme="secondary">
            취소
          </Button>
        </>
      )}
    </li>
  );
}

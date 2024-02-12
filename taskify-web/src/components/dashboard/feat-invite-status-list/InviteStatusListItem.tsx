import { useRouter } from 'next/router';
import classNames from 'classnames/bind';
import { useMembers } from '@/contexts/MemberProvider';
import Button from '@/components/commons/ui-button/Button';
import { Invitation } from '@/types/dashboard';
import styles from './InviteStatusListItem.module.scss';

const cx = classNames.bind(styles);

type InvitedStatusListItemProps = {
  data: Invitation | undefined;
};

export default function InviteStatusListItem({
  data,
}: InvitedStatusListItemProps) {
  const router = useRouter();
  const { boardId } = router.query;
  const { cancelInviteMember } = useMembers();
  return (
    <li className={cx('container')}>
      {data && (
        <>
          <div className={cx('email')}>{data.invitee.email || ''}</div>
          <Button
            onClick={() => {
              cancelInviteMember(boardId as string, data.id);
            }}
            size="small"
            theme="secondary"
          >
            취소
          </Button>
        </>
      )}
    </li>
  );
}

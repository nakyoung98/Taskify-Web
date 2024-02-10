import classNames from 'classnames/bind';
import styles from './InvitedList.module.scss';
import Button from '@/components/commons/ui-button/Button';

const cx = classNames.bind(styles);

type InvitedListListProps = {
  boardName: string;
  inviter: string;
  InvitationId: number;
  acceptInvitation: (InvitationId: number) => Promise<void>;
  refuseInvitation: (InvitationId: number) => Promise<void>;
};

export default function InvitedList({
  boardName,
  inviter,
  InvitationId,
  acceptInvitation,
  refuseInvitation,
}: InvitedListListProps) {
  return (
    <div className={cx('container')}>
      <div className={cx('board-mobile-container')}>
        <span className={cx('board-mobile-menu')}>이름</span>
        <span className={cx('board-name')}>{boardName}</span>
      </div>
      <div className={cx('board-mobile-container')}>
        <span className={cx('board-mobile-menu')}>초대자</span>
        <span className={cx('board-inviter')}>{inviter}</span>
      </div>
      <div className={cx('board-button')}>
        <Button
          theme="primary"
          onClick={() => acceptInvitation(InvitationId)}
          size="medium"
        >
          수락
        </Button>
        <Button
          theme="secondary"
          onClick={() => refuseInvitation(InvitationId)}
          size="medium"
        >
          거절
        </Button>
      </div>
    </div>
  );
}

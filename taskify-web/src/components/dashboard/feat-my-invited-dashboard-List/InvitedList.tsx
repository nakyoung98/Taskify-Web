import classNames from 'classnames/bind';
import styles from './InvitedList.module.scss';
import Button from '@/components/commons/ui-button/Button';
import { axiosInstance } from '@/lib/api/axiosInstance';

const cx = classNames.bind(styles);

type InvitedListListProps = {
  boardName: string;
  inviter: string;
  InvitationId: number;
  isAccept: boolean;
  setIsAccept: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function InvitedList({
  boardName,
  inviter,
  InvitationId,
  setIsAccept,
  isAccept,
}: InvitedListListProps) {
  const acceptInvitation = async () => {
    try {
      await axiosInstance.put(`invitations/${InvitationId}`, {
        inviteAccepted: true,
      });
    } catch (error) {
      console.log(error);
    }
    setIsAccept(!isAccept);
  };

  const refuseInvitation = async () => {
    try {
      await axiosInstance.put(`invitations/${InvitationId}`, {
        inviteAccepted: false,
      });
    } catch (error) {
      console.log(error);
    }
    setIsAccept(!isAccept);
  };

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
        <Button theme="primary" onClick={acceptInvitation} size="medium">
          수락
        </Button>
        <Button theme="secondary" onClick={refuseInvitation} size="medium">
          거절
        </Button>
      </div>
    </div>
  );
}

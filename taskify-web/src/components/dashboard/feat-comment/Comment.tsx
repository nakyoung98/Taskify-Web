import dayjs from 'dayjs';
import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import { CommentData } from '@/types/comments';
import UserBadge from '@/components/commons/ui-user-badge/UserBadge';

const cx = classNames.bind(styles);

type CommentProps = {
  data: CommentData;
};

export function Comment({ data }: CommentProps) {
  return (
    <div key={data.id} className={cx('container')}>
      <UserBadge
        color="orange"
        text={data.author.nickname}
        location="card"
        profileImageUrl={data.author.profileImageUrl}
      />
      <div className={cx('commentContainer')}>
        <div className={cx('commentHeader')}>
          <span className={cx('nickname')}>{data.author.nickname}</span>
          <span className={cx('date')}>
            {dayjs(data.updatedAt).format('YYYY-MM-DD HH:mm')}
          </span>
        </div>
        <p className={cx('content')}>{data.content}</p>
        <div className={cx('buttonContainer')}>
          <button type="button" className={cx('button')} onClick={() => {}}>
            수정
          </button>
          <button type="button" className={cx('button')} onClick={() => {}}>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}

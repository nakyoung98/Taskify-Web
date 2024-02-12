import { useState } from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames/bind';
import { CommentData } from '@/types/comments';
import UserBadge from '@/components/commons/ui-user-badge/UserBadge';
import CommentTextarea from '@/components/commons/ui-comment-textarea/CommentTextarea';
import { useComment } from '@/contexts/CommentProvider';
import { useAuth } from '@/contexts/AuthProvider';
import styles from './Comment.module.scss';

const cx = classNames.bind(styles);

type CommentProps = {
  data: CommentData;
};

export function Comment({ data }: CommentProps) {
  const [isTextBoxOpen, setIsTextBoxOpen] = useState<boolean>(false);
  const [editedComment, setEditedComment] = useState<string>(data.content);

  const { putComments, deleteComments } = useComment();
  const { user } = useAuth();
  const handleSubmit = async () => {
    if (user?.id === data.author.id) {
      await putComments({
        commentId: data.id,
        cardId: data.cardId,
        content: editedComment,
      });
      setIsTextBoxOpen(false);
    }
  };

  const handleDelete = async () => {
    if (user?.id === data.author.id) {
      deleteComments({ cardId: data.cardId, commentId: data.id });
    }
  };

  return isTextBoxOpen ? (
    <CommentTextarea
      value={editedComment}
      onChange={(e) => {
        setEditedComment(e.target.value);
      }}
      onClick={handleSubmit}
      onCancel={() => {
        setIsTextBoxOpen(false);
      }}
      isEdit
      disabled={editedComment === data.content}
      buttonText="수정"
    />
  ) : (
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
          <button
            type="button"
            className={cx('button')}
            onClick={() => {
              setIsTextBoxOpen(true);
            }}
          >
            수정
          </button>
          <button type="button" className={cx('button')} onClick={handleDelete}>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}

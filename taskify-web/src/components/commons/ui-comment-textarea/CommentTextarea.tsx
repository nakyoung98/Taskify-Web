import { useState, ChangeEvent } from 'react';
import classNames from 'classnames/bind';
import Button from '../ui-button/Button';
import styles from './CommentTextarea.module.scss';

const cx = classNames.bind(styles);

export default function TextareaComponent() {
  const [comment, setComment] = useState('');
  const ButtonText = '입력';

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return (
    <div className={cx('commentTextarea-container')}>
      <textarea
        id="commentTextarea"
        name="commentTextarea"
        rows={4}
        cols={50}
        value={comment}
        placeholder="댓글 작성하기"
        onChange={handleTextareaChange}
      />
      <div className={cx('commentTextarea-button')}>
        <Button size="small" theme="secondary" onClick={() => {}}>
          {ButtonText}
        </Button>
      </div>
    </div>
  );
}

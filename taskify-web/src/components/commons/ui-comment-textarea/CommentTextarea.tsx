import { MouseEventHandler } from 'react';
import classNames from 'classnames/bind';
import Button from '../ui-button/Button';
import styles from './CommentTextarea.module.scss';

const cx = classNames.bind(styles);

type TextareaComponentProps = {
  onButtonClick: MouseEventHandler<HTMLButtonElement>;
};

export default function CommentTextarea({
  onButtonClick,
}: TextareaComponentProps) {
  return (
    <div className={cx('commentTextarea-container')}>
      <textarea
        id="commentTextarea"
        name="commentTextarea"
        rows={4}
        cols={50}
        placeholder="댓글 작성하기"
      />
      <div className={cx('commentTextarea-button')}>
        <Button size="small" theme="secondary" onClick={onButtonClick}>
          입력
        </Button>
      </div>
    </div>
  );
}

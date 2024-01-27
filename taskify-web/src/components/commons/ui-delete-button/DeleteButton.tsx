import { MouseEventHandler } from 'react';
import classNames from 'classnames/bind';
import styles from './DeleteButton.module.scss';

type DeleteButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const cx = classNames.bind(styles);

export default function DeleteButton({ onClick }: DeleteButtonProps) {
  return (
    <button onClick={onClick} className={cx('btn')} type="button">
      대시보드 삭제하기
    </button>
  );
}

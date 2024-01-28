import { MouseEventHandler } from 'react';
import classNames from 'classnames/bind';
import styles from './DeleteDashBoardButton.module.scss';

type DeleteDashBoardButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const cx = classNames.bind(styles);

export default function DeleteDashBoardButton({
  onClick,
}: DeleteDashBoardButtonProps) {
  return (
    <button onClick={onClick} className={cx('btn')} type="button">
      대시보드 삭제하기
    </button>
  );
}

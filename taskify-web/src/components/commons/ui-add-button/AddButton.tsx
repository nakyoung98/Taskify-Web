// addColumn, addDashBoard, addToDo
import { MouseEventHandler } from 'react';
import classNames from 'classnames/bind';
import styles from './AddButton.module.scss';
import { TEXT } from './constant';
import PlusChip from '../ui-plus-chip/PlusChip';

type AddButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  addCase: 'addColumn' | 'addDashBoard' | 'addToDo';
};

const cx = classNames.bind(styles);

export default function AddButton({ onClick, addCase }: AddButtonProps) {
  return (
    <button className={cx('btn', addCase)} type="button" onClick={onClick}>
      {TEXT[addCase]}
      <PlusChip />
    </button>
  );
}

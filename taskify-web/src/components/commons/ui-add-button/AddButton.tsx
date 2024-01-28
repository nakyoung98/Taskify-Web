import { MouseEventHandler } from 'react';
import classNames from 'classnames/bind';
import styles from './AddButton.module.scss';
import { TEXT } from './constant';
import PlusChip from '../ui-plus-chip/PlusChip';

// 사용 가능한 addCase 프롭 : (컬럼추가)addColumn, (대시보드 추가)addDashBoard, (할일 추가)addToDo
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

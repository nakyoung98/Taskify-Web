import classNames from 'classnames/bind';
import styles from './ProgressChip.module.scss';
import Progress from './Progress.svg';

const cx = classNames.bind(styles);

type ProgressChipProps = {
  size: 'onProgress'|'done'|'toDo';
  text: string;
};

export default function ProgressChip({ text, size }: ProgressChipProps) {
  return (
    <div className={cx('chip', size)}>
      <Progress />
      <span className={cx('text')}>{text}</span>
    </div>
  );
}

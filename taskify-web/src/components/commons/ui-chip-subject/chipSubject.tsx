import classNames from 'classnames/bind';
import styles from './chipSubject.module.scss';
import getChipRandomColor from './getChipRandomColor';

const cx = classNames.bind(styles);

type ChipSubjectProps = {
  label: string;
  onDelete: () => void;
  index: number;
};

function ChipSubject({ label, onDelete, index }: ChipSubjectProps) {
  const randomNum = Math.floor(index % 4) + 1;
  const randomColor = getChipRandomColor(randomNum);

  return (
    <button
      type="button"
      className={cx('container', randomColor)}
      onClick={onDelete}
    >
      <span>{label}</span>
    </button>
  );
}

export default ChipSubject;

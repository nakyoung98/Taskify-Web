import classNames from 'classnames/bind';
import styles from './ChipSubject.module.scss';

const cx = classNames.bind(styles);

interface ChipProps {
  label: string;
}

function ChipSubject({ label }: ChipProps) {
  return (
    <div className={cx('chip')} data-label={label}>
      {label}
    </div>
  );
}

export default ChipSubject;

import classNames from 'classnames/bind';
import styles from './ChipSubject.module.scss';

const cx = classNames.bind(styles);

type ChipSubjectProps = {
  label: string;
};

function ChipSubject({ label }: ChipSubjectProps) {
  return (
    <div className={cx('chip')} data-label={label}>
      {label}
    </div>
  );
}

export default ChipSubject;

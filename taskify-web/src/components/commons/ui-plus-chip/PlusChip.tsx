import classNames from 'classnames/bind';
import styles from './PlusChip.module.scss';
import PlusIcon from './plus.svg';

const cx = classNames.bind(styles);

export default function PlusChip() {
  return (
    <div className={cx('container')}>
      <PlusIcon className={cx('icon')} />
    </div>
  );
}

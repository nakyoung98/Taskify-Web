import classNames from 'classnames/bind';
import styles from './SubHeaderButton.module.scss';

const cx = classNames.bind(styles);

type SubHeaderButtonProps = {
  id: number;
};

export default function SubHeaderButton({ id }: SubHeaderButtonProps) {
  <div className={cx('container')}>
    {id && (
      <button className={cx('button')} type="button">
        관리
      </button>
    )}
    <button className={cx('button')} type="button">
      초대하기
    </button>
  </div>;
}

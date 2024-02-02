import classNames from 'classnames/bind';
import styles from './ColumnHeader.module.scss';
import SettingIcon from '../../../../public/images/setting.svg';

const cx = classNames.bind(styles);
export default function ColumnHeader() {
  return (
    <header className={cx('column-header')}>
      <div className={cx('column-header__name-label')}>
        {/** TODO: mini-size design이 추가된 ColorChip 사용 */}
        <div className={cx('column-header__name-label_color-chip')} />
        <h1 className={cx('column-header__name-label_name')}>어쩌고대충제목</h1>
        {/** TODO: 할일 개수 Chip 추가해야 함 */}
        <span>2</span>
      </div>
      <SettingIcon className={cx('column-header__setting-icon')} />
    </header>
  );
}

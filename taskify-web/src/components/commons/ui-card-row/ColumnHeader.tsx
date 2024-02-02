import { MouseEventHandler } from 'react';
import classNames from 'classnames/bind';
import styles from './ColumnHeader.module.scss';
import SettingIcon from '../../../../public/images/setting.svg';

const cx = classNames.bind(styles);

type ColumnHeadeProps = {
  columnName: string;
  columnItemCount: number;
  columnSettingOnClick: MouseEventHandler;
};
export default function ColumnHeader({
  columnName,
  columnItemCount,
  columnSettingOnClick,
}: ColumnHeadeProps) {
  return (
    <header className={cx('column-header')}>
      <div className={cx('column-header__name-label')}>
        {/** TODO: mini-size design이 추가된 ColorChip 사용 */}
        <div className={cx('column-header__name-label_color-chip')} />
        <h1 className={cx('column-header__name-label_name')}>{columnName}</h1>
        {/** TODO: 할일 개수 Chip 추가해야 함 */}
        <span>{columnItemCount}</span>
      </div>
      <SettingIcon
        className={cx('column-header__setting-icon')}
        onClick={columnSettingOnClick}
      />
    </header>
  );
}

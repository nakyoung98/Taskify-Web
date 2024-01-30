import classNames from 'classnames/bind';
import styles from './DashboardInfoLabel.module.scss';

import OwnerIcon from './owner.svg';
import { ChipColor } from './types';

const cx = classNames.bind(styles);

type DashboardInfoLabelProps = {
  location: 'header' | 'sidebar' | 'button';
  chipColor?: ChipColor;
  text: string;
  isOwner: boolean;
};

export default function DashboardInfoLabel({
  location,
  chipColor,
  text,
  isOwner,
}: DashboardInfoLabelProps) {
  return (
    <div className={cx('dashboard-info-label', location)}>
      {/** //TODO: 아래 chip 관련 컴포넌트는 색상 Chip Component로 대체 예정 */}
      {chipColor && <div className={cx('dashboard-color-chip', chipColor)} />}
      <p className={cx('dashboard-title')}>{text}</p>
      {isOwner && <OwnerIcon className={cx('dashboard-owner-icon')} />}
    </div>
  );
}

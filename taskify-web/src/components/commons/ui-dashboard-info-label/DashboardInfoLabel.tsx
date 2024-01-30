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
    </div>
  );
}

import { MouseEventHandler } from 'react';
import Button from '@/components/commons/ui-button/Button';
import DashboardInfoLabel from '@/components/commons/ui-dashboard-info-label/DashboardInfoLabel';
import { ChipColor } from '@/components/commons/ui-dashboard-info-label/types';
import styles from './DashboardEnterButton.module.scss';
import ArrowIcon from './arrow.svg';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type DashboardEnterButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  dashboardName: string;
  dashboardColor: ChipColor;
  isOwner: boolean;
};

export default function DashboardEnterButton({
  onClick,
  dashboardName,
  dashboardColor,
  isOwner,
}: DashboardEnterButtonProps) {
  return (
    <Button size="xlarge" onClick={onClick} theme="secondary">
      <div className={cx('dashboard-enter-button')}>
        <DashboardInfoLabel
          location="button"
          text={dashboardName}
          chipColor={dashboardColor}
          isOwner={isOwner}
        />
        <ArrowIcon className={cx('dashboard-enter-button_arrow-icon')} />
      </div>
    </Button>
  );
}

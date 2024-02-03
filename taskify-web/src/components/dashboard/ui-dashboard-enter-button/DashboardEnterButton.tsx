import { MouseEventHandler } from 'react';
import classNames from 'classnames/bind';
import Button from '@/components/commons/ui-button/Button';
import DashboardInfoLabel from '@/components/commons/ui-dashboard-info-label/DashboardInfoLabel';
import { ChipColor } from '@/components/commons/ui-dashboard-info-label/types';
import styles from './DashboardEnterButton.module.scss';
import ArrowIcon from './arrow.svg';

const cx = classNames.bind(styles);

type DashboardEnterButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  dashboardName: string;
  dashboardColor: ChipColor;
  isOwner: boolean;
};

/**
 * 대시보드 진입 버튼 컴포넌트
 *
 * @param {MouseEventHandler<HTMLButtonElement>} props.onClick 대시보드 버튼 클릭 시 처리할 업무
 * @param {string} props.dashboardName 대시보드의 이름
 * @param {ChipColor} props.dashboardColor 대시보드 레이블의 색상
 * @param {boolean} props.isOwner 사용자가 대시보드의 소유자인지 여부
 */
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

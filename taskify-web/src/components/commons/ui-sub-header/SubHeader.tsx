import classNames from 'classnames/bind';
import DashboardName from './DashboardName';
import SubHeaderButton from './SubHeaderButton';
import DashboardUserList from './DashboardUserList';
import MyProfile from './MyProfile';
import styles from './SubHeader.module.scss';
import Line from './Line.svg';

const cx = classNames.bind(styles);

type SubHeaderProps = {
  isMyDashboard?: boolean;
};

export default function SubHeader({ isMyDashboard = true }: SubHeaderProps) {
  return (
    <div className={cx('container')}>
      <DashboardName />
      <div>
        {!isMyDashboard && (
          <div className={cx('buttonWrap')}>
            <SubHeaderButton />
          </div>
        )}
        <div className={cx('userWrap')}>
          {!isMyDashboard && <DashboardUserList />}
          {!isMyDashboard && <Line />}
          <MyProfile />
        </div>
      </div>
    </div>
  );
}

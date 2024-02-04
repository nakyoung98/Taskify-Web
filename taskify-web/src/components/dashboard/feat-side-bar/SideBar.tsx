import classNames from 'classnames/bind';
import UiSideBar from '@/components/commons/ui-sidebar/Sidebar';
import SidebarHeader from '@/components/commons/ui-sidebar/SidebarHeader';
import SidebarMain from '@/components/commons/ui-sidebar/SidebarMain';
import styles from './SideBar.module.scss';
import AddIcon from './add-box.svg';
import { useSideBar } from '@/contexts/SidebarProvider';

const cx = classNames.bind(styles);

/** sidebar 기능적 컴포넌트입니다.
 * 기능동작 관련은 여기서 구현하면 될 것 같습니다. */
export default function SideBar() {
  const { isOpen } = useSideBar();

  return (
    <UiSideBar>
      <SidebarHeader />
      <SidebarMain>
        <button className={cx('container')} type="button" onClick={() => {}}>
          <span className={cx('text', { hide: !isOpen })}>Dash Boards</span>
          <AddIcon className={cx('icon', { center: !isOpen })} />
        </button>
        <p>💜</p>
        <p>🩷</p>
        <p>💚</p>
        <p>💙</p>
        <p>🩵</p>
        <p>🖤</p>
        <p>💛</p>
      </SidebarMain>
      {/** @TODO SideBarFooter 위치 */}
    </UiSideBar>
  );
}

import { throttle } from 'lodash';
import { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './MyInvitedDashboardList.module.scss';
import { axiosInstance } from '@/lib/api/axiosInstance';
import InvitedList from './InvitedList';
import { Invited } from './type';
import { Invitation } from '@/types/dashboard';
import None from './None.svg';

const cx = classNames.bind(styles);

export default function MyInvitedDashboardList() {
  const [invitationData, setInvitationData] = useState<Invited>({
    invitations: [],
    cursorId: 0,
  });
  const [search, setSearch] = useState<string>('');
  const [isAccept, setIsAccept] = useState<boolean>(false);
  const [cursorId, setCursorId] = useState<number | null>(null);
  const listContainerRef = useRef<HTMLDivElement | null>(null);

  const getInvitedListData = async () => {
    if (!search) {
      try {
        const url = cursorId
          ? `invitations?size=5&cursorId=${cursorId}`
          : `invitations?size=5`;
        const response = await axiosInstance.get(url);
        const newData = response.data;

        setInvitationData((prev) => {
          const newInvitations = newData.invitations.filter(
            (newInv: Invitation) =>
              !prev.invitations.some((prevInv) => prevInv.id === newInv.id),
          );

          return {
            invitations: [...prev.invitations, ...newInvitations],
            cursorId: newData.cursorId,
          };
        });
        setCursorId(newData.cursorId);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await axiosInstance.get(
          `invitations?size=5&title=${search}`,
        );
        const newData = response.data;
        setInvitationData((prev) => {
          const newInvitations = newData.invitations.filter(
            (newInv: Invitation) =>
              !prev.invitations.some((prevInv) => prevInv.id === newInv.id),
          );

          return {
            invitations: [...prev.invitations, ...newInvitations],
            cursorId: newData.cursorId,
          };
        });
        setCursorId(newData.cursorId);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleScroll = throttle((event: Event) => {
    const target = event.target as HTMLDivElement;
    const { scrollTop, scrollHeight, clientHeight } = target;
    const scrollOffset = 100;

    if (scrollHeight - scrollTop <= clientHeight + scrollOffset) {
      getInvitedListData();
    }
  }, 100);

  useEffect(() => {
    const listContainer = listContainerRef.current;
    if (listContainer) {
      listContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (listContainer) {
        listContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [cursorId]);

  useEffect(() => {
    setInvitationData({
      invitations: [],
      cursorId: 0,
    });
    getInvitedListData();
    console.log(invitationData);
  }, [search, isAccept]);

  const throttledSave = throttle((value) => setSearch(value), 500);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    throttledSave(e.target.value);
  };

  return (
    <div className={cx('container')}>
      <span className={cx('board-header')}>초대받은 대시보드</span>
      {(!invitationData?.invitations ||
        invitationData.invitations.length === 0) && (
        <div className={cx('None-board')}>
          <None className={cx('None-board-image')} />
          <span className={cx('None-board-text')}>
            아직 초대받은 대시보드가 없어요
          </span>
        </div>
      )}
      {invitationData?.invitations && invitationData.invitations.length > 0 && (
        <input
          onChange={onChange}
          className={cx('input')}
          value={search}
          placeholder="검색"
        />
      )}
      {invitationData?.invitations && invitationData.invitations.length > 0 && (
        <div className={cx('board-menu')}>
          <span className={cx('menu-name')}>이름</span>
          <span className={cx('menu-inviter')}>초대자</span>
          <span className={cx('menu-accept')}>수락 여부</span>
        </div>
      )}
      <div className={cx('board-list-container')} ref={listContainerRef}>
        {invitationData?.invitations?.map((list) => (
          <InvitedList
            key={list.id}
            boardName={list.dashboard.title}
            inviter={list.inviter.nickname}
            InvitationId={list.id}
            setIsAccept={setIsAccept}
            isAccept={isAccept}
          />
        ))}
      </div>
    </div>
  );
}

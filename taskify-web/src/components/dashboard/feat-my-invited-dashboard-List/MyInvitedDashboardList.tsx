import { throttle } from 'lodash';
import { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import { axiosInstance } from '@/lib/api/axiosInstance';
import { Invitation } from '@/types/dashboard';
import { Invited } from './type';
import InvitedList from './InvitedList';
import styles from './MyInvitedDashboardList.module.scss';
import None from './None.svg';
import SearchInput from '@/components/commons/feat-search-input/SearchInput';

const cx = classNames.bind(styles);

export default function MyInvitedDashboardList() {
  const [invitationData, setInvitationData] = useState<Invited>(null);
  const [search, setSearch] = useState<string>('');
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
        if (newData && newData.invitations.length > 0) {
          setInvitationData((prev) => {
            const newInvitations = newData.invitations.filter(
              (newInv: Invitation) =>
                !prev?.invitations?.some((prevInv) => prevInv.id === newInv.id),
            );
            return {
              invitations: [...(prev?.invitations || []), ...newInvitations],
              cursorId: newData.cursorId,
            };
          });
          setCursorId(newData.cursorId);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await axiosInstance.get(
          `invitations?size=5&title=${search}`,
        );
        const newData = response.data;
        if (newData) {
          setInvitationData(newData);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleScroll = throttle(async (event: Event) => {
    const target = event.target as HTMLDivElement;
    const { scrollTop, scrollHeight, clientHeight } = target;
    const scrollOffset = 100;

    if (scrollHeight - scrollTop <= clientHeight + scrollOffset) {
      await getInvitedListData();
    }
  }, 100);

  const getInvitedListReset = async () => {
    try {
      const response = await axiosInstance.get('invitations?size=5');
      const newData = response.data;
      setInvitationData(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const acceptInvitation = async (InvitationId: number) => {
    try {
      await axiosInstance.put(`invitations/${InvitationId}`, {
        inviteAccepted: true,
      });
      getInvitedListReset();
    } catch (error) {
      console.log(error);
    }
  };

  const refuseInvitation = async (InvitationId: number) => {
    try {
      await axiosInstance.put(`invitations/${InvitationId}`, {
        inviteAccepted: false,
      });
      getInvitedListReset();
    } catch (error) {
      console.log(error);
    }
  };

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
    getInvitedListData();
  }, [search]);

  return (
    <div className={cx('container')}>
      <span className={cx('board-header')}>초대받은 대시보드</span>
      {!invitationData && (
        <div className={cx('None-board')}>
          <None className={cx('None-board-image')} />
          <span className={cx('None-board-text')}>
            아직 초대받은 대시보드가 없어요
          </span>
        </div>
      )}
      {invitationData && (
        <SearchInput
          onSearch={(string) => {setSearch(string)}}
        />
      )}
      {invitationData && (
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
            acceptInvitation={acceptInvitation}
            refuseInvitation={refuseInvitation}
          />
        ))}
      </div>
    </div>
  );
}

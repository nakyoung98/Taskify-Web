import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './InviteStatusList.module.scss';
import PaginationButtonContainer from '@/components/commons/ui-pagination/PaginationButtonContainer';
import Button from '@/components/commons/ui-button/Button';
import AddIcon from './add-box.svg';
import InviteStatusListItem from './InviteStatusListItem';

const cx = classNames.bind(styles);

export default function InviteStatusList() {
  const [pagination, setPagination] = useState<number>(1);

  return (
    <section className={cx('container')}>
      <div className={cx('header')}>
        <div className={cx('headerTitle')}>
          <h1 className={cx('title')}>초대내역</h1>
          <div className={cx('pagination')}>
            <p className={cx('leftPage')}>페이지 중</p>
            <PaginationButtonContainer
              leftClick={() => {
                //   getPaginationedMembers(pagination - 1);
                //   setPagination(pagination - 1);
              }}
              rightClick={() => {
                //   getPaginationedMembers(pagination + 1);
                //   setPagination(pagination + 1);
              }}
              // leftDisabled={(() => {
              //   if (paginationedMembersData) {
              //     return (
              //       Math.ceil(
              //         (paginationedMembersData.data?.totalCount || 1) / 4,
              //       ) >= pagination
              //     );
              //   }
              //   return false;
              // })()}
              // righttDisabled={(() => {
              //   if (paginationedMembersData) {
              //     return (
              //       Math.ceil(
              //         (paginationedMembersData.data?.totalCount || 1) / 4,
              //       ) <= pagination
              //     );
              //   }

              //   return false;
              // })()}
            />
          </div>
        </div>
        <Button theme="primary" onClick={() => {}} size="medium">
          <AddIcon className={cx('icon')} />
          초대하기
        </Button>
      </div>
      <h2 className={cx('subtitle')}>이메일</h2>
      <ul className={cx('memberList')}>
        <InviteStatusListItem />
        <hr className={cx('partition')} />
        <InviteStatusListItem />
        <hr className={cx('partition')} />
        <InviteStatusListItem />
        <hr className={cx('partition')} />
        <InviteStatusListItem />
      </ul>
    </section>
  );
}

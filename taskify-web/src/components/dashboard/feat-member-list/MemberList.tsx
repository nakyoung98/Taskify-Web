import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './MemberList.module.scss';
import PaginationButtonContainer from '@/components/commons/ui-pagination/PaginationButtonContainer';
import MemberListItem from './MemberListItem';
import { useMembers } from '@/contexts/MemberProvider';

const cx = classNames.bind(styles);

export default function MemberList() {
  const { membersData } = useMembers();
  const [pagination, setPagination] = useState<number>(1);

  return (
    <section className={cx('container')}>
      <div className={cx('header')}>
        <h1 className={cx('title')}>구성원</h1>
        <div className={cx('pagination')}>
          {membersData && (
            <p className={cx('leftPage')}>
              {Math.ceil((membersData.data?.totalCount || 1) / 4)} 페이지 중{' '}
              {pagination}
            </p>
          )}
          <PaginationButtonContainer
            leftClick={() => {
              setPagination(pagination - 1);
            }}
            rightClick={() => {
              setPagination(pagination + 1);
            }}
            leftDisabled={(() => {
              if (membersData) {
                return (
                  Math.ceil((membersData.data?.totalCount || 1) / 4) >=
                  pagination
                );
              }
              return false;
            })()}
            righttDisabled={(() => {
              if (membersData) {
                return (
                  Math.ceil((membersData.data?.totalCount || 1) / 4) <=
                  pagination
                );
              }

              return false;
            })()}
          />
        </div>
      </div>
      <h2 className={cx('subtitle')}>이름</h2>
      <ul className={cx('memberList')}>
        <MemberListItem data={membersData.data?.members?.[0]} />
        <hr className={cx('partition')} />
        <MemberListItem data={membersData.data?.members?.[1]} />
        <hr className={cx('partition')} />
        <MemberListItem data={membersData.data?.members?.[2]} />
        <hr className={cx('partition')} />
        <MemberListItem data={membersData.data?.members?.[3]} />
      </ul>
    </section>
  );
}

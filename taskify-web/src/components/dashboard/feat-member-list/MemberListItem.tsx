import classNames from 'classnames/bind';
import styles from './MemberListItem.module.scss';
import Button from '@/components/commons/ui-button/Button';
import ProfileLabel from '@/components/commons/ui-profile-Label/ProfileLabel';
import { Member } from '@/types/dashboard';

const cx = classNames.bind(styles);

type MemberListItemProps = {
  data: Member | undefined;
};

export default function MemberListItem({ data }: MemberListItemProps) {
  return (
    <li className={cx('container')}>
      {data && (
        <>
          <ProfileLabel
            email={data.email}
            id={data.id}
            nickname={data.nickname}
            profileImageUrl={data.profileImageUrl}
            position="card"
          />
          <Button onClick={() => {}} size="small" theme="secondary">
            삭제
          </Button>
        </>
      )}
    </li>
  );
}

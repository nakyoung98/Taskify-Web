import { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './UserStateDropdown.module.scss';
import ProfileLabel from '../ui-profile-Label/ProfileLabel';
import ProgressChip from './ProgressChip';
import { TEXT } from './constant';
import { UserData, ColumnData } from './types';

const cx = classNames.bind(styles);

type UserStateDropdownProps = {
  text: string;
  userData?: Array<UserData>;
  columnData?: Array<ColumnData>;
  IsUserDataType: boolean;
  setUserDataState?: React.Dispatch<React.SetStateAction<UserData>>;
  setColumnDataState?: React.Dispatch<React.SetStateAction<ColumnData>>;
};

export default function UserStateDropdown({
  text,
  userData,
  columnData,
  setUserDataState,
  setColumnDataState,
  IsUserDataType,
}: UserStateDropdownProps) {
  const [search, setSearch] = useState<string>('');
  const [isDropped, setIsDropped] = useState<boolean>(false);
  const [isInsert, setIsInsert] = useState<boolean>(false);
  const [profileInfo, setProfileInfo] = useState<UserData>({
    id: 0,
    userId: 0,
    email: '',
    nickname: '',
    profileImageUrl: '',
  });
  const [columnDataInfo, setColumnDataInfo] = useState<ColumnData>({
    id: 0,
    title: '',
    teamId: '',
    dashboardId: 0,
    createdAt: '',
    updatedAt: '',
  });
  const setTime = 200;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickContainer = () => {
    setIsDropped(!isDropped);
  };

  const handleBlurContainer = () => {
    setTimeout(() => {
      setIsDropped(false);
    }, setTime);
  };

  const filterNickname = userData?.filter((p) => {
    return p.nickname
      .replace(' ', '')
      .toLocaleLowerCase()
      .includes(search.toLocaleLowerCase());
  });
  const filterColumnName = columnData?.filter((p) => {
    return p.title
      .replace(' ', '')
      .toLocaleLowerCase()
      .includes(search.toLocaleLowerCase());
  });

  const handleGetProfileInfo = (
    id: number,
    userId: number,
    nickname: string,
    email: string,
    profileImageUrl: string,
  ) => {
    setProfileInfo({ id, userId, nickname, email, profileImageUrl });
    setUserDataState?.({ id, userId, nickname, email, profileImageUrl });
    setIsInsert(true);
    setSearch('');
    setIsDropped(false);
  };

  const handleGetColumnInfo = (
    id: number,
    title: string,
    teamId: string,
    dashboardId: number,
    createdAt: string,
    updatedAt: string,
  ) => {
    setColumnDataInfo({ id, title, teamId, dashboardId, createdAt, updatedAt });
    setColumnDataState?.({
      id,
      title,
      teamId,
      dashboardId,
      createdAt,
      updatedAt,
    });
    setIsInsert(true);
    setSearch('');
    setIsDropped(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleCancelData = () => {
    setIsInsert(false);
    setSearch('');
    setIsDropped(true);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  return (
    <div className={cx('container')}>
      <span className={cx('dropdown-name')}>{text}</span>
      <div className={cx('blur-container')} onBlur={handleBlurContainer}>
        {isInsert && IsUserDataType && (
          <button
            type="button"
            className={cx('profile-label-container')}
            onClick={handleCancelData}
            aria-label="profile-label-container"
          >
            <ProfileLabel
              id={profileInfo.userId}
              nickname={profileInfo.nickname}
              email={profileInfo.email}
              profileImageUrl={profileInfo.profileImageUrl}
              position="dropdown"
            />
          </button>
        )}
        {isInsert && !IsUserDataType && (
          <button
            type="button"
            className={cx('profile-label-container')}
            onClick={handleCancelData}
            aria-label="profile-label-container"
          >
            <ProgressChip text={columnDataInfo.title} size="onProgress" />
          </button>
        )}

        {!isInsert && IsUserDataType && (
          <input
            onChange={onChange}
            className={cx('input')}
            value={search}
            placeholder={TEXT.placeHolderText.UserDataPlaceHolder}
            onClick={handleClickContainer}
            ref={inputRef}
          />
        )}
        {!isInsert && !IsUserDataType && (
          <input
            onChange={onChange}
            className={cx('input')}
            value={search}
            placeholder={TEXT.placeHolderText.ColumnDataPlaceHolder}
            onClick={handleClickContainer}
            ref={inputRef}
          />
        )}
        {isDropped && IsUserDataType && (
          <div className={cx('button-list')}>
            {filterNickname?.map((data) => (
              <button
                type="button"
                key={data.id}
                className={cx('dropdown-button')}
                onClick={() =>
                  handleGetProfileInfo(
                    data.id,
                    data.userId,
                    data.nickname,
                    data.email,
                    data.profileImageUrl,
                  )
                }
                aria-label={data.nickname}
              >
                <ProfileLabel
                  id={data.userId}
                  nickname={data.nickname}
                  email={data.email}
                  profileImageUrl={data.profileImageUrl}
                  position="dropdown"
                />
              </button>
            ))}
          </div>
        )}
        {isDropped && !IsUserDataType && (
          <div className={cx('button-list')}>
            {filterColumnName?.map((data) => (
              <button
                type="button"
                key={data.id}
                className={cx('dropdown-button')}
                onClick={() =>
                  handleGetColumnInfo(
                    data.id,
                    data.title,
                    data.teamId,
                    data.dashboardId,
                    data.createdAt,
                    data.updatedAt,
                  )
                }
                aria-label={data.title}
              >
                <ProgressChip text={data.title} size="onProgress" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

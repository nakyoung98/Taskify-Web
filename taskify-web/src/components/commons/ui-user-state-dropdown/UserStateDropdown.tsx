import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './UserStateDropdown.module.scss';
import ProfileLabel from '../ui-profile-Label/ProfileLabel';
import ProgressChip from '../ui-progress-chip/ProgressChip';
import { TEXT } from './constant';
import { UserData, ColumnData } from './types';

const cx = classNames.bind(styles);

/**
 * `UserStateDropdown`컴포넌트의 props 타입을 정의합니다.
 * @typeof {object} UserStateDropdownProps
 * @property {Array<UserData>} userData /{teamid}/members api의 members 객체를 받는 속성입니다.
 * @property {Array<ColumnData>} columnData /{teamid}/columns api의 data 객체를 받는 속성입니다.
 * @property {boolean} IsUserDataType 유저데이터를 받아올지 컬럼데이터를 받아올지를 선택하는 속성입니다. true의 경우 유저데이터를 받습니다.
 * @property {UserDataState} UserDataState 상위 컴포넌트에서 유저 데이터의 State를 받는 속성입니다.
 * @property {ColumnDataState} ColumnDataState 상위 컴포넌트에서 컬럼 데이터의 Sstate를 받는 속성입니다.
 * @property {setUserDataState} 상위 컴포넌트에서 유저 데이터의 setState를 받는 속성입니다.
 * @property {setColumnDataState} 상위 컴포넌트에서 컬럼 데이터의 setSstate를 받는 속성입니다.
 */

type UserStateDropdownProps = {
  userData?: Array<UserData>;
  columnData?: Array<ColumnData>;
  IsUserDataType?: boolean;
  UserDataState?: UserData;
  columnDataState?: ColumnData;
  setUserDataState?: React.Dispatch<React.SetStateAction<UserData>>;
  setColumnDataState?: React.Dispatch<React.SetStateAction<ColumnData>>;
  isModifyForm: boolean;
};

export default function UserStateDropdown({
  userData,
  columnData,
  UserDataState,
  columnDataState,
  setUserDataState,
  setColumnDataState,
  IsUserDataType = false,
  isModifyForm,
}: UserStateDropdownProps) {
  const [search, setSearch] = useState<string>('');
  const [isDropped, setIsDropped] = useState<boolean>(false);
  const [isInsert, setIsInsert] = useState<boolean>(false);
  const setTime = 200;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isModifyForm) {
      setIsInsert(true);
    }
  }, []);

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
      ? p.title
          .replace(' ', '')
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase())
      : false;
  });

  const handleGetProfileInfo = (
    userId: number,
    nickname: string,
    email: string | undefined,
    profileImageUrl: string | null,
  ) => {
    setUserDataState?.({
      userId,
      nickname,
      email,
      profileImageUrl,
    });
    setIsInsert(true);
    setSearch('');
    setIsDropped(false);
  };

  const handleGetColumnInfo = (
    id: number,
    title: string | undefined,
    teamId: string,
    dashboardId: number,
  ) => {
    setColumnDataState?.({
      id,
      title,
      teamId,
      dashboardId,
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
      <div className={cx('blur-container')} onBlur={handleBlurContainer}>
        {isInsert && IsUserDataType && (
          <button
            type="button"
            className={cx('profile-label-container')}
            onClick={handleCancelData}
            aria-label="profile-label-container"
          >
            <ProfileLabel
              id={UserDataState?.userId || 0}
              nickname={UserDataState?.nickname || ''}
              email={UserDataState?.email || ''}
              profileImageUrl={UserDataState?.profileImageUrl || ''}
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
            <ProgressChip text={columnDataState?.title || ''} />
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
                key={data.userId}
                className={cx('dropdown-button')}
                onClick={() =>
                  handleGetProfileInfo(
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
                  )
                }
                aria-label={data.title}
              >
                <ProgressChip text={data.title} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

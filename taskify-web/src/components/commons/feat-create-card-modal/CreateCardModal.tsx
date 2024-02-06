import { useRouter } from 'next/router';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CreateCardModal.module.scss';
import { UserData } from '../ui-user-state-dropdown/types';
import { axiosInstance } from '@/lib/api/axiosInstance';
import { Modal } from '../ui-modal/Modal';
import { MemberList } from './type';
import Button from '../ui-button/Button';
import ImageInput from '../ui-image-input/ImageInput';
import UserStateDropdown from '../ui-user-state-dropdown/UserStateDropdown';
import TagInput from '../ui-tag-input/TagInput';
import CalendarInput from '../ui-calendar-input/CalendarInput';

const cx = classNames.bind(styles);

/**
 *  `CreateCardModal`컴포넌트의 props타입을 정의합니다.
 *
 * @property {boolean} isOpen 모달이 열려 있는지 여부를 나타냅니다.
 * @property {MouseEventHandler<HTMLButtonElement>} onClick 클릭 이벤트 핸들러입니다.
 * @property {number} columnIdNumber 컬럼의 ID 번호입니다.
 */

type CreateCardModalProps = {
  isOpen: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  columnIdNumber: number;
};

export default function CreateCardModal({
  isOpen,
  onClick,
  columnIdNumber,
}: CreateCardModalProps) {
  const [memberListValue, setMemberListValue] = useState<UserData>({
    id: 0,
    userId: 0,
    email: '',
    nickname: '',
    profileImageUrl: '',
    createdAt: '',
    updatedAt: '',
    isOwner: false,
  });
  const [memberListData, setMemberListData] = useState<MemberList>({
    members: [],
    totalCount: 0,
  });
  const [imageData, setImageData] = useState<{
    data: File | undefined;
    preview: string;
  }>({ data: undefined, preview: '' });
  const [titleValue, setTitleValue] = useState<string>('');
  const [descriptionValue, setDescriptionValue] = useState<string>('');
  const [tagDataValue, setTagDataValue] = useState<string[]>([]);
  const [dueDateValue, setDueDateValue] = useState<string>('');

  const inputref = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { members } = memberListData;
  const { boardId } = router.query;

  const handleTitleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
  };

  const handleDescriptionValue = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescriptionValue(e.target.value);
  };

  const handleDueDateValue = (date: string) => {
    setDueDateValue(date);
  };

  useEffect(() => {
    const getUserData = async () => {
      let MemberListData: MemberList | null = null;
      try {
        const res = await axiosInstance.get(`members?dashboardId=${boardId}`);
        MemberListData = res.data;
      } catch (error) {
        console.log(error);
      }
      if (MemberListData) {
        setMemberListData(MemberListData);
      }
    };
    if (boardId) {
      getUserData();
    }
  }, [boardId]);

  const RequestData = async () => {
    try {
      const res = await axiosInstance.post(
        `columns/${columnIdNumber}/card-image`,
        { image: imageData.data },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      const { data } = res;
      await axiosInstance.post('cards', {
        assigneeUserId: memberListValue.userId,
        dashboardId: Number(boardId),
        columnId: columnIdNumber,
        title: titleValue,
        description: descriptionValue,
        dueDate: dueDateValue,
        tags: tagDataValue,
        imageUrl: data.imageUrl,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const isFormValid = () => {
    return (
      memberListValue &&
      titleValue &&
      descriptionValue &&
      tagDataValue.length > 0 &&
      dueDateValue &&
      imageData.data
    );
  };

  return (
    <Modal isOpen={isOpen}>
      <div className={cx('container')}>
        <div className={cx('main')}>
          <span className={cx('modal-name')}>할 일 생성</span>
          <div className={cx('dropdown-container')}>
            <span className={cx('subtitle')}>담당자</span>
            <UserStateDropdown
              IsUserDataType
              userData={members}
              UserDataState={memberListValue}
              setUserDataState={setMemberListValue}
            />
          </div>
          <div className={cx('title-container')}>
            <span className={cx('subtitle')}>
              제목 <span className={cx('star')}>*</span>
            </span>
            <input
              className={cx('input')}
              value={titleValue}
              onChange={handleTitleValue}
              placeholder="제목을 입력해 주세요"
            />
          </div>
          <div className={cx('description-container')}>
            <span className={cx('subtitle')}>
              설명 <span className={cx('star')}>*</span>
            </span>
            <textarea
              className={cx('input', 'description')}
              value={descriptionValue}
              onChange={handleDescriptionValue}
              placeholder="설명을 입력해 주세요"
            />
          </div>
          <div className={cx('calender-container')}>
            <span className={cx('subtitle')}>마감일</span>
            <CalendarInput value={dueDateValue} onChange={handleDueDateValue} />
          </div>
          <div className={cx('tag-container')}>
            <span className={cx('subtitle')}>태그</span>
            <TagInput
              tagDataValue={tagDataValue}
              setTagDataValue={setTagDataValue}
            />
          </div>
          <div className={cx('image-input-container')}>
            <span className={cx('subtitle')}>이미지</span>
            <ImageInput
              inputRef={inputref}
              imageData={imageData}
              setImageData={setImageData}
              location="modal"
            />
          </div>
        </div>
        <div className={cx('footer')}>
          <Button onClick={onClick} theme="secondary" size="modalMedium">
            취소
          </Button>
          <Button
            onClick={RequestData}
            size="modalMedium"
            disabled={!isFormValid()}
          >
            생성
          </Button>
        </div>
      </div>
    </Modal>
  );
}

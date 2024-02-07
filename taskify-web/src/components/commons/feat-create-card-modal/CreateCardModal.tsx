import { useRouter } from 'next/router';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CreateCardModal.module.scss';
import { ColumnData, UserData } from '../ui-user-state-dropdown/types';
import { axiosInstance } from '@/lib/api/axiosInstance';
import { Modal } from '../ui-modal/Modal';
import { CardList } from './type';
import { MemberDataRes, ColumnDataRes } from './MockData';
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
 * @property {number} [cardId] - 카드의 ID입니다. 이 값은 선택 사항입니다.
 * @property {boolean} [isModifyForm] - 폼이 수정 모드인지 여부를 나타냅니다. 이 값은 선택 사항입니다.
 */

type CreateCardModalProps = {
  isOpen: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  columnIdNumber: number;
  cardId?: number;
  isModifyForm?: boolean;
};

export default function CreateCardModal({
  isOpen,
  onClick,
  cardId = 0,
  columnIdNumber,
  isModifyForm = false,
}: CreateCardModalProps) {
  const [memberListValue, setMemberListValue] = useState<UserData>({
    userId: 0,
    email: '',
    nickname: '',
    profileImageUrl: '',
  });
  const [stateListValue, setStateListValue] = useState<ColumnData>({
    id: 0,
    title: '',
    teamId: '',
    dashboardId: 0,
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

  const { members: memberData } = MemberDataRes;
  const { data: columnData } = ColumnDataRes;
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

  const getCardData = async () => {
    let CardDataRes: CardList | null = null;
    try {
      const cardDataReq = await axiosInstance.get(`cards/${cardId}`);
      CardDataRes = cardDataReq.data;
    } catch (error) {
      console.log(error);
    }
    if (CardDataRes && memberData && columnData) {
      const findEmail = memberData.find(
        (Member) => Member.userId === CardDataRes?.assignee.id,
      );
      const email = findEmail?.email;
      const findColumnTitle = columnData.find(
        (columnTitle) => columnTitle.id === CardDataRes?.columnId,
      );
      const columnTitle = findColumnTitle?.title;

      setMemberListValue({
        userId: CardDataRes.assignee.id,
        email,
        nickname: CardDataRes.assignee.nickname,
        profileImageUrl: CardDataRes.assignee.profileImageUrl,
      });
      setStateListValue({
        id: columnIdNumber,
        title: columnTitle,
        teamId: '2-11',
        dashboardId: Number(boardId),
      });
      setTitleValue(CardDataRes.title);
      setDescriptionValue(CardDataRes.description);
      setTagDataValue(CardDataRes.tags);
      setDueDateValue(CardDataRes.dueDate);
      setImageData({ data: undefined, preview: CardDataRes.imageUrl });
    }
  };

  useEffect(() => {
    if (isModifyForm) {
      getCardData();
    }
  }, [isModifyForm]);

  const RequestCreateCard = async () => {
    try {
      const imageReq = await axiosInstance.post(
        `columns/${columnIdNumber}/card-image`,
        { image: imageData.data },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      const { data: imageDataRes } = imageReq;
      await axiosInstance.post('cards', {
        assigneeUserId: memberListValue.userId,
        dashboardId: Number(boardId),
        columnId: columnIdNumber,
        title: titleValue,
        description: descriptionValue,
        dueDate: dueDateValue,
        tags: tagDataValue,
        imageUrl: imageDataRes.imageUrl,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const RequestModifyCard = async () => {
    if (imageData.data) {
      try {
        const imageReq = await axiosInstance.post(
          `columns/${columnIdNumber}/card-image`,
          { image: imageData.data },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        const { data: imageDataRes } = imageReq;

        axiosInstance.put(`cards/${cardId}`, {
          columnId: stateListValue.id,
          assigneeUserId: memberListValue.userId,
          title: titleValue,
          description: descriptionValue,
          dueDate: dueDateValue,
          tags: tagDataValue,
          imageUrl: imageDataRes.imageUrl,
        });
      } catch (error) {
        console.log(error);
      }
    }
    if (!imageData.data) {
      try {
        axiosInstance.put(`cards/${cardId}`, {
          columnId: stateListValue.id,
          assigneeUserId: memberListValue.userId,
          title: titleValue,
          description: descriptionValue,
          dueDate: dueDateValue,
          tags: tagDataValue,
        });
      } catch (error) {
        console.log(error);
      }
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
          {!isModifyForm && (
            <span className={cx('modal-name')}>할 일 생성</span>
          )}
          {isModifyForm && <span className={cx('modal-name')}>할 일 수정</span>}
          <div className={cx('dropdown-container')}>
            {isModifyForm && (
              <div className={cx('stateList')}>
                <span className={cx('subtitle')}>상태</span>
                <UserStateDropdown
                  columnData={columnData}
                  columnDataState={stateListValue}
                  setColumnDataState={setStateListValue}
                  isModifyForm={isModifyForm}
                />
              </div>
            )}
            <div className={cx('userList')}>
              <span className={cx('subtitle')}>담당자</span>
              <UserStateDropdown
                IsUserDataType
                userData={memberData}
                UserDataState={memberListValue}
                setUserDataState={setMemberListValue}
                isModifyForm={isModifyForm}
              />
            </div>
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
              isModifyForm={isModifyForm}
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
          {!isModifyForm && (
            <Button
              onClick={RequestCreateCard}
              size="modalMedium"
              disabled={!isFormValid()}
            >
              생성
            </Button>
          )}
          {isModifyForm && (
            <Button
              onClick={RequestModifyCard}
              size="modalMedium"
              disabled={!isFormValid()}
            >
              수정
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}

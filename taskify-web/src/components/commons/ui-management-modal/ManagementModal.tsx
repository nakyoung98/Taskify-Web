import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ManagementModal.module.scss';
import { Modal } from '../ui-modal/Modal';
import ChipSubject from '../ui-chip-subject/chipSubject';
import ProgressChip from '../ui-progress-chip/ProgressChip';
import Dropdown from '../ui-dropdown/Dropdown';
import CommentTextarea from '../ui-comment-textarea/CommentTextarea';
import UserBadge from '../ui-user-badge/UserBadge';
import ProfileLabel from '../ui-profile-Label/ProfileLabel';
import CloseSvg from './Close';
import CreateCardModal from '../feat-create-card-modal/CreateCardModal';

const cx = classNames.bind(styles);

const testData = {
  id: 133,
  title: '테스트 할일',
  description:
    ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum finibus nibh arcu, quis consequat ante cursus eget. Cras mattis, nulla non laoreet porttitor, diam justo laoreet eros, vel aliquet diam elit at leo.',
  tags: ['프로젝트', '일반', '백엔드', '상'],
  dueDate: '2024.02.11 12:00',
  assignee: {
    profileImageUrl: '',
    nickname: '홍길동',
    id: 123,
  },
  imageUrl: '',
  teamId: '123',
  columnId: 0,
  createdAt: '2024-02-10T15:11:28.075Z',
  updatedAt: '2024-02-10T15:11:28.075Z',
};

export function ManagementModal() {
  const testButtonList = {
    modal: ['수정하기', '삭제하기'],
  };

  const [isCreateCardModalOpen, setCreateCardModalOpen] = useState(false);

  const [comments, setComments] = useState([]);
  const [commentValue, setCommentValue] = useState('');
  const [editCommentIndex, setEditCommentIndex] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    name: '정민철',
    id: '1',
  });
  const [isModalOpen, setModalOpen] = useState(true);
  const currentDate = new Date().toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour12: false,
    hour: 'numeric',
    minute: 'numeric',
  });

  const handleCommentChange = (e) => {
    setCommentValue(e.target.value);
  };

  const [isCommentUpdateVisible, setCommentUpdateVisible] = useState(false);

  const handleCommentSubmit = () => {
    if (commentValue.trim() !== '') {
      if (editCommentIndex !== null) {
        const updatedComments = [...comments];
        updatedComments[editCommentIndex] = {
          text: commentValue,
          user: currentUser,
          date: currentDate,
        };
        setComments(updatedComments);
        setEditCommentIndex(null);
      } else {
        setComments([
          ...comments,
          { text: commentValue, user: currentUser, date: currentDate },
        ]);
      }

      setCommentValue('');
      setCommentUpdateVisible(true);
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    const buttonText = (e.target as HTMLElement).innerText;

    if (buttonText === '수정하기') {
      setCreateCardModalOpen(true);
    } else if (buttonText === '삭제하기') {
    }
  };

  const handleEdit = (index) => {
    setCommentValue(comments[index].text);
    setEditCommentIndex(index);
  };

  const handleDelete = (index) => {
    const updatedComments = [...comments];
    updatedComments.splice(index, 1);
    setComments(updatedComments);
    setCommentUpdateVisible(false);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const userId = 1;
  const userEmail = 'example@example.com';
  const userNickname = '배유철';
  const userProfileImageUrl = 'path/to/user/profile/image.jpg';

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <div className={cx('container')}>
          <div className={cx('container-scroll')}>
            <div className={cx('modal-header')}>
              <h1>{testData.title}</h1>
              <div className={cx('right')}>
                <div className={cx('dropdown-wrapper')}>
                  <Dropdown
                    buttonList={testButtonList.modal}
                    onClick={handleButtonClick}
                    isKebab
                  />
                </div>
                <button
                  onClick={handleModalClose}
                  className={cx('close-button')}
                >
                  <CloseSvg width={32} height={32} />
                </button>
              </div>
            </div>
            <div className={cx('modal-contents')}>
              <div className={cx('modal-content-main')}>
                <div className={cx('label-container')}>
                  <div className={cx('ProgressChip-wrapper')}>
                    <ProgressChip text="To Do" />
                  </div>
                  <div className={cx('chipSubject-wrapper')}>
                    {testData.tags.map((tag, index) => {
                      return <ChipSubject label={tag} index={index} />;
                    })}
                  </div>
                </div>
                <p>{testData.description}</p>
                <div className={cx('image-wrapper')}>이미지</div>
                <div className={cx('comment-wrapper')}>
                  <span>댓글</span>
                  <CommentTextarea
                    value={commentValue}
                    onChange={handleCommentChange}
                    buttonText="입력"
                    onClick={handleCommentSubmit}
                    currentUser={currentUser}
                  />
                </div>
                <div
                  className={cx('comment-update-wrapper', {
                    visible: isCommentUpdateVisible,
                  })}
                >
                  {comments.map((comment, index) => (
                    <div key={index} className={cx('comment-item')}>
                      <div className={cx('userbadge-wrapper')}>
                        <UserBadge
                          color="orange"
                          text={comment.user.name}
                          location="header"
                        />
                      </div>
                      <div className={cx('comment-update-content')}>
                        <div className={cx('comment-update-content-info')}>
                          <span className={cx('name')}>
                            {comment.user.name}
                          </span>
                          <span className={cx('date')}>{comment.date}</span>
                        </div>
                        <p className={cx('content')}>{comment.text}</p>
                        <div className={cx('comment-actions')}>
                          <button onClick={() => handleEdit(index)}>
                            수정
                          </button>
                          <button onClick={() => handleDelete(index)}>
                            삭제
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={cx('modal-content-sub')}>
                <div className={cx('modal-content-sub-container')}>
                  <span className={cx('sub-container-title')}>담당자</span>
                  <div className={cx('profilelabel-wrapper')}>
                    <ProfileLabel
                      id={userId}
                      email={testData.assignee.email}
                      nickname={testData.assignee.nickname}
                      profileImageUrl={testData.assignee.profileImageUrl}
                      position="card"
                    />
                  </div>
                </div>
                <div className={cx('modal-content-sub-container')}>
                  <span className={cx('sub-container-title')}>마감일</span>
                  <p className={cx('sub-container-content')}>
                    {testData.dueDate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      {isCreateCardModalOpen && (
        <CreateCardModal
          isOpen={isCreateCardModalOpen}
          onClick={() => setCreateCardModalOpen(false)}
          isModifyForm={true}
        />
      )}
    </div>
  );
}

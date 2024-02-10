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

const cx = classNames.bind(styles);

export function ManagementModal() {
  const testButtonList = {
    modal: ['수정하기', '삭제하기'],
    nav: ['로그아웃', '내 정보', '내 대시보드'],
  };

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
        // If editing a comment, update the existing comment
        const updatedComments = [...comments];
        updatedComments[editCommentIndex] = {
          text: commentValue,
          user: currentUser,
          date: currentDate,
        };
        setComments(updatedComments);
        setEditCommentIndex(null); // Reset edit mode
      } else {
        // If not editing, add a new comment
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
    const input = e.target as HTMLElement;

    if (input.innerText === '수정하기' || input.innerText === '삭제하기') {
      console.log('콘솔콘솔');
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

  const paragraphContent = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum finibus nibh arcu, quis consequat ante cursus eget. Cras mattis, nulla non laoreet porttitor, diam justo laoreet eros, vel aliquet diam elit at leo.
  `;

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
              <h1>새로운 일정 관리 Taskify</h1>
              <div className={cx('right')}>
                <div className={cx('dropdown-wrapper')}>
                  <Dropdown
                    buttonList={testButtonList.modal}
                    onClick={handleButtonClick}
                    isKebab
                  />
                </div>
                <CloseSvg width={32} height={32} />
              </div>
            </div>
            <div className={cx('modal-contents')}>
              <div className={cx('modal-content-main')}>
                <div className={cx('label-container')}>
                  <div className={cx('ProgressChip-wrapper')}>
                    <ProgressChip text="To Do" />
                  </div>
                  <div className={cx('chipSubject-wrapper')}>
                    <ChipSubject label="프로젝트" />
                    <ChipSubject label="일반" />
                    <ChipSubject label="백엔드" />
                    <ChipSubject label="상" />
                  </div>
                </div>
                <p dangerouslySetInnerHTML={{ __html: paragraphContent }} />
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
                      email={userEmail}
                      nickname={userNickname}
                      profileImageUrl={userProfileImageUrl}
                      position="header"
                    />
                  </div>
                </div>
                <div className={cx('modal-content-sub-container')}>
                  <span className={cx('sub-container-title')}>마감일</span>
                  <p className={cx('sub-container-content')}>
                    2022.12.30 19:00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

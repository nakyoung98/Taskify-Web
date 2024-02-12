import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames/bind';
import styles from './ManagementModal.module.scss';
import { Modal } from '../ui-modal/Modal';
import ChipSubject from '../ui-chip-subject/chipSubject';
import ProgressChip from '../ui-progress-chip/ProgressChip';
import Dropdown from '../ui-dropdown/Dropdown';
import CommentTextarea from '../ui-comment-textarea/CommentTextarea';
import ProfileLabel from '../ui-profile-Label/ProfileLabel';
import CloseIcon from './close.svg';
import { CardResponse } from '@/types/card';
import { useComment } from '@/contexts/CommentProvider';
import { Comment } from '@/components/dashboard/feat-comment/Comment';
import PartitionIcon from './partition.svg';
import CreateCardModal from '../feat-create-card-modal/CreateCardModal';

const cx = classNames.bind(styles);

type ManagementModalProps = {
  modalStatus: {
    isOpen: boolean;
    data: CardResponse | null;
  };
  columnTitle: string;
  handleClose: () => void;
};

export function ManagementModal({
  handleClose,
  modalStatus,
  columnTitle,
}: ManagementModalProps) {
  const router = useRouter();
  const { boardId } = router.query;
  const [myComment, setMyComment] = useState<string>('');
  const testButtonList = {
    modal: ['수정하기', '삭제하기'],
  };
  const [isModifyModalOpen, setIsModifyModalOpen] = useState<boolean>(false);

  const { comments, getComments, postComments } = useComment();

  useEffect(() => {
    if (modalStatus?.data) {
      getComments(modalStatus.data.id);
    }
  }, [modalStatus]);

  const handleButtonClick = (e: React.MouseEvent) => {
    const buttonText = (e.target as HTMLElement).innerText;

    if (buttonText === '수정하기') {
      setIsModifyModalOpen(true);
    } else if (buttonText === '삭제하기') {
      console.log('hi');
    }
  };

  const handleSubmitComment = async () => {
    await postComments({
      cardId: modalStatus.data?.id || 0,
      columnId: modalStatus.data?.columnId || 0,
      content: myComment,
      dashboardId: boardId as string,
    });
    setMyComment('');
  };

  return (
    <Modal isOpen={modalStatus.isOpen}>
      <CreateCardModal
        isOpen={isModifyModalOpen}
        setIsOpen={() => {
          setIsModifyModalOpen(false);
        }}
        columnIdNumber={modalStatus.data?.columnId || 0}
        cardId={modalStatus.data?.id || 0}
        isModifyForm
      />
      <div className={cx('container')}>
        <div className={cx('modalHeader')}>
          <h1 className={cx('title')}>{modalStatus?.data?.title || ''}</h1>
          <div className={cx('toolbar')}>
            <Dropdown
              buttonList={testButtonList.modal}
              onClick={handleButtonClick}
              isKebab
            />
            <button type="button" onClick={handleClose}>
              <div className={cx('dummy')}>dummy</div>
              <CloseIcon />
            </button>
          </div>
        </div>
        <div className={cx('modalMain')}>
          <div className={cx('modalContent')}>
            <div className={cx('labelContainer')}>
              <ProgressChip text={columnTitle} />
              <PartitionIcon className={cx('partition')} />
              <div className={cx('subjectsContainer')}>
                {modalStatus?.data &&
                  modalStatus.data.tags.map((tag, index) => {
                    return (
                      <ChipSubject
                        key={tag + 1}
                        label={tag}
                        index={index}
                        onDelete={() => {}}
                      />
                    );
                  })}
              </div>
            </div>
            <div className={cx('content')}>
              <p className={cx('text')}>
                {modalStatus?.data?.description || ''}
              </p>
              <div className={cx('imageContainer')}>
                {modalStatus.data?.imageUrl && (
                  <Image src={modalStatus.data?.imageUrl} alt="할일" fill />
                )}
              </div>
            </div>
            <div className={cx('inputContainer')}>
              댓글
              <CommentTextarea
                value={myComment}
                onChange={(e) => {
                  setMyComment(e.target.value);
                }}
                buttonText="입력"
                onClick={handleSubmitComment}
                disabled={myComment === ''}
                onCancel={() => {}}
              />
            </div>
            <div className={cx('commentList')}>
              {comments?.data &&
                comments.data.comments.map((comment) => (
                  <Comment key={comment.id} data={comment} />
                ))}
            </div>
          </div>
          <div className={cx('modalAssignee')}>
            <div className={cx('assignee')}>
              담당자
              <ProfileLabel
                id={modalStatus?.data?.assignee.id || 0}
                email=""
                nickname={modalStatus?.data?.assignee.nickname || ''}
                profileImageUrl={
                  modalStatus?.data?.assignee.profileImageUrl || ''
                }
                position="card"
              />
            </div>
            <div className={cx('duedateContainer')}>
              마감일
              <p className={cx('duedate')}>
                {modalStatus?.data?.dueDate || ''}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import { Modal } from '@/components/commons/ui-modal/Modal';
import styles from './InviteModal.module.scss';
import { Input } from '@/components/commons/ui-input/Input';
import Button from '@/components/commons/ui-button/Button';
import { useMembers } from '@/contexts/MemberProvider';

type InviteProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const cx = classNames.bind(styles);

export default function InviteModal({ isOpen, setIsOpen }: InviteProps) {
  const router = useRouter();
  const { boardId } = router.query;
  const { control, watch, setError, setValue } = useForm({
    defaultValues: { email: '' },
    mode: 'onBlur',
  });

  const { inviteMember, error, inviteSuccess } = useMembers();

  const handleSubmit = async () => {
    await inviteMember(watch('email'), boardId as string);
  };

  useEffect(() => {
    if (error?.response?.status === 409 || error?.response?.status === 404) {
      if (error.response?.data) {
        const errorMessage = Object.values(error.response?.data);
        setError('email', { message: errorMessage[0] });
      }
    }
    if (inviteSuccess) {
      setIsOpen(false);
      setValue('email', '');
    }
  }, [error, inviteSuccess]);

  return (
    <Modal isOpen={isOpen}>
      <form className={cx('form')}>
        <h1 className={cx('title')}>초대하기</h1>
        <label className={cx('inputContainer')}>
          이메일
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <Input
                {...field}
                isModal
                hasError={Boolean(fieldState.error)}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
        </label>
        <div className={cx('buttonContainer')}>
          <Button
            onClick={() => {
              setIsOpen(false);
            }}
            size="modalMedium"
            theme="secondary"
          >
            취소
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!watch('email')}
            size="modalMedium"
            theme="primary"
          >
            초대
          </Button>
        </div>
      </form>
    </Modal>
  );
}

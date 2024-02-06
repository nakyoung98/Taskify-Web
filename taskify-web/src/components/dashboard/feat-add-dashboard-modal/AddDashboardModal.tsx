import { Dispatch, SetStateAction, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import { Modal } from '@/components/commons/ui-modal/Modal';
import styles from './AddDashboardModal.module.scss';
import { Input } from '@/components/commons/ui-input/Input';
import Button from '@/components/commons/ui-button/Button';
import ColorChipList from '@/components/commons/ui-color-chip/ColorChipList';
import { ColorChipColor } from '@/components/commons/ui-color-chip/ColorChip';

type AddDashboardModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const cx = classNames.bind(styles);

export default function AddDashboardModal({
  isOpen,
  setIsOpen,
}: AddDashboardModalProps) {
  const [selectedColor, setSelectedColor] = useState<ColorChipColor>('#7AC555');
  const { control, watch } = useForm({
    defaultValues: { dashboardName: '' },
    mode: 'onBlur',
  });
  return (
    <Modal isOpen={isOpen}>
      <form className={cx('form')}>
        <h1 className={cx('title')}>새로운 대시보드</h1>
        <label className={cx('inputContainer')}>
          대시보드 이름
          <Controller
            name="dashboardName"
            control={control}
            defaultValue=""
            render={({ field }) => <Input {...field} isModal />}
          />
        </label>
        <ColorChipList
          isModal
          selectedColor={selectedColor}
          onSelect={setSelectedColor}
        />
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
            onClick={() => {}}
            disabled={!watch('dashboardName')}
            size="modalMedium"
            theme="primary"
          >
            생성
          </Button>
        </div>
      </form>
    </Modal>
  );
}

import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ChangeDashBoardForm.module.scss';
import Button from '@/components/commons/ui-button/Button';
import ColorChipList from '@/components/commons/ui-color-chip/ColorChipList';
import { ColorChipColor } from '@/components/commons/ui-color-chip/ColorChip';
import { Input } from '@/components/commons/ui-input/Input';

const cx = classNames.bind(styles);

export default function ChangeDashBoardForm() {
  const [selectedColor, setSelectedColor] = useState<ColorChipColor>('#7AC555');

  return (
    <form className={cx('container')}>
      <div className={cx('header')}>
        <h1 className={cx('title')}>대시보드명</h1>
        <ColorChipList
          selectedColor={selectedColor}
          onSelect={setSelectedColor}
        />
      </div>
      <div className={cx('formContainer')}>
        <div className={cx('buttonContainer')}>
          <Button onClick={() => {}} size="medium" theme="primary">
            변경
          </Button>
        </div>
      </div>
    </form>
  );
}

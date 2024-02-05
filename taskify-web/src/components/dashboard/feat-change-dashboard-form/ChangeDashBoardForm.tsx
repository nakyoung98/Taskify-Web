import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AxiosResponse } from 'axios';
import classNames from 'classnames/bind';
import styles from './ChangeDashBoardForm.module.scss';
import Button from '@/components/commons/ui-button/Button';
import ColorChipList from '@/components/commons/ui-color-chip/ColorChipList';
import { ColorChipColor } from '@/components/commons/ui-color-chip/ColorChip';
import { Input } from '@/components/commons/ui-input/Input';
import { DashboardData } from '@/types/dashboard';
import { usePutDashboard } from '@/lib/hooks/usePutDashBoard';

const cx = classNames.bind(styles);

type ChangeDashBoardFormProps = {
  data: DashboardData | null;
  boardId: string;
  reload: () => Promise<AxiosResponse<DashboardData> | undefined>;
};

export default function ChangeDashBoardForm({
  data,
  boardId,
  reload,
}: ChangeDashBoardFormProps) {
  const [selectedColor, setSelectedColor] = useState<ColorChipColor>('#7AC555');

  const { control, setValue, watch } = useForm({
    mode: 'onBlur',
  });

  const { execute } = usePutDashboard({
    title: watch('dashboardName'),
    color: selectedColor,
    dashboardId: boardId,
  });

  useEffect(() => {
    if (data) {
      setValue('dashboardName', data.title);
    }
  }, [data]);

  const handleSubmit = async () => {
    execute();
    reload();
  };

  return (
    <form className={cx('container')}>
      <div className={cx('header')}>
        <h1 className={cx('title')}>{data?.title || ''}</h1>
        <ColorChipList
          selectedColor={selectedColor}
          onSelect={setSelectedColor}
        />
      </div>
      <div className={cx('formContainer')}>
        <label className={cx('inputContainer')}>
          대시보드 이름
          <Controller
            control={control}
            name="dashboardName"
            render={({ field }) => <Input {...field} isModal />}
          />
        </label>
        <div className={cx('buttonContainer')}>
          <Button
            disabled={!watch('dashboardName')}
            onClick={handleSubmit}
            size="medium"
            theme="primary"
          >
            변경
          </Button>
        </div>
      </div>
    </form>
  );
}

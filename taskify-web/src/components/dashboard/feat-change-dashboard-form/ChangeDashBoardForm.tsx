import classNames from 'classnames/bind';
import styles from './ChangeDashBoardForm.module.scss';
import Button from '@/components/commons/ui-button/Button';

const cx = classNames.bind(styles);

export default function ChangeDashBoardForm() {
  return (
    <form className={cx('container')}>
      <div className={cx('header')}>
        <h1 className={cx('title')}>대시보드명</h1>
      </div>
      <div className={cx('formContainer')}>
        하이
        <div className={cx('buttonContainer')}>
          <Button onClick={() => {}} size="medium" theme="primary">
            변경
          </Button>
        </div>
      </div>
    </form>
  );
}

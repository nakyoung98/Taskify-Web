import { useState, MouseEventHandler, ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './Dropdown.module.scss';
import Kebab from './kebab.svg';

const cx = classNames.bind(styles);

type DropdownProps = {
  buttonList: string[];
  onClick: MouseEventHandler<HTMLButtonElement>;
  isKebab?: boolean;
  children?: ReactNode;
};

export default function Dropdown({
  buttonList,
  onClick,
  isKebab = false,
  children,
}: DropdownProps) {
  const [isDropdownView, setIsDropdownView] = useState<boolean>(false);
  const setTime = 200;

  const handleClickContainer = () => {
    setIsDropdownView(!isDropdownView);
  };

  const handleBlurContainer = () => {
    setTimeout(() => {
      setIsDropdownView(false);
    }, setTime);
  };

  return (
    <div onBlur={handleBlurContainer} className={cx('container')}>
      <button type="button" onClick={handleClickContainer}>
        {isKebab && <Kebab />}
        {children}
      </button>
      {isDropdownView && (
        <div className={cx('button-list')}>
          {buttonList.map((button) => (
            <button
              type="button"
              className={cx('button')}
              key={button}
              onClick={onClick}
            >
              {button}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

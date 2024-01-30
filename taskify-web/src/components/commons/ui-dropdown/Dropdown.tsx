import { useState, MouseEventHandler, ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './Dropdown.module.scss';
import Kebab from './kebab.svg';

const cx = classNames.bind(styles);

/**
 * `DropdownProps`는 드롭다운 컴포넌트의 속성을 정의하는 타입입니다.
 * 이 타입은 버튼 이름 목록(buttonList), 버튼에서 실행될 이벤트(onClick), 케밥 버튼으로 구현할지에 대한 선택적 속성 (isKebab) 그리고 특정 위치에 드롭다운 기능을 적용 시키기 위한 자식요소(children)를 포함합니다.
 *
 * @typeof {Object} DropdownProps
 * @property {string[]} buttonList - 드롭다운 리스트에 표시되는 버튼 이름
 * @property {MouseEventHandler<HTMLButtonElement>} onClick - 버튼에서 실행되는 함수
 * @property {boolean} isKebab - 케밥 버튼 표시 여부 기본값은 false
 * @property {ReactNode} children - 자식 요소에 태그 또는 컴포넌트를 포함하면 해당 태그/컴포넌트의 위치에서 드롭다운 적용
 */

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

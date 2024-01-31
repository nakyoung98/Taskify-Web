// import { MouseEvent } from 'react';
import classNames from 'classnames/bind';
import styles from './ColorChip.module.scss';
import Choice from './Choice.svg';

const cx = classNames.bind(styles);

export type ColorChipColor = 'blue' | 'purple' | 'green' | 'pink' | 'orange';

type ColorChipProps = {
  isChoice?: boolean;
  color: ColorChipColor;
  onClick: (color: ColorChipColor) => void;
};
/**
 * @typedef {'blue' | 'purple' | 'green' | 'pink' | 'orange'} ColorChipColor
 * 색상 칩의 색상을 나타내는 타입입니다.
 */

/**
 * @typedef ColorChipProps
 * @property {boolean} [isChoice=false] - 색상 칩이 선택된 상태인지 나타내는 속성입니다.
 * @property {ColorChipColor} color - 색상 칩의 색상을 나타내는 속성입니다.
 * @property {(color: ColorChipColor) => void} onClick - 색상 칩이 클릭될 때 호출되는 함수를 나타내는 속성입니다.
 * 색상 칩 컴포넌트의 속성을 나타내는 타입입니다.
 */

/**
 * 색상 칩을 표시하는 컴포넌트입니다.
 * @param {ColorChipProps} props - 색상 칩 컴포넌트의 속성입니다.
 * @returns {JSX.Element} 색상 칩 컴포넌트입니다.
 */

export default function ColorChip({
  isChoice = false,
  color,
  onClick,
}: ColorChipProps) {
  /**
   * 클릭 이벤트 핸들러를 정의합니다.
   * 클릭 이벤트가 발생하면 onClick 함수를 호출하고, 클릭된 색상 칩의 색상을 인자로 전달합니다.
   */
  function onClickHandler() {
    onClick(color);
  }

  /**
   * 컴포넌트를 렌더링합니다.
   * 선택된 색상일 경우, SVG 이미지를 표시합니다.
   */
  return (
    <button
      className={cx('container', color)}
      onClick={onClickHandler}
      type="button"
    >
      {isChoice && <Choice className={cx('choice')} />}
    </button>
  );
}

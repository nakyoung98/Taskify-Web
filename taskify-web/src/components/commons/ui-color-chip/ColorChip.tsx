import classNames from 'classnames/bind';
import styles from './ColorChip.module.scss';
import Choice from './Choice.svg';
import { MouseEvent } from 'react';
const cx = classNames.bind(styles);

/**
 * @typedef {'blue' | 'purple' | 'green' | 'pink' | 'orange'} ColorChipColor
 */

/**
 * @typedef ColorChipProps
 * @property {boolean} [isChoice=false] - 선택된 색상인지 여부를 나타냅니다.
 * @property {ColorChipColor} color - 색상 칩의 색상을 나타냅니다.
 * @property {(color: ColorChipColor) => void} onClick - 색상 칩 클릭 시 호출되는 함수입니다.
 */

/**
 * 색상 칩 컴포넌트입니다.
 * @param {ColorChipProps} props - 색상 칩 컴포넌트의 props
 * @returns {JSX.Element} 색상 칩 컴포넌트
 */
export default function ColorChip({
  isChoice = false,
  color,
  onClick,
}: ColorChipProps) {
  /**
   * 색상 칩 클릭 핸들러입니다.
   */
  function onClickHandler() {
    onClick(color);
  }
  return (
    <div className={cx('container', color)} onClick={onClickHandler}>
      {isChoice && <Choice className={cx('choice')} />}
    </div>
  );
}

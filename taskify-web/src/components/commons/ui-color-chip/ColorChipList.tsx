import classNames from 'classnames/bind';
import ColorChip, {
  ColorChipColor,
} from '@/components/commons/ui-color-chip/ColorChip';
import styles from './ColorChipList.module.scss';

const cx = classNames.bind(styles); // styles 객체를 바인딩하여 CSS 클래스를 동적으로 생성하는 함수를 만듭니다.

type ColorChipListProps = {
  colorList: [ColorChipColor, boolean][];
  onSelect: (color: ColorChipColor) => void;
};
/**
 * @typedef {[ColorChipColor, boolean]} ColorItem - 목록에서 색상 항목을 나타냅니다. 첫 번째 요소는 색상이고, 두 번째 요소는 색상이 선택되었는지 여부를 나타냅니다.
 */

/**
 * @typedef ColorChipListProps
 * @property {ColorItem[]} colorList - 표시할 색상 목록입니다.
 * @property {(color: ColorChipColor) => void} onSelect - 선택 이벤트에 대한 핸들러입니다.
 */
export default function ColorChipList({
  colorList,
  onSelect,
}: ColorChipListProps) {
  /**
   * 색상 칩 목록을 표시하는 컴포넌트입니다.
   * @param {ColorChipListProps} props - ColorChipList 컴포넌트의 속성입니다.
   * @returns {JSX.Element} ColorChipList 컴포넌트입니다.
   */
  return (
    <div className={cx('container')}>
      {colorList.map((color) => (
        <ColorChip
          color={color[0]}
          onClick={onSelect}
          key={color[0]}
          isChoice={color[1]}
        />
      ))}
    </div>
  );
}

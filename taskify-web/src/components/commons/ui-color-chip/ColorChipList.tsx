import classNames from 'classnames/bind';
import ColorChip, {
  ColorChipColor,
} from '@/components/commons/ui-color-chip/ColorChip';
import styles from './ColorChipList.module.scss';

const cx = classNames.bind(styles);

type ColorChipListProps = {
  colorList: [ColorChipColor, boolean][];
  onSelect: (color: ColorChipColor) => void;
};

export default function ColorChipList({
  colorList,
  onSelect,
}: ColorChipListProps) {
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

type FontSize =
  | 'xsmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge'
  | 'xxlarge'
  | 'xxxlarge';
type FontWeight = 'lighter' | 'normal' | 'bold';
type TextAlign = 'left' | 'center' | 'right';

export default class TextStyle {
  constructor(
    fontSize: FontSize,
    fontWeight: FontWeight,
    textAlign: TextAlign,
  ) {
    this.fontSize = fontSize;
    this.fontWeight = fontWeight;
    this.textAlign = textAlign;
  }

  createClassNames(): string {
    const classNames = `font_size_${this.fontSize} font_weight_${this.fontWeight} text_align_${this.textAlign}`;

    return classNames;
  }

  fontSize: FontSize;

  fontWeight: FontWeight;

  textAlign: TextAlign;
}

/**
 * 텍스트의 폰트 크기를 정의하는 타입
 */
type FontSize =
  | 'xsmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge'
  | 'xxlarge'
  | 'xxxlarge';

/**
 * 텍스트의 폰트 두께를 정의하는 타입
 */
type FontWeight = 'lighter' | 'normal' | 'bold';

/**
 * 텍스트의 정렬 방식을 정의하는 타입
 */
type TextAlign = 'left' | 'center' | 'right';

/**
 * TextStyle 클래스는 텍스트 스타일을 정의합니다.
 * 이 클래스는 텍스트의 폰트 크기, 폰트 두께, 그리고 텍스트 정렬을 설정할 수 있습니다.
 * SCSS에서 정의된 맵을 바탕으로 각 속성에 대한 클래스 이름을 생성합니다.
 */
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

  /**
   * 클래스 이름을 생성하고 반환합니다.
   * 생성된 클래스 이름은 SCSS에서 정의된 스타일 규칙에 따라 텍스트 스타일을 적용하는 데 사용됩니다.
   * @returns {string} 생성된 클래스 이름을 문자열로 반환합니다. 예: 'font_size_xsmall font_weight_lighter text_align_left'
   */
  createClassNames(): string {
    const classNames = `font_size_${this.fontSize} font_weight_${this.fontWeight} text_align_${this.textAlign}`;

    return classNames;
  }

  fontSize: FontSize;

  fontWeight: FontWeight;

  textAlign: TextAlign;
}

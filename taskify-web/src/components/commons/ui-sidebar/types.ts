import OpenStatus from './OpenStatus';

/**
 * `Drawable` 타입은 사이드바의 드로어블 상태를 나타내는 객체의 타입을 정의합니다.
 * 이 타입은 사이드바의 열림 상태를 나타내는 `isOpened` 속성을 포함합니다.
 *
 * @typedef {Object} Drawable
 * @property {OpenStatus} isOpened - 사이드바가 현재 열려 있는지 여부를 나타냅니다.
 *                                  `OpenStatus` 열거형의 값으로, 사이드바의 열림 상태를
 *                                  나타내는 상수 값을 가집니다.
 */
export type Drawable = {
  isOpened: OpenStatus;
};

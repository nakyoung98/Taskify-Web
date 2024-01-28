/**
 * `OpenStatus` 열거형은 사이드바의 열림 상태를 나타내는 상수 값을 정의합니다.
 * 이 열거형은 사이드바가 열려 있는 상태와 닫혀 있는 상태를 나타내는 두 가지 상태 값을 포함합니다.
 *
 * @enum {string}
 */
enum OpenStatus {
  OPEN = 'open',
  CLOSE = 'close',
}

/**
 * `reverseOpenStatus` 함수는 주어진 `OpenStatus` 값을 반대 상태로 전환합니다.
 * 사이드바가 열려 있는 경우(`OpenStatus.OPEN`), 닫힌 상태(`OpenStatus.CLOSE`)로 전환하고,
 * 닫혀 있는 경우(`OpenStatus.CLOSE`), 열린 상태(`OpenStatus.OPEN`)로 전환합니다.
 * 제공된 상태가 이 두 가지 중 하나가 아닐 경우, 기본적으로 열린 상태(`OpenStatus.OPEN`)를 반환합니다.
 *
 * @param {OpenStatus} status - 현재 사이드바의 열림 상태.
 * @returns {OpenStatus} - 전환된 사이드바의 열림 상태.
 */
export const reverseOpenStatus = (status: OpenStatus): OpenStatus => {
  switch (status) {
    case OpenStatus.OPEN:
      return OpenStatus.CLOSE;
    case OpenStatus.CLOSE:
      return OpenStatus.OPEN;
    default:
      return OpenStatus.OPEN;
  }
};

export default OpenStatus;

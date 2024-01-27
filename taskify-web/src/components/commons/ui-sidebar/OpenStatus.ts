enum OpenStatus {
  OPEN = 'open',
  CLOSE = 'close',
}

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

export default function getChipRandomColor(num: number) {
  switch (num) {
    case 1:
      return 'orange';
    case 2:
      return 'green';
    case 3:
      return 'pink';
    case 4:
      return 'blue';
    default:
      return 'blue';
  }
}

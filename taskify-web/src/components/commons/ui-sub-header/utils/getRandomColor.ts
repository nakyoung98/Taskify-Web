export default function getRandomColor(id: number) {
  const randomNum = Math.round(id % 4);

  switch (randomNum) {
    case 0:
      return 'orange';
    case 1:
      return 'sky';
    case 2:
      return 'pink';
    case 3:
      return 'brown';
    default:
      return 'orange';
  }
}

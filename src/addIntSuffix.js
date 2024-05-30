export function addIntSuffix(int) {
  let intCopy = int;

  if (intCopy > 3 && intCopy < 21) return `${intCopy}th`;
  switch (intCopy % 10) {
    case 1:
      return `${intCopy}st`;
    case 2:
      return `${intCopy}nd`;
    case 3:
      return `${intCopy}rd`;
    default:
      return `${intCopy}th`;
  }
}

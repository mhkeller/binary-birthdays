export default function search (list, target) {
  // if (!list instanceof Array) {
  //   throw new Error()
  // }

  var left = 0;
  var passes = 0;
  var right = list.length;

  while (left < right) {
    passes++;
    var mid = (left + right) / 2;
    mid = Math.floor(mid);
    if (target === list[mid]) {
      return {
        index: mid,
        item: list[mid],
        passes
      };
    } else if (list[mid] > target) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return -1;
}

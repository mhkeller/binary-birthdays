import ascending from "./ascending";

export default function(compare) {
  if (compare.length === 1) compare = ascendingComparator(compare);
  return {
    left: function(a, x, lo, hi) {
      let passes = 0;
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;
      while (lo < hi) {
        passes++;
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x) < 0) lo = mid + 1;
        else hi = mid;
      }
      return {index: lo, passes};
    },
    right: function(a, x, lo, hi) {
      let passes = 0;
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;
      while (lo < hi) {
        passes++;
        var mid = lo + hi >>> 1;
        console.log('amid', lo, hi);
        if (compare(a[mid], x) > 0) hi = mid;
        else lo = mid + 1;
        // debugger
      }
      return {index: lo, passes};
    }
  };
}

function ascendingComparator(f) {
  return function(d, x) {
    return ascending(f(d), x);
  };
}

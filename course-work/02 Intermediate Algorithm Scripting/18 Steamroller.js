function steamrollArray(arr) {
  return arr.reduce(function (flat, flatten) {
    return flat.concat(Array.isArray(flatten) ? steamrollArray(flatten) : flatten);
  }, []);
}

steamrollArray([1, [2], [3, [[4]]]]);
function sym() {
  var argsArr = [].slice.call(arguments);

  function symDiff(set1, set2) {
    myArr = [];
    set1.forEach(function(cell) {
      if (set2.indexOf(cell) < 0 && myArr.indexOf(cell) < 0) {
        myArr.push(cell);
      }
    });
    set2.forEach(function(cell) {
      if (set1.indexOf(cell) < 0 && myArr.indexOf(cell) < 0) {
        myArr.push(cell);
      }
    });
    return myArr;
  }
  return argsArr.reduce(symDiff);
}

sym([1, 2, 3], [5, 2, 1, 4]);
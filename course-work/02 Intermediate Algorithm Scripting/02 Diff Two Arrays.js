function diffArray(arr1, arr2) {
  var newArr = [];
  
  newArr = arr1.concat(arr2);
  newArr.sort();

  for (var i = 0 ; i < (newArr.length-1) ; i++) {
    if (newArr[i]===newArr[i+1]) {
      newArr.splice(i--, 2);
    }
  }
  return newArr;
}

diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5]);
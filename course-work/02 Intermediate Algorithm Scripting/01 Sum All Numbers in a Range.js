function sumAll(arr) {
  
  var low = Math.min(arr[0], arr[1]);
  var high = Math.max(arr[0], arr[1]); 
  var result = 0;
  for (var i = low ; i <= high ; i++) {
    result += i;
  }

  return result;
}

sumAll([1, 4]);
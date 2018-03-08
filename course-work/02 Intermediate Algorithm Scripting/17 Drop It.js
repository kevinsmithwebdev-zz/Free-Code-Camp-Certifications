function dropElements(arr, func) {
  
  for (var i = 0 ; i < arr.length ; i++ ) {
     if (func(arr[i])) {
       return (arr);
     } else {
       arr.shift();
       i--;
     }
  }
  return [];
}

dropElements([1, 2, 3], function(n) {return n < 3; });
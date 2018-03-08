function largestOfFour(arr) {
  
  for (var i = 0 ; i < arr.length ; i++) {
    
    console.log("i = " + i + " starting sub array " + arr[i].toString());
    
    var biggest = 0;

    
    for (var j = 0 ; j < arr[i].length ; j++) {

      biggest=Math.max(biggest, arr[i][j]);

    }
  
    arr[i] = biggest;
    
    console.log("i = " + i + " *** new arr is - " + arr[i]);
  
  }
  
  
  
  console.log("*** Final large array is ****** - " + arr.toString());  
  
  // You can do this!
  return arr;
}

largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]);
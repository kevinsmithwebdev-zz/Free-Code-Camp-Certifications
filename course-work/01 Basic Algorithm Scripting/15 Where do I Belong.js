function getIndexToIns(arr, num) {

  arr.sort((function compareNumbers(a, b) { return a - b; }));

  for (var i = 0 ; i < arr.length ; i++ ) { 
    console.log(i + " comparing " + arr[i] + " - " + num); 
    if (arr[i]>=num) {
      return i;
    }
  }
  return i;
}

getIndexToIns([40, 60], 50);
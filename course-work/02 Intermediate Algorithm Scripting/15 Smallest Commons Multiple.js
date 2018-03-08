function smallestCommons(arr) {

  var full = arr.sort();

  var max = arr[1]; // the largest of the numbers in the array
  var lcm = 0;
  var notDone = true;
  
  while (notDone) {
    lcm+=max; // lcm MUST be a mutliple of max so increment by max
    for (var j = arr[0] ; j <= max ; j++) {
      if (lcm % j !== 0) {
        break;
      }
      else if (j == max-1) { // no need to check max - already a multiple
        notDone = false;
      }
    } // for j
  } // while

  return lcm;
}


smallestCommons([1,5]);
function chunkArrayInGroups(arr, size) {

  var hold = [];
  var final = [];

  for (var i = 0; i < arr.length; i++) {
    if (i % size !== size - 1)
      hold.push(arr[i]);
    else {
      hold.push(arr[i]);
      final.push(hold);
      hold = [];
    }
  }

  if (hold.length !== 0)
    final.push(hold);
  
  return final;
}

chunkArrayInGroups(["a", "b", "c", "d"], 2);
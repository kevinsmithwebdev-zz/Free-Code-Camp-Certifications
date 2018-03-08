function checkFalsy(arr) {
  return arr;
}

function bouncer(arr) {
  var hold;
  
  hold = arr.filter(checkFalsy);
  
  return hold;
}

bouncer([7, "ate", "", false, 9]);
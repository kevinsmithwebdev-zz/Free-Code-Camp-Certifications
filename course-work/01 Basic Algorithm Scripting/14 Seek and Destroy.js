function destroyer(arr) {
  
  var exclude = Array.from(arguments).slice(1);
  
  return arr.filter(function(val) {
    return !exclude.includes(val);
  });
  
  
}

destroyer([1, 2, 3, 1, 2, 3], 2, 3);
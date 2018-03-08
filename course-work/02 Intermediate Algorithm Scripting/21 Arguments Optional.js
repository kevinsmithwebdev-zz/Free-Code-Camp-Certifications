function addTogether() {
  function isNumber(num) {
    return typeof num === 'number';
  }
  if (!isNumber(arguments[0])) {
    return undefined;
  }
  if (arguments.length === 2) {

    if (isNumber(arguments[1])) {
      return arguments[0] + arguments[1];
     }
  } else {
    var arg1 = arguments[0];
    return function(arg2) {
      if (isNumber(arg2)) {
        return arg1 + arg2;
      }
      return undefined;
    };
  } 
  return undefined;
}

addTogether(2,3);
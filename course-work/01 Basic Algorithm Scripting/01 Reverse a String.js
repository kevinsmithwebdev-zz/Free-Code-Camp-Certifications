function reverseString(str) {
  
  var strHold = [];
  
  for (var i = 0 ; i < str.length ; i ++) {
    strHold.push(str.charAt(i));
  }
  
  strHold = strHold.reverse();
  
  str = strHold.reduce(function(acc, val) {
    return acc + val;
  });
  
  
  return str;
}

reverseString("hello");
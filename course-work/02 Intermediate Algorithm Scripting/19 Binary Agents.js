function binaryAgent(str) {
  
  var preArr = str.split(" ");
  
  function binToNum (binStr) {
    var num = 0;
      
    for (var i = binStr.length-1 ; i >= 0 ; i--) {
      // loop through string backwards, add each digit as an exp of 2
      num += binStr[i]*Math.pow(2,binStr.length - i -1);
    }
    return num;
  }
  
  var postArr = [];

  for (j = 0 ; j < preArr.length ; j ++) {
    var letter = preArr[j];
    postArr.push(String.fromCharCode(binToNum(letter)));
  }

  return postArr.join("");
}

binaryAgent("01000001 01110010 01100101 01101110 00100111 01110100 00100000 01100010 01101111 01101110 01100110 01101001 01110010 01100101 01110011 00100000 01100110 01110101 01101110 00100001 00111111");
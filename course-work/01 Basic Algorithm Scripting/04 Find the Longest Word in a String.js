function findLongestWord(str) {
  
  var strArr = [];
    
  var len = 0;
  
  
  strArr = str.split(" ");
  
  
  for (var i = 0 ; i < strArr.length ; i++) {
    
    console.log("*** " + i + " ***" + strArr[i] + "*** len = " + len + " and strArr is ***" + strArr[i] + "*** at " + strArr[i].length);
    
    if (strArr[i].length > len) {
      len = strArr[i].length;
    }
    
    
  }
  
  console.log("Result = " + len + " for ***" + str + "***");
  
  
  return len;
}

findLongestWord("The quick brown fox jumped over the lazy dog");

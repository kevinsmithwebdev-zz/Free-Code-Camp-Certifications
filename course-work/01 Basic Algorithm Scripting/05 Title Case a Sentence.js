function titleCase(str) {
  
  
  var strArr = [];
  
  strArr = str.split(" ");
  
  for (var i = 0 ; i < strArr.length ; i++) {
    
    var letters = [];
    
    
    console.log("i = " + i + " input -> ***" + strArr[i] + "***");
    
    
    letters.push(strArr[i][0].toUpperCase());
    
    for (var j = 1 ; (j < strArr[i].length) ; j++) {
      
      console.log("i = " + i + " and j = " + j + " letter -> ***" + strArr[i][j] + "*** becomes *" + strArr[i][j].toLowerCase() + "*");
      letters.push(strArr[i][j].toLowerCase());
      
    }
    strArr[i] = letters.join("");
  
    console.log("i = " + i + " output -> ***" + strArr[i] + "***");

  
  }
  
  
  str = strArr.join(" ");
  
  return str;
}

titleCase("i'm a little tea pot");

function repeatStringNumTimes(str, num) {

  var strNew = "";
  
  if (num > 0) {
    for (var i = 0 ; i < num ; i++) {
      strNew += str;
      }
      return strNew;
    } else {
      return "";
    }
}

repeatStringNumTimes("abc", 3);

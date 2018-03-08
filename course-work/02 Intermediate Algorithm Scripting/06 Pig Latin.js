function translatePigLatin(str) { 
  var vowels = ["a","e","i","o","u"];
  
  if (vowels.indexOf(str[0]) >= 0) {
    str += "way";
  }
  else {
    for (var i = 1 ; i < str.length ; i++) {
      if (vowels.indexOf(str[i]) >= 0) {
        break; 
      } 
    } // for
    
    str = str.slice(i) + str.slice(0,i) + "ay";

  } // else
  return str;
}

translatePigLatin("cwm");
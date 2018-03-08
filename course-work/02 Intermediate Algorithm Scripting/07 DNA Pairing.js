
function pairElement(str) {
 
  arr = [];
  
  for (var i = 0 ; i < str.length ; i++) {
    var char1 = str[i];
    var char2;
    
    switch(char1) {
      case "A":
        char2 = "T";
        break;
      case "T":
        char2 = "A";
        break;
      case "C":
        char2 = "G";
        break;
      case "G":
        char2 = "C";
        break;
    }
    arr.push([char1, char2]);  
  }

  return arr;
}

pairElement("GCG");

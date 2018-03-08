
  function convertToRoman(num) {
    var romanNumeralChars = ["I", "V", "X", "L", "C", "D", "M"];  // array of RN symbols
    var romanNumeral = []; // array to which we will push each symbol
     
    function addChars(power) {
      var factor = Math.pow(10, power); // which "place" are we disecting
      var base = power*2; // the index into romanNumeralChars for the "place"
      
      if (num>=factor) { // is there any portion in this "place"
        var top = Math.floor(num/factor); // lop off the portion of this "place" and reduce to a single digit
        num -= top*factor; // remove that lopped off potion so we can continue later with the remainder

        switch(top) {
          case 1:
          case 2:
          case 3:
            for (var j = 0 ; j < top ; j++) {
              romanNumeral.push(romanNumeralChars[base]);
            }
            break;    
          case 4:
            romanNumeral.push(romanNumeralChars[base]);
            romanNumeral.push(romanNumeralChars[base+1]);
            break;               
          case 5:
          case 6:        
          case 7:       
          case 8:
            romanNumeral.push(romanNumeralChars[base+1]);          
            for (var k = 0 ; k < (top - 5) ; k++) {
              romanNumeral.push(romanNumeralChars[base]);
            }
            break;               
          case 9:
            romanNumeral.push(romanNumeralChars[base]);
            romanNumeral.push(romanNumeralChars[base+2]);
            break;          
        } // switch
      } // if 
    } // addChars
    
    if (num < 0 || num > 3999 || !Number.isInteger(num)) { // making sure it's and integet between 0 and 3999
      return num + " is invalid input";
    }
    
    for (var i = 3 ; i >= 0 ; i--) { // index through the powers
      addChars(i);
    }
    return romanNumeral.join("");
  } // convertToRoman()
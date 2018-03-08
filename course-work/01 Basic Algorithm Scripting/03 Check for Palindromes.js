function palindrome(str) {

  str = str.replace(/[^0-9a-zA-Z]/g, '');
  str = str.toLowerCase();
  
  

  
  for (var i = 0 ; i < str.length ; i ++) {
    if (str.charAt(i) != str.charAt(str.length-(i+1)))
      {
        return false;
      }
  }
  
  
  
  
  return true;
}



palindrome("race car");
function spinalCase(str) {

  arr = [];
  
  function isUpper(test) {
    return test[0] > 'A' && test[0] < 'Z';
  }
  
  arr.push(str[0].toLowerCase());
  for (i = 1 ; i < str.length ; i++ ) {
    if (!((str[i]>='A'&&str[i]<='Z')||(str[i]>='a'&&str[i]<='z'))) {
      arr.push('-');
      if (isUpper(str[i+1])) {
        arr.push(str[++i].toLowerCase());
      } 
      continue;
    } 
    else if (isUpper(str[i])) 
    {
      arr.push('-'); 
    } 
    arr.push(str[i].toLowerCase());   
  }
 return arr.join("");
}

spinalCase('This Is Spinal Tap');